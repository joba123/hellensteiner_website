import { useState } from "react";
import { Link, useParams } from "react-router";
import { Bewerbungsformular } from "../components/Bewerbungsformular";
import { Button } from "../components/Button";
import { findeJob, jobKategorieInfos } from "../../assets/ts/jobs";

export function BewerbungApp() {
  const { id } = useParams();
  const stelle = id ? findeJob(decodeURIComponent(id)) : undefined;
  const [bewerbungVerschickt, setBewerbungVerschickt] = useState(false);

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

  if (bewerbungVerschickt) {
    return (
      <main className="bewerbung-seite bewerbung-seite--leer">
        <section className="bewerbung-leer">
          <p className="karriere-ueberzeile">Bewerbung</p>
          <h1>Vielen Dank für deine Bewerbung!</h1>
          <p>
            Wir haben deine Bewerbung für die Stelle „{stelle.titel}" erhalten und melden uns bald bei dir.
            Es wurden keine echten Daten versendet.
          </p>
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
        <Link to={`/bewerbung/${encodeURIComponent(stelle.id)}`}>{stelle.titel}</Link>
        <span aria-hidden="true">&gt;</span>
        <span aria-current="page">Bewerbung</span>
      </nav>

      <section className="bewerbung-aufmacher" aria-labelledby="bewerbung-title">
        <div>
          <p className="karriere-ueberzeile">{kategorieInfo.navigationLabel}</p>
          <h1 id="bewerbung-title">Jetzt bei Hellensteiner bewerben</h1>
          <p>
            Schick uns deine Unterlagen für die Stelle „{stelle.titel}". Fülle das Formular aus und
            lade deinen Lebenslauf sowie deine Zeugnisse hoch.
          </p>
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
        </aside>
      </section>

      <section className="bewerbung-formularseite" aria-labelledby="bewerbung-form-title">
        <h2 id="bewerbung-form-title">Deine Bewerbung</h2>
        <Bewerbungsformular job={stelle} onAbgeschickt={() => setBewerbungVerschickt(true)} />
      </section>
    </main>
  );
}
