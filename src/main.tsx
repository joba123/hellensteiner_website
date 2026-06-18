import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Card } from "./components/Card";
import { UserWidget } from "./components/Nutzersystem/UserWidget";

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
      <Card />
    </StrictMode>
  );
});

document.querySelectorAll<HTMLElement>("#user-root").forEach((userRootElement) => {
  createRoot(userRootElement).render(
    <StrictMode>
      <UserWidget />
    </StrictMode>
  );
});
