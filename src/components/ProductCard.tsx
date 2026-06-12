import { useEffect, useState } from "react";
import type { Produkt } from "../../assets/ts/produkte";

interface ProductCardProps {
  produkt: Produkt;
}

export function ProductCard({ produkt }: ProductCardProps) {
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
      <a
        className="product-card__cover-link"
        href={produkt.detailSeite}
        aria-label={`${produkt.name} Produktseite öffnen`}
      >
        {produkt.name}
      </a>

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
            <button
              className={`product-card__dot${index === activeIndex ? " is-active" : ""}`} 
              type="button"
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
