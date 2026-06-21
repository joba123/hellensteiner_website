import { useState } from "react";
import { Link, useParams } from "react-router";
import { Button } from "../components/Button";
import { ShopCard } from "../components/ShopCard";
import { ReviewsSection } from "../components/reviews/ReviewsSection";
import { addCartItem, parsePriceToCents } from "../../assets/ts/cartStore";
import {
  findeProdukt,
  getAuswahlPreisLabel,
  produkte,
  produktKategorieLabels,
  type Produkt,
  type ProduktAuswahl
} from "../../assets/ts/produkte";

function AuswahlFeld({
  auswahl,
  name,
  value,
  onChange
}: {
  auswahl: ProduktAuswahl;
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="produkt-detail-auswahl">
      <span>{auswahl.label}</span>
      <select name={name} value={value} onChange={(event) => onChange(event.target.value)}>
        {auswahl.optionen.map((option) => {
          const preisLabel = auswahl.preise?.[option];

          return (
            <option value={option} key={option}>
              {preisLabel ? `${option} - ${preisLabel}` : option}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export function ProduktDetailSeite() {
  const { id } = useParams();
  const produkt = id ? findeProdukt(decodeURIComponent(id)) : undefined;
  const [aktiverIndex, setAktiverIndex] = useState(0);
  const [warenkorbStatus, setWarenkorbStatus] = useState("");
  const [gewaehlteOption, setGewaehlteOption] = useState(() => produkt?.details.auswahl?.vorauswahl ?? produkt?.details.auswahl?.optionen[0] ?? "");
  const [gewaehlteMenge, setGewaehlteMenge] = useState(() => produkt?.details.menge.vorauswahl ?? produkt?.details.menge.optionen[0] ?? "1");

  if (!produkt) {
    return (
      <section className="produkt-detail produkt-detail--leer">
        <div className="produkt-detail__leer">
          <p className="produkt-detail__ueberzeile">Shop</p>
          <h1>Produkt nicht gefunden</h1>
          <p>Dieses Produkt gibt es nicht oder der Link ist unvollständig.</p>
          <Button as="a" className="produkt-detail__shop-verweis" href="/shop">
            Zurück zum Shop
          </Button>
        </div>
      </section>
    );
  }

  const aktuellesProdukt = produkt;
  const activeBild = aktuellesProdukt.bilder[aktiverIndex] ?? aktuellesProdukt.bilder[0];
  const aehnlicheProdukte = produkte.filter(
    (anderesProdukt) => anderesProdukt.kategorie === aktuellesProdukt.kategorie && anderesProdukt.id !== aktuellesProdukt.id
  );
  const kategorieLabel = produktKategorieLabels[aktuellesProdukt.kategorie];
  const menge = Number.parseInt(gewaehlteMenge, 10) || 1;
  const auswahlText = aktuellesProdukt.details.auswahl?.label.replace(":", "");
  const gewaehlterPreis = getAuswahlPreisLabel(aktuellesProdukt, gewaehlteOption);

  function handleAddToCart() {
    addCartItem({
      productId: aktuellesProdukt.id,
      name: aktuellesProdukt.name,
      imageSrc: activeBild.src,
      imageAlt: activeBild.alt,
      category: kategorieLabel,
      selectionLabel: auswahlText,
      selectionValue: gewaehlteOption || undefined,
      quantity: menge,
      unitPriceCents: parsePriceToCents(gewaehlterPreis),
      priceLabel: gewaehlterPreis
    });

    setWarenkorbStatus(`${aktuellesProdukt.name} wurde dem Warenkorb hinzugefügt.`);
  }

  return (
    <section className="produkt-detail" aria-labelledby="product-detail-title">
      <nav className="produkt-detail__navigation" aria-label="Produktnavigation">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">&gt;</span>
        <span aria-current="page">{aktuellesProdukt.name}</span>
      </nav>

      <div className="produkt-detail__anordnung">
        <div className="produkt-detail__galerie" aria-label={`${aktuellesProdukt.name} Bilder`}>
          <div className="produkt-detail__bildbereich">
            <img src={activeBild.src} alt={activeBild.alt} />
          </div>

          {aktuellesProdukt.bilder.length > 1 && (
            <div className="produkt-detail__vorschaubilder">
              {aktuellesProdukt.bilder.map((bild, index) => (
                <Button
                  className={`produkt-detail__vorschaubild${index === aktiverIndex ? " ist-aktiv" : ""}`}
                  type="button"
                  variant="unstyled"
                  key={bild.src}
                  aria-label={`${aktuellesProdukt.name} Bild ${index + 1} anzeigen`}
                  aria-pressed={index === aktiverIndex}
                  onClick={() => setAktiverIndex(index)}
                >
                  <img src={bild.src} alt="" aria-hidden="true" />
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="produkt-detail__info">
          <p className="produkt-detail__ueberzeile">{aktuellesProdukt.kategorie}</p>
          <h1 id="product-detail-title">{aktuellesProdukt.details.titel}</h1>
          <p className="produkt-detail__zusammenfassung">{aktuellesProdukt.details.beschreibung}</p>
          <p className="produkt-detail__preis">{gewaehlterPreis}</p>

          <div className="produkt-detail__optionen">
            {aktuellesProdukt.details.auswahl && (
              <AuswahlFeld
                auswahl={aktuellesProdukt.details.auswahl}
                name="auswahl"
                value={gewaehlteOption}
                onChange={setGewaehlteOption}
              />
            )}
            <AuswahlFeld
              auswahl={aktuellesProdukt.details.menge}
              name="menge"
              value={gewaehlteMenge}
              onChange={setGewaehlteMenge}
            />
          </div>

          <Button
            className="product-detail__cart-button"
            type="button"
            onClick={handleAddToCart}
          >
            Zum Warenkorb hinzufügen
          </Button>

          {warenkorbStatus && (
            <p className="produkt-detail__warenkorb-status" role="status" aria-live="polite">
              {warenkorbStatus}
            </p>
          )}
        </div>
      </div>

      <div className="produkt-detail__abschnitte" aria-label={`${aktuellesProdukt.name} Produktinformationen`}>
        {aktuellesProdukt.details.abschnitte.map((abschnitt) => (
          <article className="produkt-detail__abschnitt" key={abschnitt.titel}>
            <h2>{abschnitt.titel}</h2>
            {abschnitt.text && <p>{abschnitt.text}</p>}
            {abschnitt.punkte && (
              <ul>
                {abschnitt.punkte.map((punkt) => (
                  <li key={punkt}>{punkt}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>

      <ReviewsSection productId={aktuellesProdukt.id} />

      {aehnlicheProdukte.length > 0 && (
        <section className="produkt-detail__empfehlungen" aria-labelledby="more-products-title">
          <h2 id="more-products-title">Mehr {kategorieLabel}</h2>
          <div className="produkt-detail__empfehlungen-scrollbereich">
            <div className="produkt-detail__empfehlungen-grid">
              {aehnlicheProdukte.map((anderesProdukt) => (
                <ShopCard key={anderesProdukt.id} produkt={anderesProdukt} />
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
