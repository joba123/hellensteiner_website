import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { Button } from "./Button";
import { useAuth } from "../authStore";
import {
  formatPrice,
  getCartSubtotalCents,
  getCartTotalQuantity,
  getClubDiscountCents,
  removeCartItem,
  updateCartItemQuantity,
  useCart
} from "../cartStore";

export function Card() {
  const { items } = useCart();
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const totalQuantity = getCartTotalQuantity(items);
  const subtotalCents = getCartSubtotalCents(items);
  const isClubMember = currentUser?.isClubMember ?? false;
  const discountCents = isClubMember ? getClubDiscountCents(subtotalCents) : 0;
  const totalCents = subtotalCents - discountCents;

  useEffect(() => {
    document.body.classList.toggle("cart-drawer-open", isOpen);

    return () => document.body.classList.remove("cart-drawer-open");
  }, [isOpen]);

  return (
    <div className="cart-widget">
      <Button
        className="cart-widget__button"
        type="button"
        variant="unstyled"
        aria-label={`Warenkorb öffnen, ${totalQuantity} Produkte`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1.5"></circle>
          <circle cx="19" cy="21" r="1.5"></circle>
          <path d="M2.5 3h2.7l2.4 12.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L21.5 8H6.2"></path>
        </svg>
        {totalQuantity > 0 && <span className="cart-widget__badge">{totalQuantity}</span>}
      </Button>

      {isOpen &&
        createPortal(
          <>
            <button className="cart-drawer__backdrop" type="button" aria-label="Warenkorb schließen" onClick={() => setIsOpen(false)} />

            <aside className="cart-drawer is-open" aria-label="Warenkorb">
              <div className="cart-drawer__header">
                <div>
                  <p>Dein Warenkorb</p>
                  <strong>{totalQuantity} Produkte</strong>
                </div>
                <Button className="cart-drawer__close" type="button" variant="unstyled" aria-label="Warenkorb schließen" onClick={() => setIsOpen(false)}>
                  ×
                </Button>
              </div>

              <div className="cart-drawer__body">
                {items.length === 0 ? (
                  <div className="cart-drawer__empty">
                    <p>Dein Warenkorb ist noch leer.</p>
                    <Link to="/shop">Zum Shop</Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <article className="cart-drawer__item" key={item.key}>
                      <img src={item.imageSrc} alt={item.imageAlt} />
                      <div className="cart-drawer__item-info">
                        <h3>{item.name}</h3>
                        {item.selectionValue && (
                          <p>
                            {item.selectionLabel ?? "Auswahl"} {item.selectionValue}
                          </p>
                        )}
                        <span>{formatPrice(item.unitPriceCents)} / Stück</span>
                        <div className="cart-drawer__quantity">
                          <Button
                            type="button"
                            variant="unstyled"
                            aria-label={`${item.name} Menge verringern`}
                            onClick={() => updateCartItemQuantity(item.key, item.quantity - 1)}
                          >
                            −
                          </Button>
                          <strong>{item.quantity}</strong>
                          <Button
                            type="button"
                            variant="unstyled"
                            aria-label={`${item.name} Menge erhöhen`}
                            onClick={() => updateCartItemQuantity(item.key, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="cart-drawer__item-actions">
                        <strong>{formatPrice(item.quantity * item.unitPriceCents)}</strong>
                        <Button type="button" variant="unstyled" onClick={() => removeCartItem(item.key)}>
                          Entfernen
                        </Button>
                      </div>
                    </article>
                  ))
                )}
              </div>

              <div className="cart-drawer__footer">
                <div className="cart-drawer__sum">
                  <span>Zwischensumme</span>
                  <strong>{formatPrice(subtotalCents)}</strong>
                </div>
                {isClubMember && items.length > 0 && (
                  <>
                    <div className="cart-drawer__sum cart-drawer__sum--discount">
                      <span>Freundeclub-Rabatt (-10%)</span>
                      <strong>-{formatPrice(discountCents)}</strong>
                    </div>
                    <div className="cart-drawer__sum cart-drawer__sum--total">
                      <span>Gesamt</span>
                      <strong>{formatPrice(totalCents)}</strong>
                    </div>
                  </>
                )}
                <p>Versand und Rabatte werden im Demo-Checkout angezeigt.</p>
                <Button
                  as="a"
                  className={items.length === 0 ? "cart-drawer__checkout is-disabled" : "cart-drawer__checkout"}
                  href={items.length === 0 ? "#" : "/checkout"}
                  aria-disabled={items.length === 0}
                  onClick={(event) => {
                    if (items.length === 0) {
                      event.preventDefault();
                      return;
                    }
                    setIsOpen(false);
                  }}
                >
                  Zur Kasse
                </Button>
              </div>
            </aside>
          </>,
          document.body
        )}
    </div>
  );
}
