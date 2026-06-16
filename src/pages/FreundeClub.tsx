import { useState, type FormEvent } from "react";
import { Button } from "../components/Button";
import { ClubBenefits } from "../ClubBenefits";

export function FreundeClub() {
  const [messageVisible, setMessageVisible] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    setMessageVisible(true);
    event.currentTarget.reset();
  }

  return (
    <main className="club-page">
      <section className="hero-fc" aria-labelledby="club-title">
        <div className="club-section-inner">
          <h1 id="club-title">Willkommen im Hellensteiner Bräu Freundeclub</h1>
          <p>Werde Teil unserer Hellensteiner Gemeinschaft voller Genuss, Geselligkeit und echter Freundschaft. Im Freundeclub erwarten dich exklusive Vorteile, besondere Aktionen und unvergessliche Erlebnisse rund um unser Hellensteiner Bräu.</p>
          <img src="/assets/images/fc.png" alt="Hellensteiner Bräu mit Brauereigebäude, Biergarten und Bierglas" className="club-hero-image" />
        </div>
      </section>

      <section className="vorteile" aria-labelledby="benefits-title">
        <div className="club-section-inner">
          <h2 id="benefits-title">Warum mitmachen?</h2>
          <p>Als Mitglied unseres Freundeclubs genießt du zahlreiche Vorteile.</p>
          <ClubBenefits />
        </div>
      </section>

      <section className="mitglied" aria-labelledby="join-title">
        <div className="club-section-inner">
          <h2 id="join-title">Jetzt Mitglied werden</h2>
          <p>Melde dich direkt an und werde Teil der Hellensteiner Bräu Gemeinschaft. Das Formular sendet noch keine echten Daten.</p>

          <form className="club-form" onSubmit={handleSubmit}>
            <div className="club-form-grid">
              <label>Anrede
                <select name="anrede" required>
                  <option value="">Bitte wählen</option>
                  <option value="frau">Frau</option>
                  <option value="herr">Herr</option>
                  <option value="divers">Divers</option>
                </select>
              </label>
              <label>Vorname<input type="text" name="vorname" autoComplete="given-name" required /></label>
              <label>Nachname<input type="text" name="nachname" autoComplete="family-name" required /></label>
              <label>Straße<input type="text" name="strasse" autoComplete="address-line1" required /></label>
              <label>Hausnummer<input type="text" name="hausnummer" autoComplete="address-line2" required /></label>
              <label>Postleitzahl<input type="text" name="postleitzahl" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" title="Bitte gib eine fünfstellige Postleitzahl ein." required /></label>
              <label>Wohnort<input type="text" name="wohnort" autoComplete="address-level2" required /></label>
              <label>E-Mail-Adresse<input type="email" name="email" autoComplete="email" required /></label>
              <label>Telefonnummer<input type="tel" name="telefon" autoComplete="tel" /></label>
              <label>Geburtsdatum<input type="date" name="geburtsdatum" autoComplete="bday" required /></label>
              <label>T-Shirt-Größe
                <select name="shirtgroesse" required>
                  <option value="">Bitte wählen</option>
                  {["Damen-S", "Damen-M", "Damen-L", "Damen-XL", "Damen-XXL", "Herren-S", "Herren-M", "Herren-L", "Herren-XL", "Herren-XXL"].map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </label>
              <label>Geworben von<input type="text" name="geworben_von" placeholder="Optional" /></label>
            </div>

            <label className="club-checkbox">
              <input type="checkbox" name="newsletter" />
              <span>Ich möchte den Freundeclub-Newsletter erhalten.</span>
            </label>
            <label className="club-checkbox">
              <input type="checkbox" name="datenschutz" required />
              <span>Ich habe die <a href="/datenschutz">Datenschutzhinweise</a> gelesen und stimme der Verarbeitung meiner Angaben für die Club-Anmeldung zu.</span>
            </label>

            <Button type="submit">Anmeldung absenden</Button>
            {messageVisible && (
              <p className="club-form-message is-visible" role="status" aria-live="polite">
                Vielen Dank! Deine Anmeldung wurde lokal vorgemerkt. Es wurden keine Daten übertragen.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
