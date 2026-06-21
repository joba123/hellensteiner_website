import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";

const RUHETAG = 1;
const ZEITEN = ["11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"];
const MAX_GAESTE = 12;
const SPEICHER = "hb_reservierungen";
const MONATE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];

interface Reservierung {
  id: number;
  datum: string;
  zeit: string;
  personen: number;
  name: string;
  email: string;
  notiz: string;
}

interface Meldung {
  art: "erfolg" | "fehler";
  inhalt: ReactNode;
}

const pad = (n: number) => String(n).padStart(2, "0");
const dateKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const istEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const abHeute = (d: Date) => {
  const h = new Date();
  h.setHours(0, 0, 0, 0);
  return d >= h;
};
const waehlbar = (d: Date) => abHeute(d) && d.getDay() !== RUHETAG;

function laden(): Reservierung[] {
  try {
    return JSON.parse(localStorage.getItem(SPEICHER) ?? "[]") as Reservierung[];
  } catch {
    return [];
  }
}

interface Zelle {
  tag: number | null;
  datum: Date | null;
  waehlbar: boolean;
  ruhetag: boolean;
}

export function Reservierung() {
  const heute = useMemo(() => new Date(), []);
  const [jahr, setJahr] = useState(heute.getFullYear());
  const [monat, setMonat] = useState(heute.getMonth());
  const [gewaehlt, setGewaehlt] = useState<Date | null>(null);

  const [zeit, setZeit] = useState(ZEITEN[0]);
  const [personen, setPersonen] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notiz, setNotiz] = useState("");
  const [nameFehler, setNameFehler] = useState(false);
  const [emailFehler, setEmailFehler] = useState(false);
  const [meldung, setMeldung] = useState<Meldung | null>(null);

  const [reservierungen, setReservierungen] = useState<Reservierung[]>(laden);

  useEffect(() => {
    localStorage.setItem(SPEICHER, JSON.stringify(reservierungen));
  }, [reservierungen]);

  const zellen = useMemo<Zelle[]>(() => {
    const start = (new Date(jahr, monat, 1).getDay() + 6) % 7;
    const anzahl = new Date(jahr, monat + 1, 0).getDate();
    const arr: Zelle[] = [];
    for (let i = 0; i < start; i++) arr.push({ tag: null, datum: null, waehlbar: false, ruhetag: false });
    for (let t = 1; t <= anzahl; t++) {
      const d = new Date(jahr, monat, t);
      arr.push({ tag: t, datum: d, waehlbar: waehlbar(d), ruhetag: d.getDay() === RUHETAG && abHeute(d) });
    }
    return arr;
  }, [jahr, monat]);

  function voriger() {
    const jetzt = new Date();
    if (jahr === jetzt.getFullYear() && monat === jetzt.getMonth()) return;
    if (monat === 0) {
      setMonat(11);
      setJahr(jahr - 1);
    } else {
      setMonat(monat - 1);
    }
  }

  function naechster() {
    if (monat === 11) {
      setMonat(0);
      setJahr(jahr + 1);
    } else {
      setMonat(monat + 1);
    }
  }

  function absenden(e: FormEvent) {
    e.preventDefault();

    if (!gewaehlt) {
      setMeldung({ art: "fehler", inhalt: "Bitte zuerst einen Tag im Kalender auswählen." });
      return;
    }

    const nameWert = name.trim();
    const emailWert = email.trim();
    const nameOk = nameWert.length >= 2 && !/\d/.test(nameWert);
    const emailOk = istEmail(emailWert);
    setNameFehler(!nameOk);
    setEmailFehler(!emailOk);

    if (!nameOk || !emailOk) {
      let text: string;
      if (!nameOk && !emailOk) text = "Bitte gib deinen Namen (ohne Zahlen) und eine gültige E-Mail-Adresse an.";
      else if (!nameOk) text = /\d/.test(nameWert) ? "Der Name darf keine Zahlen enthalten." : "Bitte gib deinen Namen an (mindestens 2 Zeichen).";
      else text = "Bitte gib eine gültige E-Mail-Adresse an (z. B. name@beispiel.de).";
      setMeldung({ art: "fehler", inhalt: text });
      return;
    }

    const reservierung: Reservierung = {
      id: Date.now(),
      datum: dateKey(gewaehlt),
      zeit,
      personen,
      name: nameWert,
      email: emailWert,
      notiz: notiz.trim()
    };
    setReservierungen((alle) => [...alle, reservierung]);

    const datumText = gewaehlt.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    setMeldung({
      art: "erfolg",
      inhalt: (
        <>
          Vielen Dank, <strong>{nameWert}</strong>! Dein Tisch für <strong>{personen}</strong>{" "}
          {personen === 1 ? "Person" : "Personen"} am <strong>{datumText}</strong> um{" "}
          <strong>{zeit} Uhr</strong> ist vorgemerkt. Eine Bestätigung schicken wir an {emailWert}.
        </>
      )
    });

    setName("");
    setEmail("");
    setNotiz("");
    setZeit(ZEITEN[0]);
    setPersonen(2);
    setGewaehlt(null);
  }

  function stornieren(id: number) {
    setReservierungen((alle) => alle.filter((r) => r.id !== id));
  }

  const sortiert = [...reservierungen].sort((a, b) => (a.datum + a.zeit).localeCompare(b.datum + b.zeit));

  return (
    <section className="dyn-section" id="reservierung" aria-label="Tisch reservieren">
      <h2>Tisch reservieren</h2>
      <p className="dyn-intro">
        Wähle deinen Wunschtag im Kalender, bestimme Uhrzeit und Anzahl der Gäste – und schon ist
        dein Platz im Biergarten vorgemerkt. Montags ist Ruhetag.
      </p>

      <form className="res-wrapper" noValidate onSubmit={absenden}>
        <div className="res-block">
          <h3>1. Tag wählen</h3>
          <div className="kal-kopf">
            <button type="button" aria-label="Voriger Monat" onClick={voriger}>‹</button>
            <span id="kal-titel">{MONATE[monat]} {jahr}</span>
            <button type="button" aria-label="Nächster Monat" onClick={naechster}>›</button>
          </div>
          <div className="kal-grid">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((w) => (
              <div className="kal-wochentag" key={w}>{w}</div>
            ))}
            {zellen.map((z, i) => {
              if (z.tag === null || z.datum === null) {
                return <div className="kal-tag leer" key={`leer-${i}`} />;
              }
              const datum = z.datum;
              const ausgewaehlt = gewaehlt !== null && dateKey(gewaehlt) === dateKey(datum);
              return (
                <button
                  type="button"
                  key={z.tag}
                  className={`kal-tag${z.waehlbar ? "" : " deaktiviert"}${ausgewaehlt ? " ausgewaehlt" : ""}`}
                  disabled={!z.waehlbar}
                  title={z.ruhetag ? "Ruhetag" : undefined}
                  onClick={() => setGewaehlt(datum)}
                >
                  {z.tag}
                </button>
              );
            })}
          </div>
          <p className="kal-legende">Vergangene Tage und Montage (Ruhetag) sind nicht wählbar.</p>
        </div>

        <div className="res-block">
          <h3>2. Details angeben</h3>

          <div className="res-feld">
            <label>Gewählter Tag</label>
            <span id="res-datum-anzeige" className={gewaehlt ? "gewaehlt" : undefined}>
              {gewaehlt
                ? gewaehlt.toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                : "Bitte oben einen Tag im Kalender wählen."}
            </span>
          </div>

          <div className="res-feld">
            <label htmlFor="res-zeit">Uhrzeit</label>
            <select id="res-zeit" required value={zeit} onChange={(e) => setZeit(e.target.value)}>
              {ZEITEN.map((z) => (
                <option key={z} value={z}>{z} Uhr</option>
              ))}
            </select>
          </div>

          <div className="res-feld">
            <label htmlFor="res-personen">Anzahl Gäste</label>
            <select id="res-personen" required value={personen} onChange={(e) => setPersonen(Number(e.target.value))}>
              {Array.from({ length: MAX_GAESTE }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "Person" : "Personen"}</option>
              ))}
            </select>
          </div>

          <div className="res-feld">
            <label htmlFor="res-name">Name</label>
            <input
              type="text"
              id="res-name"
              placeholder="Vor- und Nachname"
              required
              className={nameFehler ? "feld-fehler" : undefined}
              value={name}
              onChange={(e) => {
                const v = e.target.value;
                setName(v);
                if (v.trim().length >= 2 && !/\d/.test(v)) setNameFehler(false);
              }}
            />
          </div>

          <div className="res-feld">
            <label htmlFor="res-email">E-Mail</label>
            <input
              type="email"
              id="res-email"
              placeholder="name@beispiel.de"
              required
              className={emailFehler ? "feld-fehler" : undefined}
              value={email}
              onChange={(e) => {
                const v = e.target.value;
                setEmail(v);
                if (istEmail(v.trim())) setEmailFehler(false);
              }}
            />
          </div>

          <div className="res-feld">
            <label htmlFor="res-notiz">Anmerkung (optional)</label>
            <textarea
              id="res-notiz"
              placeholder="z. B. Kinderstuhl, Geburtstag, Sitzplatz im Schatten …"
              value={notiz}
              onChange={(e) => setNotiz(e.target.value)}
            />
          </div>

          <button type="submit" id="res-submit" disabled={!gewaehlt}>Reservierung anfragen</button>
          <div
            className={meldung ? `res-meldung ${meldung.art}` : "res-meldung"}
            role="status"
            aria-live="polite"
          >
            {meldung?.inhalt}
          </div>
        </div>
      </form>

      <div className="res-block res-meine">
        <h3>Meine Reservierungen</h3>
        <div className="res-liste">
          {sortiert.length === 0 ? (
            <p className="res-leer">Noch keine Reservierungen. Sichere dir deinen Tisch im Biergarten!</p>
          ) : (
            sortiert.map((r) => {
              const datumText = new Date(r.datum + "T00:00:00").toLocaleDateString("de-DE", {
                weekday: "short", day: "numeric", month: "long", year: "numeric"
              });
              return (
                <div className="res-eintrag" key={r.id}>
                  <div className="res-eintrag-info">
                    <strong>{datumText}</strong>
                    <span>{r.zeit} Uhr · {r.personen} {r.personen === 1 ? "Person" : "Personen"} · {r.name}</span>
                    {r.notiz && <em>„{r.notiz}"</em>}
                  </div>
                  <button
                    type="button"
                    className="res-loeschen"
                    aria-label="Reservierung stornieren"
                    onClick={() => stornieren(r.id)}
                  >
                    Stornieren
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
