import { Link, useParams } from "react-router";
import { Button } from "../components/Button";
import {
  bewerbungUrl,
  findeJob,
  jobKategorieInfos
} from "../../assets/ts/jobs";

export function JobDetailApp() {
  const { id } = useParams();
  const stelle = id ? findeJob(decodeURIComponent(id)) : undefined;

  if (!stelle) {
    return (
      <main className="bewerbung-seite bewerbung-seite--leer">
        <section className="bewerbung-leer">
          <p className="karriere-ueberzeile">Karriere</p>
          <h1>Ausschreibung nicht gefunden</h1>
          <p>Diese Stelle gibt es nicht oder der Link ist unvollständig.</p>
          <Button as="a" href="/karriere">
            Zurück zur Karriere
          </Button>
        </section>
      </main>
    );
  }

  const kategorieInfo = jobKategorieInfos[stelle.kategorie];

  return (
    <main className="bewerbung-seite">
      <nav className="bewerbung-navigation" aria-label="Bewerbungsnavigation">
        <Link to="/karriere">Karriere</Link>
        <span aria-hidden="true">&gt;</span>
        <span aria-current="page">{stelle.titel}</span>
      </nav>

      <section className="bewerbung-aufmacher" aria-labelledby="application-title">
        <div>
          <p className="karriere-ueberzeile">{kategorieInfo.navigationLabel}</p>
          <h1 id="application-title">{stelle.titel}</h1>
          <p>{stelle.beschreibung}</p>
        </div>
        <aside className="bewerbung-zusammenfassung" aria-label="Stellendetails">
          <p>
            <span>Standort</span>
            {stelle.standort}
          </p>
          <p>
            <span>Start</span>
            {stelle.start}
          </p>
          <p>
            <span>Arbeitsmodell</span>
            {stelle.arbeitsmodell}
          </p>
          <Button as="a" href={bewerbungUrl(stelle.id)} className="bewerbung-zusammenfassung__bewerben">
            Jetzt bewerben
          </Button>
        </aside>
      </section>

      <section className="bewerbung-anordnung">
        <div className="bewerbung-inhalt">
          {stelle.details.map((abschnitt) => (
            <article className="bewerbung-block" key={abschnitt.titel}>
              <h2>{abschnitt.titel}</h2>
              {abschnitt.text && <p>{abschnitt.text}</p>}
              {abschnitt.punkte && (
                <ul>
                  {abschnitt.punkte.map((punkt) => (
                    <li key={punkt}>{punkt}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          <article className="bewerbung-block">
            <h2>Das bringst du mit</h2>
            <ul>
              {stelle.anforderungen.map((anforderung) => (
                <li key={anforderung}>{anforderung}</li>
              ))}
            </ul>
          </article>

          <article className="bewerbung-block">
            <h2>Das bieten wir dir</h2>
            <ul>
              {stelle.vorteile.map((vorteil) => (
                <li key={vorteil}>{vorteil}</li>
              ))}
            </ul>
          </article>

          <article className="bewerbung-block">
            <h2>Deine Perspektive</h2>
            <p>{stelle.perspektive}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
