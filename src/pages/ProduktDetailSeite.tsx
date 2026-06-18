import { useState } from "react";
import { Link, useParams } from "react-router";
import { Button } from "../components/Button";
import { ShopCard } from "../components/ShopCard";
import { ReviewsSection } from "../components/reviews/ReviewsSection";
import { addCartItem, parsePriceToCents } from "../cartStore";
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
    <label className="product-detail-select">
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [warenkorbStatus, setWarenkorbStatus] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    () => produkt?.details.auswahl?.vorauswahl ?? produkt?.details.auswahl?.optionen[0] ?? ""
  );
  const [selectedQuantity, setSelectedQuantity] = useState(
    () => produkt?.details.menge.vorauswahl ?? produkt?.details.menge.optionen[0] ?? "1"
  );

  if (!produkt) {
    return (
      <section className="product-detail product-detail--empty">
        <div className="product-detail__empty">
          <p className="product-detail__eyebrow">Shop</p>
          <h1>Produkt nicht gefunden</h1>
          <p>Dieses Produkt gibt es nicht oder der Link ist unvollständig.</p>
          <Button as="a" className="product-detail__shop-link" href="/shop">
            Zurück zum Shop
          </Button>
        </div>
      </section>
    );
  }

  const currentProduct = produkt;
  const activeBild = currentProduct.bilder[activeIndex] ?? currentProduct.bilder[0];
  const aehnlicheProdukte = produkte.filter(
    (anderesProdukt) => anderesProdukt.kategorie === currentProduct.kategorie && anderesProdukt.id !== currentProduct.id
  );
  const kategorieLabel = produktKategorieLabels[currentProduct.kategorie];
  const quantity = Number.parseInt(selectedQuantity, 10) || 1;
  const selectionLabel = currentProduct.details.auswahl?.label.replace(":", "");
  const selectedPriceLabel = getAuswahlPreisLabel(currentProduct, selectedOption);

  function handleAddToCart() {
    addCartItem({
      productId: currentProduct.id,
      name: currentProduct.name,
      imageSrc: activeBild.src,
      imageAlt: activeBild.alt,
      category: kategorieLabel,
      selectionLabel,
      selectionValue: selectedOption || undefined,
      quantity,
      unitPriceCents: parsePriceToCents(selectedPriceLabel),
      priceLabel: selectedPriceLabel
    });

    setWarenkorbStatus(`${currentProduct.name} wurde dem Warenkorb hinzugefügt.`);
  }

  return (
    <section className="product-detail" aria-labelledby="product-detail-title">
      <nav className="product-detail__breadcrumb" aria-label="Produktnavigation">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">&gt;</span>
        <span aria-current="page">{currentProduct.name}</span>
      </nav>

      <div className="product-detail__layout">
        <div className="product-detail__gallery" aria-label={`${currentProduct.name} Bilder`}>
          <div className="product-detail__image-stage">
            <img src={activeBild.src} alt={activeBild.alt} />
          </div>

          {currentProduct.bilder.length > 1 && (
            <div className="product-detail__thumbs">
              {currentProduct.bilder.map((bild, index) => (
                <Button
                  className={`product-detail__thumb${index === activeIndex ? " is-active" : ""}`}
                  type="button"
                  variant="unstyled"
                  key={bild.src}
                  aria-label={`${currentProduct.name} Bild ${index + 1} anzeigen`}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={bild.src} alt="" aria-hidden="true" />
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail__info">
          <p className="product-detail__eyebrow">{currentProduct.kategorie}</p>
          <h1 id="product-detail-title">{currentProduct.details.titel}</h1>
          <p className="product-detail__summary">{currentProduct.details.beschreibung}</p>
          <p className="product-detail__price">{selectedPriceLabel}</p>

          <div className="product-detail__options">
            {currentProduct.details.auswahl && (
              <AuswahlFeld
                auswahl={currentProduct.details.auswahl}
                name="auswahl"
                value={selectedOption}
                onChange={setSelectedOption}
              />
            )}
            <AuswahlFeld
              auswahl={currentProduct.details.menge}
              name="menge"
              value={selectedQuantity}
              onChange={setSelectedQuantity}
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
            <p className="product-detail__cart-status" role="status" aria-live="polite">
              {warenkorbStatus}
            </p>
          )}
        </div>
      </div>

      <div className="product-detail__sections" aria-label={`${currentProduct.name} Produktinformationen`}>
        {currentProduct.details.abschnitte.map((abschnitt) => (
          <article className="product-detail__section" key={abschnitt.titel}>
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

      <ReviewsSection productId={currentProduct.id} />

      {aehnlicheProdukte.length > 0 && (
        <section className="product-detail__recommendations" aria-labelledby="more-products-title">
          <h2 id="more-products-title">Mehr {kategorieLabel}</h2>
          <div className="product-detail__recommendation-scroll">
            <div className="product-detail__recommendation-grid">
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
