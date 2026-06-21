import { useMemo, useState } from "react";
import { KARTE, KATEGORIE_LABEL, type FilterKategorie } from "../../assets/ts/speisekarte";

const euro = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

const KATEGORIEN = Object.keys(KATEGORIE_LABEL) as FilterKategorie[];

export function Speisekarte() {
  const [kategorie, setKategorie] = useState<FilterKategorie>("alle");
  const [suche, setSuche] = useState("");

  const treffer = useMemo(() => {
    const begriff = suche.trim().toLowerCase();
    return KARTE.filter(
      (p) =>
        (kategorie === "alle" || p.kat === kategorie) &&
        (!begriff ||
          p.name.toLowerCase().includes(begriff) ||
          p.beschreibung.toLowerCase().includes(begriff))
    );
  }, [kategorie, suche]);

  return (
    <section className="dyn-section" id="speisekarte" aria-label="Speisekarte">
      <h2>Unsere Speisekarte</h2>
      <p className="dyn-intro">
        Frisch gezapfte Biere aus eigener Brauerei und herzhafte schwäbisch-bayerische
        Schmankerl. Filtere nach Kategorie oder durchsuche die Karte.
      </p>

      <div className="karte-werkzeuge">
        <div className="karte-filter" role="group" aria-label="Kategorie-Filter">
          {KATEGORIEN.map((kat) => (
            <button
              key={kat}
              type="button"
              className={`karte-filter-btn${kat === kategorie ? " aktiv" : ""}`}
              onClick={() => setKategorie(kat)}
            >
              {KATEGORIE_LABEL[kat]}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="karte-suche"
          placeholder="Karte durchsuchen … (z. B. Weizen, Brezn)"
          aria-label="Speisekarte durchsuchen"
          value={suche}
          onChange={(e) => setSuche(e.target.value)}
        />
      </div>

      <span className="karte-treffer">
        {treffer.length} {treffer.length === 1 ? "Eintrag" : "Einträge"}
      </span>

      <div className="karte-liste">
        {treffer.length === 0 ? (
          <p className="karte-leer">Keine Treffer für „{suche}". Bitte Suche anpassen.</p>
        ) : (
          treffer.map((p) => (
            <article className="karte-item" key={p.name}>
              <div className="karte-item-kopf">
                <h4>{p.name}</h4>
                <span className="karte-preis">{euro(p.preis)}</span>
              </div>
              <p className="karte-beschreibung">{p.beschreibung}</p>
              <div className="karte-item-fuss">
                <span className={`karte-tag karte-tag-${p.kat}`}>{KATEGORIE_LABEL[p.kat]}</span>
                <span className="karte-groesse">{p.groesse}</span>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
