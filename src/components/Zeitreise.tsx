import { Fragment } from "react";
import { useSichtbar } from "../../assets/ts/useSichtbar";

interface Meilenstein {
  id: string;
  jahr: string;
  titel: string;
  bild: string;
  alt: string;
  zeilen: string[];
}

const MEILENSTEINE: Meilenstein[] = [
  {
    id: "ms-1846",
    jahr: "1846",
    titel: "Der Beginn",
    bild: "/assets/images_converted/erste.jpg",
    alt: "Gründung der Brauerei 1846",
    zeilen: [
      "Im Jahr 1846 begann unsere Reise mit einer kleinen Brauerei am Rande eines malerischen Dorfes.",
      "Mit nichts weiter als Leidenschaft, handwerklichem Geschick und dem festen Glauben an die Kunst des Bierbrauens wurde das erste Fass angestochen.",
      "Der Duft von frisch gemälztem Getreide und der würzigen Hopfenaromen erfüllte die Luft – ein Zeichen dafür, dass hier etwas Besonderes entstand.",
      "Was als bescheidene Braustube begann, wurde bald zum Treffpunkt für Freunde, Nachbarn und Reisende.",
      "Jeder Schluck erzählte von harter Arbeit, von Geduld und von der Liebe zum Detail."
    ]
  },
  {
    id: "ms-1853",
    jahr: "1853",
    titel: "Erste Probleme",
    bild: "/assets/images_converted/problem.jpg",
    alt: "Herausforderungen der Brauerei",
    zeilen: [
      "Die ersten Jahre waren nicht einfach: Schwankende Rohstoffpreise, technische Herausforderungen und harte Konkurrenz stellten unsere junge Brauerei immer wieder auf die Probe.",
      "Doch jede Herausforderung stärkte unseren Willen, weiterzumachen.",
      "Eines Nachts, im Herbst des Jahres 1853, traf uns ein schwerer Schlag ein Brand brach in der Braustube aus.",
      "Innerhalb weniger Stunden standen Kessel, Fässer und Vorräte in Flammen. Für einen Moment schien all die Arbeit, all die Leidenschaft der vergangenen Jahre verloren.",
      "Doch die Menschen des Ortes hielten zusammen. Nachbarn, Freunde und sogar ehemalige Konkurrenten eilten herbei, halfen beim Löschen und beim Wiederaufbau."
    ]
  },
  {
    id: "ms-1854",
    jahr: "1854",
    titel: "Der Wiederaufbau",
    bild: "/assets/images_converted/aufbau.jpg",
    alt: "Wiederaufbau der Brauerei",
    zeilen: [
      "Nach schwierigen Zeiten wagten wir den Wiederaufbau. Mit Mut, Entschlossenheit und einem klaren Blick in die Zukunft erhoben wir uns aus der Asche.",
      "Neue Technologien, modernisierte Brauanlagen und das unermüdliche Engagement unseres Teams ließen die Brauerei erneut erblühen.",
      "Jeder Stein, der gesetzt, jedes Fass, das gefüllt wurde, stand sinnbildlich für unseren Glauben an das, was uns schon immer angetrieben hat: die Liebe zum Brauhandwerk.",
      "Doch bei aller Modernisierung blieb eines unverändert unser Herz für Qualität und Tradition.",
      "Wir verfeinerten unsere Rezepturen, ohne ihren ursprünglichen Charakter zu verlieren. Die handwerkliche Sorgfalt, die schon unsere Gründer ausgezeichnet hatte, blieb das Fundament, auf dem wir weiter aufbauten."
    ]
  },
  {
    id: "ms-heute",
    jahr: "Heute",
    titel: "Die Revolution",
    bild: "/assets/images_converted/rev.jpg",
    alt: "Innovationen in der Brauerei",
    zeilen: [
      "Mit innovativen Rezepturen und modernen Methoden revolutionierten wir das Brauhandwerk.",
      "Neue Biere, neue Geschmacksrichtungen – wir kombinierten Tradition mit Innovation und setzten Maßstäbe für die Zukunft des Brauens.",
      "Dabei blieb unser Ziel stets dasselbe: Bier nicht nur zu produzieren, sondern es erlebbar zu machen – mit Charakter, Seele und einer Geschichte, die man in jedem Schluck spürt.",
      "Unsere Braumeister experimentierten mit regionalen Zutaten, besonderen Hopfensorten und neuartigen Brauverfahren.",
      "So entstanden Sorten, die nicht nur den Geschmack, sondern auch die Vorstellung davon, was Bier sein kann, erweiterten.",
      "Jedes neue Rezept war ein mutiger Schritt und zugleich eine Hommage an das handwerkliche Können unserer Vorfahren."
    ]
  }
];

function scrolleZu(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function TimelineEintrag({ m }: { m: Meilenstein }) {
  const { ref, sichtbar } = useSichtbar<HTMLElement>();
  return (
    <article ref={ref} className={`tl-eintrag reveal${sichtbar ? " sichtbar" : ""}`} id={m.id}>
      <div className="tl-jahr">{m.jahr}</div>
      <div className="tl-inhalt">
        <h3>{m.titel}</h3>
        <img src={m.bild} alt={m.alt} />
        <p>
          {m.zeilen.map((zeile, i) => (
            <Fragment key={i}>
              {zeile}
              {i < m.zeilen.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      </div>
    </article>
  );
}

export function Zeitreise() {
  return (
    <section className="dyn-section" id="zeitreise">
      <h2>Unsere Zeitreise</h2>
      <div className="jahr-nav">
        {MEILENSTEINE.map((m) => (
          <button type="button" key={m.id} onClick={() => scrolleZu(m.id)}>
            {m.jahr}
          </button>
        ))}
      </div>

      <div className="timeline">
        {MEILENSTEINE.map((m) => (
          <TimelineEintrag m={m} key={m.id} />
        ))}
      </div>
    </section>
  );
}
