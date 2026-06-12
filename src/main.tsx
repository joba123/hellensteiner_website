import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ShopApp } from "./ShopApp";

const rootElement = document.getElementById("shop-root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ShopApp />
    </StrictMode>
  );
}
