import { CareerSection } from "../components/CareerSection";
import { jobKategorieReihenfolge } from "../../assets/ts/jobs";

export function CareerApp() {
  return (
    <main className="karriere-seite">
      <section className="karriere-aufmacher" aria-labelledby="career-title">
        <p className="karriere-ueberzeile">Karriere bei Hellensteiner Bräu</p>
        <h1 id="career-title">Arbeite dort, wo Handwerk Charakter bekommt.</h1>
        <p>
          Ob Ausbildung, duales Studium oder nächster Karriereschritt: Bei uns arbeitest du nah am Produkt,
          mit moderner Technik und Menschen, die Braukultur ernst nehmen.
        </p>
        <div className="karriere-aufmacher__fakten" aria-label="Karriere Vorteile">
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
