import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./Button";

export interface HeroAktion {
  href: string;
  label: string;
  sekundaer?: boolean;
}

interface HeroProps {
  bild: string;
  bildAlt: string;
  titel: string;
  sprueche: string[];
  /** Optionales Element über der Überschrift (z. B. Status- oder „Seit" Badge */
  badge?: ReactNode;
  /** Zeigt unter dem Spruch eine live aktualisierte Uhr an  */
  uhr_anzeigen?: boolean;
  /** Aktions-Buttons unterhalb des Spruchs */
  aktionen?: HeroAktion[];
}

function leseUhr(): string {
  const jetzt = new Date();
  const datum = jetzt.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
  const uhr = jetzt.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  return `${datum} · ${uhr} Uhr`;
}

export function Hero({ bild, bildAlt, titel, sprueche, badge, uhr_anzeigen = false, aktionen }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [sichtbar, setSichtbar] = useState(true);
  const [uhr, setUhr] = useState(leseUhr);

  useEffect(() => {
    const t = setInterval(() => {
      setSichtbar(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % sprueche.length);
        setSichtbar(true);
      }, 400);
    }, 4500);
    return () => clearInterval(t);
  }, [sprueche.length]);

  useEffect(() => {
    if (!uhr_anzeigen) return;
    const t = setInterval(() => setUhr(leseUhr()), 30_000);
    return () => clearInterval(t);
  }, [uhr_anzeigen]);

  return (
    <section className="ueber_uns">
      <img src={bild} alt={bildAlt} className="story-img" />
      <div className="story-overlay--dynamic">
        {badge}
        <h1>{titel}</h1>
        <p id="hero-spruch" style={{ opacity: sichtbar ? 1 : 0 }}>
          {sprueche[index]}
        </p>
        {uhr_anzeigen && <span id="hero-uhr">{uhr}</span>}
        {aktionen && aktionen.length > 0 && (
          <div className="hero-aktionen">
            {aktionen.map((a) => (
              <Button
                key={a.href}
                as="a"
                href={a.href}
                variant="unstyled"
                className={`hero-btn${a.sekundaer ? " sekundaer" : ""}`}
              >
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
