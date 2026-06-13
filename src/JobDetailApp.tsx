import { ApplicationForm } from "./components/ApplicationForm";
import { Button } from "./components/Button";
import {
  findeJob,
  jobKategorieInfos,
  type Job
} from "../assets/ts/jobs";

function getJobAusUrl(): Job | undefined {
  const params = new URLSearchParams(window.location.search);
  const [, jobIdAusPfad] = window.location.pathname.match(/\/bewerbung\/([^/]+)/) ?? [];
  const jobId = jobIdAusPfad ? decodeURIComponent(jobIdAusPfad) : params.get("id");

  if (!jobId) {
    return undefined;
  }

  return findeJob(jobId);
}

function mailtoHref(job: Job): string {
  const subject = encodeURIComponent(job.mailSubject);
  const body = encodeURIComponent(
    `Hallo Hellensteiner Team,\n\nich interessiere mich für die Stelle "${job.titel}".\n\nViele Grüße`
  );

  return `mailto:karriere@hellensteiner.de?subject=${subject}&body=${body}`;
}

export function JobDetailApp() {
  const job = getJobAusUrl();

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

  const kategorieInfo = jobKategorieInfos[job.kategorie];

  return (
    <main className="application-page">
      <nav className="application-breadcrumb" aria-label="Bewerbungsnavigation">
        <a href="/karriere">Karriere</a>
        <span aria-hidden="true">&gt;</span>
        <span aria-current="page">{job.titel}</span>
      </nav>

      <section className="application-hero" aria-labelledby="application-title">
        <div>
          <p className="career-eyebrow">{kategorieInfo.navigationLabel}</p>
          <h1 id="application-title">{job.titel}</h1>
          <p>{job.beschreibung}</p>
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

      <section className="application-layout">
        <div className="application-content">
          {job.details.map((abschnitt) => (
            <article className="application-block" key={abschnitt.titel}>
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

          <article className="application-block">
            <h2>Das bringst du mit</h2>
            <ul>
              {job.anforderungen.map((anforderung) => (
                <li key={anforderung}>{anforderung}</li>
              ))}
            </ul>
          </article>

          <article className="application-block">
            <h2>Das bieten wir dir</h2>
            <ul>
              {job.vorteile.map((vorteil) => (
                <li key={vorteil}>{vorteil}</li>
              ))}
            </ul>
          </article>

          <article className="application-block">
            <h2>Deine Perspektive</h2>
            <p>{job.perspektive}</p>
          </article>
        </div>

        <aside className="application-apply" aria-labelledby="apply-title">
          <h2 id="apply-title">Jetzt bewerben</h2>
          <p>
            Fülle das Formular aus oder sende deine Unterlagen direkt per E-Mail an unser Karriere-Team.
          </p>
          <ApplicationForm job={job} />
          <Button as="a" href={mailtoHref(job)} className="application-mail-button">
            Per E-Mail bewerben
          </Button>
        </aside>
      </section>
    </main>
  );
}
