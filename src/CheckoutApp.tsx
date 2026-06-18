import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "./components/Button";
import { useAuth } from "./authStore";
import { clearCart, formatPrice, getCartSubtotalCents, getClubDiscountCents, useCart } from "./cartStore";

export function CheckoutApp() {
  const { items } = useCart();
  const { currentUser } = useAuth();
  const [isComplete, setIsComplete] = useState(false);
  const subtotalCents = getCartSubtotalCents(items);
  const isClubMember = currentUser?.isClubMember ?? false;
  const discountCents = isClubMember ? getClubDiscountCents(subtotalCents) : 0;
  const shippingCents = items.length > 0 ? 490 : 0;
  const totalCents = subtotalCents - discountCents + shippingCents;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsComplete(true);
    clearCart();
  }

  if (isComplete) {
    return (
      <section className="checkout-page checkout-page--center">
        <div className="checkout-confirmation">
          <p className="checkout-eyebrow">Bestellung</p>
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
      <section className="checkout-page checkout-page--center">
        <div className="checkout-confirmation">
          <p className="checkout-eyebrow">Warenkorb</p>
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
    <section className="checkout-page" aria-labelledby="checkout-title">
      <div className="checkout-page__header">
        <p className="checkout-eyebrow">Checkout</p>
        <h1 id="checkout-title">Zur Kasse</h1>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-form">
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
            <div className="checkout-form__grid">
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
            <div className="checkout-form__grid">
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
            <label className="checkout-radio">
              <input type="radio" name="payment" value="card" defaultChecked />
              <span>Kreditkarte</span>
            </label>
            <label className="checkout-radio">
              <input type="radio" name="payment" value="paypal" />
              <span>PayPal</span>
            </label>
            <p>Dies ist ein Studienprojekt. Es wird keine echte Zahlung verarbeitet.</p>
          </fieldset>
        </div>

        <aside className="checkout-summary" aria-label="Bestellübersicht">
          <h2>Bestellübersicht</h2>
          <div className="checkout-summary__items">
            {items.map((item) => (
              <article className="checkout-summary__item" key={item.key}>
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
          <div className="checkout-summary__totals">
            <p>
              <span>Zwischensumme</span>
              <strong>{formatPrice(subtotalCents)}</strong>
            </p>
            {isClubMember && (
              <p>
                <span>Freundeclub-Rabatt (-10%)</span>
                <strong>-{formatPrice(discountCents)}</strong>
              </p>
            )}
            <p>
              <span>Versand</span>
              <strong>{formatPrice(shippingCents)}</strong>
            </p>
            <p className="checkout-summary__total">
              <span>Gesamt</span>
              <strong>{formatPrice(totalCents)}</strong>
            </p>
          </div>
          <Button type="submit">Bestellung abschließen</Button>
        </aside>
      </form>
    </section>
  );
}
