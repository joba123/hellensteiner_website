import { CareerSection } from "./components/CareerSection";
import { jobKategorieReihenfolge } from "../assets/ts/jobs";

export function CareerApp() {
  return (
    <main className="career-page">
      <section className="career-hero" aria-labelledby="career-title">
        <p className="career-eyebrow">Karriere bei Hellensteiner Bräu</p>
        <h1 id="career-title">Arbeite dort, wo Handwerk Charakter bekommt.</h1>
        <p>
          Ob Ausbildung, duales Studium oder nächster Karriereschritt: Bei uns arbeitest du nah am Produkt,
          mit moderner Technik und Menschen, die Braukultur ernst nehmen.
        </p>
        <div className="career-hero__facts" aria-label="Karriere Vorteile">
          <span>Regional verwurzelt</span>
          <span>Familiäres Team</span>
          <span>Moderne Brauerei</span>
        </div>
      </section>

      {jobKategorieReihenfolge.map((kategorie) => (
        <CareerSection kategorie={kategorie} key={kategorie} />
      ))}
    </main>
  );
}
