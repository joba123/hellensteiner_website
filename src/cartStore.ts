import { useSyncExternalStore } from "react";

const CART_STORAGE_KEY = "hellensteiner-cart";

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  selectionLabel?: string;
  selectionValue?: string;
  quantity: number;
  unitPriceCents: number;
  priceLabel: string;
}

export interface CartItemInput {
  productId: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  selectionLabel?: string;
  selectionValue?: string;
  quantity: number;
  unitPriceCents: number;
  priceLabel: string;
}

interface CartState {
  items: CartItem[];
}

const listeners = new Set<() => void>();
let cartState: CartState = readCartState();

function readCartState(): CartState {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return { items: [] };
    }

    const parsedCart = JSON.parse(storedCart) as CartState;

    if (!Array.isArray(parsedCart.items)) {
      return { items: [] };
    }

    return {
      items: parsedCart.items.filter((item) => item && typeof item.key === "string")
    };
  } catch {
    return { items: [] };
  }
}

function writeCartState(nextState: CartState) {
  cartState = nextState;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextState));
  }

  listeners.forEach((listener) => listener());
}

function createCartItemKey(item: CartItemInput): string {
  return `${item.productId}::${item.selectionValue ?? ""}`;
}

function normalizeQuantity(quantity: number): number {
  return Math.max(1, Math.min(99, Math.trunc(quantity)));
}

export function subscribeToCart(listener: () => void): () => void {
  listeners.add(listener);

  function handleExternalCartChange() {
    cartState = readCartState();
    listener();
  }

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleExternalCartChange);
  }

  return () => {
    listeners.delete(listener);

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleExternalCartChange);
    }
  };
}

export function getCartSnapshot(): CartState {
  return cartState;
}

export function useCart() {
  return useSyncExternalStore(subscribeToCart, getCartSnapshot, getCartSnapshot);
}

export function addCartItem(itemInput: CartItemInput) {
  const quantity = normalizeQuantity(itemInput.quantity);
  const key = createCartItemKey(itemInput);
  const existingItem = cartState.items.find((item) => item.key === key);

  if (existingItem) {
    updateCartItemQuantity(key, existingItem.quantity + quantity);
    return;
  }

  writeCartState({
    items: [
      ...cartState.items,
      {
        ...itemInput,
        key,
        quantity
      }
    ]
  });
}

export function updateCartItemQuantity(key: string, quantity: number) {
  const normalizedQuantity = normalizeQuantity(quantity);

  writeCartState({
    items: cartState.items.map((item) =>
      item.key === key
        ? {
            ...item,
            quantity: normalizedQuantity
          }
        : item
    )
  });
}

export function removeCartItem(key: string) {
  writeCartState({
    items: cartState.items.filter((item) => item.key !== key)
  });
}

export function clearCart() {
  writeCartState({ items: [] });
}

export function getCartTotalQuantity(items: readonly CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotalCents(items: readonly CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity * item.unitPriceCents, 0);
}

export function parsePriceToCents(priceLabel: string): number {
  const priceMatch = priceLabel.match(/(\d+(?:[,.]\d{1,2})?)/);

  if (!priceMatch) {
    return 0;
  }

  const normalizedPrice = priceMatch[1].replace(",", ".");

  return Math.round(Number.parseFloat(normalizedPrice) * 100);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(cents / 100);
}
