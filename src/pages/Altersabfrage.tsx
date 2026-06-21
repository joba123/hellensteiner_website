import { useState, type FormEvent } from "react";
import { Länderwahl } from "../components/Länderwahl";
import { Datum } from "../components/Datum";
import { ErrorMessage } from "../components/ErrorMessage";

//Mindestalter für Bierkonsum in verschiedenen Ländern
const mindestAlter: Record<string, number> = {  
  DE: 16,
  AT: 16,
  CH: 16,
  FR: 18,
  BE: 16,
  NL: 18,
  LU: 16,
  DK: 16,
  PL: 18,
  CZ: 18
};

//Ländernamen
const laenderNamen: Record<string, string> = { 
  DE: "Deutschland",
  AT: "Österreich",
  CH: "Schweiz",
  FR: "Frankreich",
  BE: "Belgien",
  NL: "Niederlande",
  LU: "Luxemburg",
  DK: "Dänemark",
  PL: "Polen",
  CZ: "Tschechien"
};

function leseFreigabe() { 
  try {
    return sessionStorage.getItem("hellensteinerAgeVerified") === "true";
  } catch {
    return false;
  }
}

export function Altersabfrage() {
  const [istBestaetigt, setIstBestaetigt] = useState(leseFreigabe);
  const [error, setError] = useState("");
  const [land, setLand] = useState("DE");
  const [tag, setTag] = useState("");
  const [monat, setMonat] = useState("");
  const [jahr, setJahr] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const altersgrenze = mindestAlter[land];
    const tagZahl = Number(tag);
    const monatZahl = Number(monat);
    const jahrZahl = Number(jahr);
    const geburtsdatum = new Date(jahrZahl, monatZahl - 1, tagZahl);

    if (!land || !altersgrenze || !tag || !monat || !jahr) {
      setError("Bitte wählen Sie ein Land aus und geben Sie Ihr vollständiges Geburtsdatum ein.");
      return;
    }

    if (
      Number.isNaN(tagZahl) ||
      Number.isNaN(monatZahl) ||
      Number.isNaN(jahrZahl) ||
      geburtsdatum.getFullYear() !== jahrZahl ||
      geburtsdatum.getMonth() !== monatZahl - 1 ||
      geburtsdatum.getDate() !== tagZahl ||
      geburtsdatum > new Date()
    ) {
      setError("Bitte geben Sie ein gültiges Geburtsdatum ein.");
      return;
    }

    const heute = new Date();
    const stichtag = new Date(jahrZahl + altersgrenze, monatZahl - 1, tagZahl);
    heute.setHours(0, 0, 0, 0);

    if (stichtag > heute) {
      setError(`Für ${laenderNamen[land]} müssen Sie mindestens ${altersgrenze} Jahre alt sein.`);
      return;
    }

    try {
      sessionStorage.setItem("hellensteinerAgeVerified", "true");
    } catch {

    }

    setIstBestaetigt(true);
    setError("");
  }

  if (istBestaetigt) {
    return null;
  }

  return (
    <div className="altersabfrage-hintergrund" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
      <div className="altersabfrage-karte">
        <img src="/assets/images_converted/transparent/logo_neu_2.png" alt="Hellensteiner Bräu Logo" />
        <p className="altersabfrage-vortitel">Altersprüfung</p>
        <h2 id="age-gate-title">Bitte sag uns,<br />wann du geboren bist.</h2>
        <form className="altersabfrage-formular" onSubmit={handleSubmit} noValidate>
          <Länderwahl
            id="age-country"
            label="Land auswählen"
            options={laenderNamen}
            value={land}
            onChange={setLand}
          />
          <fieldset className="geburtsdatum-felder">
            <legend>Geburtsdatum</legend>
            <Datum id="age-day" label="Tag" placeholder="TT" maxLength={2} value={tag} onChange={setTag} />
            <Datum id="age-month" label="Monat" placeholder="MM" maxLength={2} value={monat} onChange={setMonat} />
            <Datum id="age-year" label="Jahr" placeholder="JJJJ" maxLength={4} value={jahr} onChange={setJahr} />
          </fieldset>
          <button type="submit" className="bestaetigen-knopf">WEITER</button>
          <p className="altersabfrage-hinweis">Bitte genieße verantwortungsvoll.</p>
          <ErrorMessage message={error} />
        </form>
      </div>
    </div>
  );
}
