import { useState, type FormEvent } from "react";
import type { Job } from "../../assets/ts/jobs";
import { Button } from "./Button";

export function ApplicationForm({ job }: { job: Job }) {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(`Danke! Deine Bewerbung für ${job.titel} wurde vorbereitet.`);
    event.currentTarget.reset();
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <div className="application-form__grid">
        <label>
          <span>Name *</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>E-Mail *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Telefon</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          <span>Frühester Start</span>
          <input name="start" type="text" placeholder="z. B. ab September 2026" />
        </label>
      </div>

      <label>
        <span>Nachricht *</span>
        <textarea
          name="message"
          rows={6}
          required
          defaultValue={`Hallo Hellensteiner Team,\n\nich interessiere mich für die Stelle "${job.titel}".`}
        />
      </label>

      <label className="application-form__check">
        <input name="privacy" type="checkbox" required />
        <span>Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Bewerbung zu. *</span>
      </label>

      <Button type="submit" className="application-form__submit">
        Bewerbung vorbereiten
      </Button>

      {status && (
        <p className="application-form__status" role="status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  );
}
