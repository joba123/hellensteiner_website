import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClubBenefits } from "./ClubBenefits";
import { Button } from "./components/Button";
import { CartWidget } from "./components/CartWidget";
import { CheckoutApp } from "./CheckoutApp";
import { ProductDetailApp } from "./ProductDetailApp";
import { ShopApp } from "./ShopApp";

const rootElement = document.getElementById("shop-root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ShopApp />
    </StrictMode>
  );
}

const productDetailRootElement = document.getElementById("product-detail-root");

if (productDetailRootElement) {
  createRoot(productDetailRootElement).render(
    <StrictMode>
      <ProductDetailApp />
    </StrictMode>
  );
}

const clubSubmitRootElement = document.getElementById("club-submit-root");

if (clubSubmitRootElement) {
  createRoot(clubSubmitRootElement).render(
    <StrictMode>
      <Button type="submit">Anmeldung absenden</Button>
    </StrictMode>
  );
}

const clubBenefitsRootElement = document.getElementById("club-benefits-root");

if (clubBenefitsRootElement) {
  createRoot(clubBenefitsRootElement).render(
    <StrictMode>
      <ClubBenefits />
    </StrictMode>
  );
}

document.querySelectorAll<HTMLElement>("#cart-root").forEach((cartRootElement) => {
  createRoot(cartRootElement).render(
    <StrictMode>
      <CartWidget />
    </StrictMode>
  );
});

const checkoutRootElement = document.getElementById("checkout-root");

if (checkoutRootElement) {
  createRoot(checkoutRootElement).render(
    <StrictMode>
      <CheckoutApp />
    </StrictMode>
  );
}
