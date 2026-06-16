import { useEffect, useState } from "react";
import { Button } from "./Button";
import { AccountPanel } from "./AccountPanel";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { UserAvatar } from "./UserAvatar";
import { useAuth } from "../authStore";

type AuthMode = "login" | "register";

export function UserWidget() {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const isLoggedIn = currentUser !== null;

  useEffect(() => {
    document.body.classList.toggle("auth-drawer-open", isOpen);

    return () => document.body.classList.remove("auth-drawer-open");
  }, [isOpen]);

  function closeDrawer() {
    setIsOpen(false);
  }

  function openDrawer() {
    if (!isLoggedIn) {
      setMode("login");
    }

    setIsOpen(true);
  }

  const headingLabel = isLoggedIn ? "Mein Konto" : mode === "login" ? "Anmelden" : "Konto erstellen";

  return (
    <div className="user-widget">
      <Button
        className={isLoggedIn ? "user-widget__button user-widget__button--account" : "user-widget__button"}
        type="button"
        variant="unstyled"
        aria-label={isLoggedIn ? "Konto verwalten" : "Anmelden"}
        aria-expanded={isOpen}
        onClick={openDrawer}
      >
        {isLoggedIn && currentUser ? (
          <UserAvatar name={currentUser.name} />
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"></path>
          </svg>
        )}
      </Button>

      {isOpen && (
        <button className="auth-drawer__backdrop" type="button" aria-label="Konto schließen" onClick={closeDrawer} />
      )}

      <aside className={`auth-drawer${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen} aria-label="Konto">
        <div className="auth-drawer__header">
          <div>
            <p>{isLoggedIn ? "Willkommen zurück" : "Hellensteiner Konto"}</p>
            <strong>{headingLabel}</strong>
          </div>
          <Button className="auth-drawer__close" type="button" variant="unstyled" aria-label="Konto schließen" onClick={closeDrawer}>
            ×
          </Button>
        </div>

        <div className="auth-drawer__body">
          {isLoggedIn && currentUser ? (
            <AccountPanel user={currentUser} onLogout={closeDrawer} />
          ) : mode === "login" ? (
            <LoginForm onSwitchToRegister={() => setMode("register")} onSuccess={closeDrawer} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode("login")} onSuccess={closeDrawer} />
          )}
        </div>
      </aside>
    </div>
  );
}
