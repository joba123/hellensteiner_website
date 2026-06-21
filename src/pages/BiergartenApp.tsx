import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { FlipCard } from "../components/FlipCard";
import { Reveal } from "../components/Reveal";
import { Speisekarte } from "../components/Speisekarte";
import { Reservierung } from "../components/Reservierung";

const BIERGARTEN_SPRUECHE = [
  "Wo schwäbische Herzlichkeit auf Braukunst trifft.",
  "Frisch gezapft, unter alten Kastanien genossen.",
  "Lange Tische, gute Gespräche, kühles Bier.",
  "Heimat schmeckt nach Hopfen und Sonnenschein."
];

const RUHETAG = 1;
const OFFEN_AB = 11;
const ZU_AB = 23;

function leseStatus(): { offen: boolean; text: string } {
  const jetzt = new Date();
  const tag = jetzt.getDay();
  const stunde = jetzt.getHours() + jetzt.getMinutes() / 60;
  const offen = tag !== RUHETAG && stunde >= OFFEN_AB && stunde < ZU_AB;

  let text: string;
  if (offen) text = `Jetzt geöffnet · bis ${ZU_AB}:00 Uhr`;
  else if (tag === RUHETAG) text = "Heute Ruhetag · Di–So 11–23 Uhr";
  else if (stunde < OFFEN_AB) text = `Aktuell geschlossen · öffnet um ${OFFEN_AB}:00 Uhr`;
  else text = "Aktuell geschlossen · morgen ab 11:00 Uhr";
  return { offen, text };
}

function OeffnungsStatus() {
  const [status, setStatus] = useState(leseStatus);

  useEffect(() => {
    const t = setInterval(() => setStatus(leseStatus()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className={`oeffnungs-status ${status.offen ? "status-offen" : "status-zu"}`}>
      <span className="status-punkt" />
      <span className="status-text">{status.text}</span>
    </span>
  );
}

const HIGHLIGHTS = [
  {
    bild: "/assets/images_converted/rund_1.jpg",
    alt: "Ursprung des Hellensteiner Biergartens",
    titel: ["Ursprung des", "Hellensteiner Biergartens"],
    text: "Wo alles begann – mit handgebrautem Stolz und schwäbischer Leidenschaft."
  },
  {
    bild: "/assets/images_converted/rund_2.jpg",
    alt: "Schwäbischer Erfindergeist",
    titel: ["Uriger", "Schwäbischer", "Erfindergeist"],
    text: "Mut zum Neuen, ohne den Geschmack der Heimat zu verlieren."
  },
  {
    bild: "/assets/images_converted/rund_3.jpg",
    alt: "Biergarten Tradition in Baden-Württemberg",
    titel: ["Biergarten", "Tradition in Baden-Württemberg"],
    text: "Ein Biergarten, in dem Geschichte lebt – und Zukunft gebraut wird."
  }
];

const REGELN = [
  { nr: "01", titel: "Dress-Code", text: "Lässig, bequem und wetterfest – Tracht gern gesehen, Hauptsache gut gelaunt." },
  { nr: "02", titel: "Bierbänke", text: "Einfach dazusetzen, gemeinsam anstoßen – neue Bekanntschaften beim ersten Prost." },
  { nr: "03", titel: "Selbstbedienung", text: "Tablett schnappen, anstehen, genießen – Bier holen gehört zur Tradition." },
  { nr: "04", titel: "Musik & Stimmung", text: "Blasmusik, Lachen, Mitschunkeln – Rücksicht auf andere bleibt Ehrensache." }
];

export function BiergartenApp() {
  return (
    <>
      <Hero
        bild="/assets/images_converted/start_biergarten.jpg"
        bildAlt="Unser idyllischer Biergarten unter Kastanien"
        titel="Unser Biergarten"
        sprueche={BIERGARTEN_SPRUECHE}
        badge={<OeffnungsStatus />}
        zeigeUhr
        aktionen={[
          { href: "#speisekarte", label: "Zur Speisekarte" },
          { href: "#reservierung", label: "Tisch reservieren", sekundaer: true }
        ]}
      />

      <div className="biergarten-layout">
        <div className="biergarten-content">
          <div className="highlights" aria-label="Biergarten Highlights">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.alt} delay={i * 0.08}>
                <div className="highlight">
                  <img src={h.bild} alt={h.alt} />
                  <h3>
                    {h.titel.map((zeile, i) => (
                      <span key={i}>
                        {zeile}
                        {i < h.titel.length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p>{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="regeln-titel">4 Biergarten-Regeln, die jeder kennen sollte</h2>
          </Reveal>
          <div className="startseiten-werte__liste">
            {REGELN.map((r, i) => (
              <FlipCard
                key={r.nr}
                index={i}
                front={
                  <>
                    <span className="rule-number">{r.nr}</span>
                    <h3>{r.titel}</h3>
                  </>
                }
                back={<p>{r.text}</p>}
              />
            ))}
          </div>
        </div>
      </div>

      <br />

      <Reveal className="oeffnungszeiten-band">
        <div className="oeffnungszeiten-box">
          <h3>Öffnungszeiten</h3>
          <div className="oeff-zeilen">
            <span>Montag:</span><span>Ruhetag</span>
            <span>Dienstag–Sonntag:</span><span>11:00–23:00 Uhr</span>
          </div>
          <p className="hint">Küche bis 21:30 · Nur bei guter Witterung geöffnet</p>
        </div>
      </Reveal>

      <Speisekarte />
      <Reservierung />
    </>
  );
}
