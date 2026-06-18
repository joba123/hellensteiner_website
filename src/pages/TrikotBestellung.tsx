import { useState, type FormEvent } from "react";
import { Button } from "../components/Button";
import { LoginForm } from "../components/Nutzersystem/LoginForm";
import { RegisterForm } from "../components/Nutzersystem/RegisterForm";
import { useAuth } from "../authStore";

type AuthMode = "login" | "register";

const TRIKOT_IMAGE = "/assets/images/deutschland_trikot.png";

const trikotGroessen = [
  "Herren-S",
  "Herren-M",
  "Herren-L",
  "Herren-XL",
  "Herren-XXL",
  "Damen-S",
  "Damen-M",
  "Damen-L",
  "Damen-XL",
  "Damen-XXL"
] as const;

function TrikotShowcase() {
  return (
    <aside className="checkout-summary trikot-showcase" aria-label="Dein Deutschland Trikot">
      <div className="trikot-showcase__media">
        <img src={TRIKOT_IMAGE} alt="Hellensteiner Bräu Deutschland Trikot" />
      </div>
      <h2>Deutschland Trikot</h2>
      <div className="checkout-summary__totals">
        <p>
          <span>Preis</span>
          <strong>Kostenlos</strong>
        </p>
        <p>
          <span>Versand</span>
          <strong>Gratis</strong>
        </p>
        <p className="checkout-summary__total">
          <span>Gesamt</span>
          <strong>0,00 €</strong>
        </p>
      </div>
      <p className="trikot-showcase__hint">Exklusiv für registrierte Hellensteiner Nutzer.</p>
    </aside>
  );
}

function TrikotAuthGate() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <section className="checkout-page" aria-labelledby="trikot-title">
      <div className="checkout-page__header">
        <p className="checkout-eyebrow">Aktion</p>
        <h1 id="trikot-title">Dein kostenloses Deutschland Trikot</h1>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form trikot-auth">
          <h2 className="trikot-auth__title">
            {mode === "login" ? "Melde dich an, um dein Trikot zu sichern" : "Registriere dich für dein Trikot"}
          </h2>
          <p className="trikot-auth__lead">
            Dein kostenloses Deutschland Trikot gibt es exklusiv für registrierte Nutzer.
            {mode === "login"
              ? " Melde dich mit deinem Konto an oder erstelle ein neues."
              : " Erstelle dein kostenloses Konto und bestelle danach direkt dein Trikot."}
          </p>

          <div className="trikot-auth__form">
            {mode === "login" ? (
              <LoginForm onSwitchToRegister={() => setMode("register")} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setMode("login")} />
            )}
          </div>
        </div>

        <TrikotShowcase />
      </div>
    </section>
  );
}

function TrikotBestellformular({ vorname, nachname }: { vorname: string; nachname: string }) {
  const [bestellt, setBestellt] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    setBestellt(true);
  }

  if (bestellt) {
    return (
      <section className="checkout-page checkout-page--center">
        <div className="checkout-confirmation">
          <p className="checkout-eyebrow">Bestellung</p>
          <h1>Dein Deutschland Trikot ist bestellt!</h1>
          <p>
            Vielen Dank! Wir haben deine Bestellung erhalten und schicken dir dein kostenloses Trikot
            schnellstmöglich zu. Es wurde keine echte Bestellung ausgelöst.
          </p>
          <Button as="a" href="/">
            Zurück zur Startseite
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page" aria-labelledby="trikot-title">
      <div className="checkout-page__header">
        <p className="checkout-eyebrow">Aktion</p>
        <h1 id="trikot-title">Dein kostenloses Deutschland Trikot</h1>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-form">
          <fieldset>
            <legend>Trikot-Größe</legend>
            <label>
              Größe
              <select name="groesse" required>
                <option value="">Bitte wählen</option>
                {trikotGroessen.map((groesse) => (
                  <option key={groesse}>{groesse}</option>
                ))}
              </select>
            </label>
          </fieldset>

          <fieldset>
            <legend>Lieferadresse</legend>
            <div className="checkout-form__grid">
              <label>
                Vorname
                <input type="text" name="firstName" autoComplete="given-name" defaultValue={vorname} required />
              </label>
              <label>
                Nachname
                <input type="text" name="lastName" autoComplete="family-name" defaultValue={nachname} required />
              </label>
            </div>
            <label>
              Straße und Hausnummer
              <input type="text" name="street" autoComplete="address-line1" required />
            </label>
            <div className="checkout-form__grid">
              <label>
                PLZ
                <input
                  type="text"
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern="[0-9]{5}"
                  title="Bitte gib eine fünfstellige Postleitzahl ein."
                  required
                />
              </label>
              <label>
                Ort
                <input type="text" name="city" autoComplete="address-level2" required />
              </label>
            </div>
          </fieldset>

          <label className="checkout-radio">
            <input type="checkbox" name="datenschutz" required />
            <span>Ich stimme der Verarbeitung meiner Angaben für die Trikot-Bestellung zu.</span>
          </label>

          <Button type="submit">Kostenlos bestellen</Button>
        </div>

        <TrikotShowcase />
      </form>
    </section>
  );
}

export function TrikotBestellung() {
  const { currentUser } = useAuth();

  const [vorname = "", nachname = ""] = currentUser ? currentUser.name.trim().split(/\s+/) : [];

  return currentUser ? (
    <TrikotBestellformular vorname={vorname} nachname={nachname} />
  ) : (
    <TrikotAuthGate />
  );
}
