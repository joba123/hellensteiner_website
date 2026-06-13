import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { CartWidget } from "./components/CartWidget";

const appRootElement = document.getElementById("app-root");

if (appRootElement) {
  createRoot(appRootElement).render(
    <StrictMode>
      <App />
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
