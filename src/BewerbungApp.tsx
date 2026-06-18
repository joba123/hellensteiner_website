import { useState } from "react";
import { Link, useParams } from "react-router";
import { Bewerbungsformular } from "./components/Bewerbungsformular";
import { Button } from "./components/Button";
import { findeJob, jobKategorieInfos } from "../assets/ts/jobs";

export function BewerbungApp() {
  const { id } = useParams();
  const job = id ? findeJob(decodeURIComponent(id)) : undefined;
  const [bewerbungVerschickt, setBewerbungVerschickt] = useState(false);

  if (!job) {
    return (
      <main className="application-page application-page--empty">
        <section className="application-empty">
          <p className="career-eyebrow">Karriere</p>
          <h1>Ausschreibung nicht gefunden</h1>
          <p>Diese Stelle gibt es nicht oder der Link ist unvollständig.</p>
          <Button as="a" href="/karriere">
            Zurück zur Karriere
          </Button>
        </section>
      </main>
    );
  }

  if (bewerbungVerschickt) {
    return (
      <main className="application-page application-page--empty">
        <section className="application-empty">
          <p className="career-eyebrow">Bewerbung</p>
          <h1>Vielen Dank für deine Bewerbung!</h1>
          <p>
            Wir haben deine Bewerbung für die Stelle „{job.titel}" erhalten und melden uns bald bei dir.
            Es wurden keine echten Daten versendet.
          </p>
          <Button as="a" href="/karriere">
            Zurück zur Karriere
          </Button>
        </section>
      </main>
    );
  }

  const kategorieInfo = jobKategorieInfos[job.kategorie];

  return (
    <main className="application-page">
      <nav className="application-breadcrumb" aria-label="Bewerbungsnavigation">
        <Link to="/karriere">Karriere</Link>
        <span aria-hidden="true">&gt;</span>
        <Link to={`/bewerbung/${encodeURIComponent(job.id)}`}>{job.titel}</Link>
        <span aria-hidden="true">&gt;</span>
        <span aria-current="page">Bewerbung</span>
      </nav>

      <section className="application-hero" aria-labelledby="bewerbung-title">
        <div>
          <p className="career-eyebrow">{kategorieInfo.navigationLabel}</p>
          <h1 id="bewerbung-title">Jetzt bei Hellensteiner bewerben</h1>
          <p>
            Schick uns deine Unterlagen für die Stelle „{job.titel}". Fülle das Formular aus und
            lade deinen Lebenslauf sowie deine Zeugnisse hoch.
          </p>
        </div>
        <aside className="application-summary" aria-label="Stellendetails">
          <p>
            <span>Standort</span>
            {job.standort}
          </p>
          <p>
            <span>Start</span>
            {job.start}
          </p>
          <p>
            <span>Arbeitsmodell</span>
            {job.arbeitsmodell}
          </p>
        </aside>
      </section>

      <section className="application-apply-page" aria-labelledby="bewerbung-form-title">
        <h2 id="bewerbung-form-title">Deine Bewerbung</h2>
        <Bewerbungsformular job={job} onAbgeschickt={() => setBewerbungVerschickt(true)} />
      </section>
    </main>
  );
}
