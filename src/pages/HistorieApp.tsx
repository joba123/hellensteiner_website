import { Hero } from "../components/Hero";
import { Slideshow } from "../components/Slideshow";
import { Zeitreise } from "../components/Zeitreise";
import { useSichtbar } from "../../assets/ts/useSichtbar";
import { StatCard } from "../components/StatCard";

const GRUENDUNG = 1846;

const HISTORIE_SPRUECHE = [
  "Seit 1846 mit Herz, Hopfen und Heimat.",
  "Eine Geschichte, die man in jedem Schluck schmeckt.",
  "Aus der Asche zur Brautradition – fünf Generationen stark.",
  "Tradition trifft Innovation – damals wie heute."
];

function Fakten() {
  const { ref, sichtbar } = useSichtbar<HTMLDivElement>();
  const jahre = new Date().getFullYear() - GRUENDUNG;

  const fakten = [
    { ziel: GRUENDUNG, label: "Gegründet" },
    { ziel: jahre, label: "Jahre Tradition" },
    { ziel: 5, label: "Generationen" },
    { ziel: 12, label: "Biersorten" }
  ];

  return (
    <section className="dyn-section" id="fakten">
      <h2>Zahlen &amp; Fakten</h2>
      <div ref={ref} className={`startseiten-kennzahlen__grid reveal${sichtbar ? " sichtbar" : ""}`}>
        {fakten.map((f, i) => (
          <StatCard key={f.label} end={f.ziel} label={f.label} index={i} />
        ))}
      </div>
    </section>
  );
}

function Geschaeftsfuehrung() {
  const { ref, sichtbar } = useSichtbar<HTMLDivElement>();
  return (
    <section className="dyn-section" id="gf">
      <h2>Unsere Geschäftsführung</h2>
      <div ref={ref} className={`geschäftsführung gf reveal${sichtbar ? " sichtbar" : ""}`}>
        <img src="/assets/images_converted/gruender.jpg" alt="Gründung der Brauerei 1846" />
        <p>
          Im Jahr 1846, als die ersten Dampflokomotiven durch das württembergische Hügelland schnauften
          und die Industrialisierung langsam die Dörfer erreichte, saß ein junger Mann namens Johann
          Benedikt Hellenstein in der Stube seines Elternhauses am Fuße der gleichnamigen Burg. Er war
          Müller, Tüftler und leidenschaftlicher Bierliebhaber – und er hatte eine Vision: ein Bier, das
          nicht nur den Durst stillt, sondern die Seele wärmt.Johann war fasziniert von der Kunst des
          Brauens. Er experimentierte mit Hopfen aus Tettnang, Gerste von den Feldern rund um Heidenheim
          und dem klaren Quellwasser aus dem Brenztal. Nach vielen Versuchen gelang ihm ein Sud, der so
          ausgewogen war, dass selbst der örtliche Pfarrer nach der Messe ein Krüglein verlangte.
        </p>
      </div>
    </section>
  );
}

export function HistorieApp() {
  return (
    <>
      <Hero
        bild="/assets/images_converted/hero_img.jpg"
        bildAlt="Die Hellensteiner Brauerei"
        titel="Unsere Historie"
        sprueche={HISTORIE_SPRUECHE}
        badge={
          <span className="seit-badge">
            Seit {GRUENDUNG} · {new Date().getFullYear() - GRUENDUNG} Jahre Brautradition
          </span>
        }
      />
      <Slideshow />
      <Fakten />
      <Geschaeftsfuehrung />
      <Zeitreise />
    </>
  );
}
