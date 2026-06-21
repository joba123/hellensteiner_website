import { useEffect, useState } from "react";
import { Link } from "react-router";
import { produktDetailUrl, type Produkt, type ProduktBild } from "../../assets/ts/produkte";
import { Button } from "./Button";

interface ShopCardProps {
  produkt: Produkt;
}

function LazyProductImage({ bild }: { bild: ProduktBild }) {
  const [ladestatus, setLadestatus] = useState<"laedt" | "geladen" | "fehler">("laedt");

  return (
    <>
      {ladestatus === "laedt" && (
        <span className="product-card__image-placeholder" aria-hidden="true" />
      )}
      <img
        className={`product-card__image${ladestatus === "geladen" ? " ist-geladen" : ""}${ladestatus === "fehler" ? " hat-fehler" : ""}`}
        src={bild.src}
        alt={bild.alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLadestatus("geladen")}
        onError={() => setLadestatus("fehler")}
      />
      {ladestatus === "fehler" && (
        <span
          className="product-card__image-error"
          role="img"
          aria-label={`${bild.alt} konnte nicht geladen werden`}
        >
          Bild nicht verfügbar
        </span>
      )}
    </>
  );
}

export function ShopCard({ produkt }: ShopCardProps) {
  const [aktiverIndex, setAktiverIndex] = useState(0);
  const [istAktiv, setIstAktiv] = useState(false);
  const bildAnzahl = produkt.bilder.length;

  useEffect(() => {
    if (bildAnzahl <= 1 || !istAktiv) {
      return;
    }

    const intervall = window.setInterval(() => {
      setAktiverIndex((currentIndex) => (currentIndex + 1) % bildAnzahl);
    }, 1500);

    return () => window.clearInterval(intervall);
  }, [bildAnzahl, istAktiv]);

  return (
    <article
      className="produkt product-card"
      data-product-id={produkt.id}
      onMouseEnter={() => setIstAktiv(true)}
      onMouseLeave={() => setIstAktiv(false)}
      onFocus={() => setIstAktiv(true)}
      onBlur={() => setIstAktiv(false)}
    >
      <Link
        className="product-card__cover-link"
        to={produktDetailUrl(produkt.id)}
        aria-label={`${produkt.name} Produktseite öffnen`}
      >
        {produkt.name}
      </Link>

      <div className="product-card__media" data-shop-slider={produkt.id}>
        <div
          className="product-card__slides"
          style={{ transform: `translateX(-${aktiverIndex * 100}%)` }}
          aria-live="off"
        >
          {produkt.bilder.map((bild) => (
            <div className="product-card__slide" key={bild.src}>
              <LazyProductImage bild={bild} />
            </div>
          ))}
        </div>
      </div>

      {bildAnzahl > 1 && (
        <div className="product-card__dots" aria-label={`${produkt.name} Bilder`}>
          {produkt.bilder.map((bild, index) => (
            <Button
              className={`product-card__dot${index === aktiverIndex ? " ist-aktiv" : ""}`} 
              type="button"
              variant="unstyled"
              key={bild.src}
              aria-label={`${produkt.name} Bild ${index + 1} anzeigen`}
              aria-pressed={index === aktiverIndex}
              onClick={() => setAktiverIndex(index)}
            />
          ))}
        </div>
      )}

      <div className="product-card__content">
        <h3>{produkt.name}</h3>
        <p>{produkt.kurzbeschreibung}</p>
        <span className="preis">{produkt.preis}</span>
      </div>
    </article>
  );
}
