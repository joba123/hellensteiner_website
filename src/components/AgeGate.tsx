import { useState, type FormEvent } from "react";
import { CountrySelect } from "./CountrySelect";
import { DateInput } from "./DateInput";
import { ErrorMessage } from "./ErrorMessage";

const minimumAges: Record<string, number> = {
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

const countryNames: Record<string, string> = {
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

function getAgeGateInitialState() {
  try {
    return sessionStorage.getItem("hellensteinerAgeVerified") === "true";
  } catch {
    return false;
  }
}

export function AgeGate() {
  const [isVerified, setIsVerified] = useState(getAgeGateInitialState);
  const [error, setError] = useState("");
  const [country, setCountry] = useState("DE");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const minimumAge = minimumAges[country];
    const dayNumber = Number(day);
    const monthNumber = Number(month);
    const yearNumber = Number(year);
    const birthdate = new Date(yearNumber, monthNumber - 1, dayNumber);

    if (!country || !minimumAge || !day || !month || !year) {
      setError("Bitte wählen Sie ein Land aus und geben Sie Ihr vollständiges Geburtsdatum ein.");
      return;
    }

    if (
      Number.isNaN(dayNumber) ||
      Number.isNaN(monthNumber) ||
      Number.isNaN(yearNumber) ||
      birthdate.getFullYear() !== yearNumber ||
      birthdate.getMonth() !== monthNumber - 1 ||
      birthdate.getDate() !== dayNumber ||
      birthdate > new Date()
    ) {
      setError("Bitte geben Sie ein gültiges Geburtsdatum ein.");
      return;
    }

    const today = new Date();
    const minimumBirthday = new Date(yearNumber + minimumAge, monthNumber - 1, dayNumber);
    today.setHours(0, 0, 0, 0);

    if (minimumBirthday > today) {
      setError(`Für ${countryNames[country]} müssen Sie mindestens ${minimumAge} Jahre alt sein.`);
      return;
    }

    try {
      sessionStorage.setItem("hellensteinerAgeVerified", "true");
    } catch {
      // Session storage can be unavailable in some browser modes.
    }

    setIsVerified(true);
    setError("");
  }

  if (isVerified) {
    return null;
  }

  return (
    <div className="alter-overlay" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
      <div className="age-gate-card">
        <img src="/assets/images/logo_neu_2.png" alt="Hellensteiner Bräu Logo" />
        <p className="age-gate-eyebrow">Altersprüfung</p>
        <h2 id="age-gate-title">Bitte sag uns,<br />wann du geboren bist.</h2>
        <form className="alter-form" onSubmit={handleSubmit} noValidate>
          <CountrySelect
            id="age-country"
            label="Land auswählen"
            options={countryNames}
            value={country}
            onChange={setCountry}
          />
          <fieldset className="age-date-fields">
            <legend>Geburtsdatum</legend>
            <DateInput id="age-day" label="Tag" placeholder="TT" maxLength={2} value={day} onChange={setDay} />
            <DateInput id="age-month" label="Monat" placeholder="MM" maxLength={2} value={month} onChange={setMonth} />
            <DateInput id="age-year" label="Jahr" placeholder="JJJJ" maxLength={4} value={year} onChange={setYear} />
          </fieldset>
          <button type="submit" className="btn_check">WEITER</button>
          <p className="age-gate-note">Bitte genieße verantwortungsvoll.</p>
          <ErrorMessage message={error} />
        </form>
      </div>
    </div>
  );
}
