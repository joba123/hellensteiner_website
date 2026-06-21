import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { Button } from "./Button";
import { useAuth } from "../../assets/ts/authStore";
import {
  formatPrice,
  getCartSubtotalCents,
  getCartTotalQuantity,
  getClubDiscountCents,
  removeCartItem,
  updateCartItemQuantity,
  useCart
} from "../../assets/ts/cartStore";

export function Card() {
  const { items } = useCart();
  const { currentUser } = useAuth();
  const [istOffen, setIstOffen] = useState(false);
  const gesamtMenge = getCartTotalQuantity(items);
  const zwischensumme = getCartSubtotalCents(items);
  const istClubMitglied = currentUser?.isClubMember ?? false;
  const rabatt = istClubMitglied ? getClubDiscountCents(zwischensumme) : 0;
  const gesamt = zwischensumme - rabatt;

  useEffect(() => {
    document.body.classList.toggle("cart-seitenleiste-offen", istOffen);

    return () => document.body.classList.remove("cart-seitenleiste-offen");
  }, [istOffen]);

  return (
    <div className="cart-anzeige">
      <Button
        className="cart-anzeige__button"
        type="button"
        variant="unstyled"
        aria-label={`Warenkorb öffnen, ${gesamtMenge} Produkte`}
        aria-expanded={istOffen}
        onClick={() => setIstOffen(true)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1.5"></circle>
          <circle cx="19" cy="21" r="1.5"></circle>
          <path d="M2.5 3h2.7l2.4 12.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L21.5 8H6.2"></path>
        </svg>
        {gesamtMenge > 0 && <span className="cart-anzeige__kennzeichen">{gesamtMenge}</span>}
      </Button>

      {istOffen &&
        createPortal(
          <>
            <button className="cart-seitenleiste__hintergrund" type="button" aria-label="Warenkorb schließen" onClick={() => setIstOffen(false)} />

            <aside className="cart-seitenleiste ist-offen" aria-label="Warenkorb">
              <div className="cart-seitenleiste__header">
                <div>
                  <p>Dein Warenkorb</p>
                  <strong>{gesamtMenge} Produkte</strong>
                </div>
                <Button className="cart-seitenleiste__schliessen" type="button" variant="unstyled" aria-label="Warenkorb schließen" onClick={() => setIstOffen(false)}>
                  ×
                </Button>
              </div>

              <div className="cart-seitenleiste__inhalt">
                {items.length === 0 ? (
                  <div className="cart-seitenleiste__leer">
                    <p>Dein Warenkorb ist noch leer.</p>
                    <Link to="/shop">Zum Shop</Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <article className="cart-seitenleiste__eintrag" key={item.key}>
                      <img src={item.imageSrc} alt={item.imageAlt} />
                      <div className="cart-seitenleiste__eintrag-info">
                        <h3>{item.name}</h3>
                        {item.selectionValue && (
                          <p>
                            {item.selectionLabel ?? "Auswahl"} {item.selectionValue}
                          </p>
                        )}
                        <span>{formatPrice(item.unitPriceCents)} / Stück</span>
                        <div className="cart-seitenleiste__menge">
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
                      <div className="cart-seitenleiste__eintrag-aktionen">
                        <strong>{formatPrice(item.quantity * item.unitPriceCents)}</strong>
                        <Button type="button" variant="unstyled" onClick={() => removeCartItem(item.key)}>
                          Entfernen
                        </Button>
                      </div>
                    </article>
                  ))
                )}
              </div>

              <div className="cart-seitenleiste__footer">
                <div className="cart-seitenleiste__summe">
                  <span>Zwischensumme</span>
                  <strong>{formatPrice(zwischensumme)}</strong>
                </div>
                {istClubMitglied && items.length > 0 && (
                  <>
                    <div className="cart-seitenleiste__summe cart-seitenleiste__summe--rabatt">
                      <span>Freundeclub-Rabatt (-10%)</span>
                      <strong>-{formatPrice(rabatt)}</strong>
                    </div>
                    <div className="cart-seitenleiste__summe cart-seitenleiste__summe--gesamt">
                      <span>Gesamt</span>
                      <strong>{formatPrice(gesamt)}</strong>
                    </div>
                  </>
                )}
                <p>Versand und Rabatte werden im Demo-Checkout angezeigt.</p>
                <Button
                  as="a"
                  className={items.length === 0 ? "cart-seitenleiste__kasse ist-deaktiviert" : "cart-seitenleiste__kasse"}
                  href={items.length === 0 ? "#" : "/checkout"}
                  aria-disabled={items.length === 0}
                  onClick={(event) => {
                    if (items.length === 0) {
                      event.preventDefault();
                      return;
                    }
                    setIstOffen(false);
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
