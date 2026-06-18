import { useEffect, useState } from "react";
import { Link } from "react-router";
import { produktDetailUrl, type Produkt } from "../../assets/ts/produkte";
import { Button } from "./Button";

interface ShopCardProps {
  produkt: Produkt;
}

export function ShopCard({ produkt }: ShopCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const imageCount = produkt.bilder.length;

  useEffect(() => {
    if (imageCount <= 1 || !isInteracting) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % imageCount);
    }, 1500);

    return () => window.clearInterval(intervalId);
  }, [imageCount, isInteracting]);

  return (
    <article
      className="product product-card"
      data-product-id={produkt.id}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocus={() => setIsInteracting(true)}
      onBlur={() => setIsInteracting(false)}
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
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          aria-live="off"
        >
          {produkt.bilder.map((bild) => (
            <div className="product-card__slide" key={bild.src}>
              <img className="product-card__image" src={bild.src} alt={bild.alt} />
            </div>
          ))}
        </div>
      </div>

      {imageCount > 1 && (
        <div className="product-card__dots" aria-label={`${produkt.name} Bilder`}>
          {produkt.bilder.map((bild, index) => (
            <Button
              className={`product-card__dot${index === activeIndex ? " is-active" : ""}`} 
              type="button"
              variant="unstyled"
              key={bild.src}
              aria-label={`${produkt.name} Bild ${index + 1} anzeigen`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}

      <div className="product-card__content">
        <h3>{produkt.name}</h3>
        <p>{produkt.kurzbeschreibung}</p>
        <span className="price">{produkt.preis}</span>
      </div>
    </article>
  );
}
