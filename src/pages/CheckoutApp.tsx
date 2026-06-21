import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../components/Button";
import { useAuth } from "../../assets/ts/authStore";
import { clearCart, formatPrice, getCartSubtotalCents, getClubDiscountCents, useCart } from "../../assets/ts/cartStore";

export function CheckoutApp() {
  const { items } = useCart();
  const { currentUser } = useAuth();
  const [istFertig, setIstFertig] = useState(false);
  const zwischensumme = getCartSubtotalCents(items);
  const istClubMitglied = currentUser?.isClubMember ?? false;
  const rabatt = istClubMitglied ? getClubDiscountCents(zwischensumme) : 0;
  const versand = items.length > 0 ? 490 : 0;
  const gesamt = zwischensumme - rabatt + versand;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIstFertig(true);
    clearCart();
  }

  if (istFertig) {
    return (
      <section className="kassenseite kassenseite--zentriert">
        <div className="kassenbestaetigung">
          <p className="kasse-ueberzeile">Bestellung</p>
          <h1>Vielen Dank für deine Bestellung!</h1>
          <p>Deine Bestellung wurde abgeschlossen. Es wurde keine echte Zahlung ausgelöst.</p>
          <Button as="a" href="/shop">
            Zurück zum Shop
          </Button>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="kassenseite kassenseite--zentriert">
        <div className="kassenbestaetigung">
          <p className="kasse-ueberzeile">Warenkorb</p>
          <h1>Dein Warenkorb ist leer</h1>
          <p>Lege zuerst Produkte in den Warenkorb, bevor du zur Kasse gehst.</p>
          <Button as="a" href="/shop">
            Zum Shop
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="kassenseite" aria-labelledby="checkout-title">
      <div className="kassenseite__header">
        <p className="kasse-ueberzeile">Checkout</p>
        <h1 id="checkout-title">Zur Kasse</h1>
      </div>

      <form className="kassenanordnung" onSubmit={handleSubmit}>
        <div className="kassenformular">
          <fieldset>
            <legend>Kontakt</legend>
            <label>
              E-Mail-Adresse
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label>
              Telefonnummer
              <input type="tel" name="phone" autoComplete="tel" />
            </label>
          </fieldset>

          <fieldset>
            <legend>Lieferadresse</legend>
            <div className="kassenformular__grid">
              <label>
                Vorname
                <input type="text" name="firstName" autoComplete="given-name" required />
              </label>
              <label>
                Nachname
                <input type="text" name="lastName" autoComplete="family-name" required />
              </label>
            </div>
            <label>
              Straße und Hausnummer
              <input type="text" name="street" autoComplete="address-line1" required />
            </label>
            <div className="kassenformular__grid">
              <label>
                PLZ
                <input type="text" name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" required />
              </label>
              <label>
                Ort
                <input type="text" name="city" autoComplete="address-level2" required />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Zahlung</legend>
            <label className="kassen-optionsfeld">
              <input type="radio" name="payment" value="card" defaultChecked />
              <span>Kreditkarte</span>
            </label>
            <label className="kassen-optionsfeld">
              <input type="radio" name="payment" value="paypal" />
              <span>PayPal</span>
            </label>
            <p>Dies ist ein Studienprojekt. Es wird keine echte Zahlung verarbeitet.</p>
          </fieldset>
        </div>

        <aside className="kassenzusammenfassung" aria-label="Bestellübersicht">
          <h2>Bestellübersicht</h2>
          <div className="kassenzusammenfassung__eintraege">
            {items.map((item) => (
              <article className="kassenzusammenfassung__eintrag" key={item.key}>
                <img src={item.imageSrc} alt={item.imageAlt} />
                <div>
                  <h3>{item.name}</h3>
                  {item.selectionValue && <p>{item.selectionValue}</p>}
                  <span>
                    {item.quantity} × {formatPrice(item.unitPriceCents)}
                  </span>
                </div>
                <strong>{formatPrice(item.quantity * item.unitPriceCents)}</strong>
              </article>
            ))}
          </div>
          <div className="kassenzusammenfassung__summen">
            <p>
              <span>Zwischensumme</span>
              <strong>{formatPrice(zwischensumme)}</strong>
            </p>
            {istClubMitglied && (
              <p>
                <span>Freundeclub-Rabatt (-10%)</span>
                <strong>-{formatPrice(rabatt)}</strong>
              </p>
            )}
            <p>
              <span>Versand</span>
              <strong>{formatPrice(versand)}</strong>
            </p>
            <p className="kassenzusammenfassung__gesamt">
              <span>Gesamt</span>
              <strong>{formatPrice(gesamt)}</strong>
            </p>
          </div>
          <Button type="submit">Bestellung abschließen</Button>
        </aside>
      </form>
    </section>
  );
}
