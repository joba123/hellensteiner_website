import { ProductCard } from "./components/ProductCard";
import { kategorieReihenfolge, produkte, produktDetailUrl, produktKategorieLabels } from "../assets/ts/produkte";

export function ShopApp() {
  const highlightProdukt = produkte.find((produkt) => produkt.highlightBild);

  return (
    <>
      {highlightProdukt?.highlightBild && (
        <div className="product-grid">
          <div className="usp">
            <a href={produktDetailUrl(highlightProdukt.id)}>
              <img
                className="malztonic"
                src={highlightProdukt.highlightBild.src}
                alt={highlightProdukt.highlightBild.alt}
              />
            </a>
          </div>
        </div>
      )}

      {kategorieReihenfolge.map((kategorie) => {
        const produkteDerKategorie = produkte.filter((produkt) => produkt.kategorie === kategorie);

        if (produkteDerKategorie.length === 0) {
          return null;
        }

        return (
          <section className="shop" key={kategorie}>
            <h3>{produktKategorieLabels[kategorie]}</h3>
            <br />
            <div className="product-grid">
              {produkteDerKategorie.map((produkt) => (
                <ProductCard key={produkt.id} produkt={produkt} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
