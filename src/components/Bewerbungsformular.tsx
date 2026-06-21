import { type FormEvent } from "react";
import type { Job } from "../../assets/ts/jobs";
import { Button } from "./Button";
import { Input } from "./Input";

interface Bewerbungsformular_interface {
  job: Job;
  onAbgeschickt: () => void;
}

export function Bewerbungsformular({ job, onAbgeschickt }: Bewerbungsformular_interface) {
  function bewerbungAbschicken(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    onAbgeschickt();
  }

  return (
    <form className="bewerbung-formular" onSubmit={bewerbungAbschicken}>
      <div className="bewerbung-formular__grid">
        <Input label="Vorname *" labelInSpan type="text" name="vorname" autoComplete="given-name" required />
        <Input label="Nachname *" labelInSpan type="text" name="nachname" autoComplete="family-name" required />
        <Input label="E-Mail *" labelInSpan type="email" name="email" autoComplete="email" required />
        <Input label="Telefon" labelInSpan type="tel" name="telefon" autoComplete="tel" />
        <Input label="Wohnort" labelInSpan type="text" name="wohnort" autoComplete="address-level2" />
        <Input label="Frühester Start" labelInSpan type="text" name="start" placeholder="z. B. ab September 2026" />
      </div>

      <label>
        <span>Anschreiben *</span>
        <textarea
          name="anschreiben"
          rows={6}
          required
          defaultValue={`Hallo Hellensteiner Team,\n\nich interessiere mich für die Stelle "${job.titel}".`}
        />
      </label>

      <label>
        <span>Unterlagen (Lebenslauf, Zeugnisse)</span>
        <input
          className="bewerbung-formular__dateien"
          type="file"
          name="dateien"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </label>

      <label className="bewerbung-formular__bestaetigung">
        <input type="checkbox" name="datenschutz" required />
        <span>Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Bewerbung zu. *</span>
      </label>

      <Button type="submit" className="bewerbung-formular__absenden">
        Bewerbung absenden
      </Button>
    </form>
  );
}
