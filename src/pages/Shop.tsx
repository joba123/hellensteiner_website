import { useMemo, useState } from "react";
import { ShopCard } from "../components/ShopCard";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { kategorieReihenfolge, produkte, produktKategorieLabels, type Produkt } from "../../assets/ts/produkte";

function normalizeSearchText(value: string): string {
  return value
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function produktPasstZurSuche(produkt: Produkt, suchbegriff: string): boolean {
  if (!suchbegriff) {
    return true;
  }

  const suchText = normalizeSearchText(
    [
      produkt.name,
      produkt.kurzbeschreibung,
      produktKategorieLabels[produkt.kategorie],
      produkt.details.titel,
      produkt.details.beschreibung,
      ...produkt.details.abschnitte.flatMap((abschnitt) => [
        abschnitt.titel,
        abschnitt.text ?? "",
        ...(abschnitt.punkte ?? [])
      ])
    ].join(" ")
  );

  return suchText.includes(suchbegriff);
}

export function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearchTerm = normalizeSearchText(searchTerm.trim());
  const gefilterteProdukte = useMemo(
    () => produkte.filter((produkt) => produktPasstZurSuche(produkt, normalizedSearchTerm)),
    [normalizedSearchTerm]
  );
  const isSearching = normalizedSearchTerm.length > 0;

  return (
    <main className="shop-page">
      <Reveal>
        <section className="shop-search" aria-labelledby="shop-search-title">
          <label className="shop-search__label" htmlFor="shop-search-input" id="shop-search-title">
            Shop durchsuchen
          </label>
          <input
            className="shop-search__input"
            id="shop-search-input"
            type="search"
            placeholder="Produkt, Kategorie oder Geschmack suchen"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <p className="shop-search__meta" aria-live="polite">
            {isSearching
              ? `${gefilterteProdukte.length} Treffer für "${searchTerm.trim()}"`
              : "Alle Produkte anzeigen"}
          </p>
        </section>
      </Reveal>

      {kategorieReihenfolge.map((kategorie) => {
        const produkteDerKategorie = gefilterteProdukte.filter((produkt) => produkt.kategorie === kategorie);

        if (produkteDerKategorie.length === 0) {
          return null;
        }

        return (
          <section className="shop" key={kategorie}>
            <h3>{produktKategorieLabels[kategorie]}</h3>
            <br />
            <div className="product-grid">
              {produkteDerKategorie.map((produkt, index) => (
                <Reveal key={produkt.id} delay={index * 0.07}>
                  <ShopCard produkt={produkt} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {gefilterteProdukte.length === 0 && (
        <section className="shop-empty" aria-live="polite">
          <h2>Keine Produkte gefunden</h2>
          <p>Versuche es mit einem anderen Suchbegriff oder setze die Suche zurück.</p>
          <Button type="button" onClick={() => setSearchTerm("")}>
            Suche zurücksetzen
          </Button>
        </section>
      )}
    </main>
  );
}
