import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { FClubCard } from "../components/FClubCard";
import { Reveal } from "../components/Reveal";
import { joinClub, useAuth } from "../../assets/ts/authStore";
import { Hero } from "../components/Hero";

const FREUNDECLUB_SPRUECHE = [
  "Genieße als Mitglied exklusive Vorteile und Aktionen.",
  "Freibier, Brauereiführungen und gemeinsame Feste.",
  "Werde Teil unserer Hellensteiner Gemeinschaft.",
  "10 % Rabatt im Shop – nur für Clubmitglieder."
];

const clubVorteile = [
  {
    imageSrc: "/assets/images_converted/starterpaket.jpg",
    imageAlt: "Starterpaket mit Hellensteiner Bräu Flasche, Glas und Shirt",
    title: "Dein Starterpaket",
    text: "Zum Start bekommst du ein exklusives Starterpaket mit Hellensteiner-Merch, einem Glas und kleinen Überraschungen."
  },
  {
    imageSrc: "/assets/images_converted/freibier.jpg",
    imageAlt: "Frisch gezapftes Bier als Freibier-Vorteil",
    title: "Freibier",
    text: "Als Mitglied erwartet dich regelmäßig ein kühles Freibier. Einfach vorbeikommen, genießen und gemeinsam anstoßen."
  },
  {
    imageSrc: "/assets/images_converted/aktionen.jpg",
    imageAlt: "Freundeclub-Aktionen mit Rabatten und besonderen Angeboten",
    title: "Aktionen",
    text: "Profitiere von exklusiven Freundeclub-Aktionen, Sonderrabatten, limitierten Editionen und besonderen Angeboten."
  },
  {
    imageSrc: "/assets/images_converted/aktivitaeten.jpg",
    imageAlt: "Gemeinsame Aktivität im Freundeclub",
    title: "Gemeinsame Aktivitäten",
    text: "Ob Sommerfest, Biergarten-Abend oder Ausflug: Du bist dabei, wenn wir zusammen feiern und genießen."
  },
  {
    imageSrc: "/assets/images_converted/geb_geschenk.jpg",
    imageAlt: "Geburtstagsgeschenk neben einem Hellensteiner Bräu Bier",
    title: "Geburtstagsgeschenk",
    text: "An deinem Geburtstag stoßen wir mit dir an und überraschen dich mit einem besonderen Hellensteiner Geschenk."
  },
  {
    imageSrc: "/assets/images_converted/brF.jpg",
    imageAlt: "Brauereiführung mit Gästen in der Brauerei",
    title: "Brauereiführungen",
    text: "Erhalte spannende Einblicke hinter die Kulissen und lerne, wie unser Hellensteiner Bräu entsteht."
  }
];

function ClubVorteile() {
  return (
    <div className="vorteile-grid">
      {clubVorteile.map((vorteil, index) => (
        <Reveal key={vorteil.title} delay={index * 0.07}>
          <FClubCard
            imageSrc={vorteil.imageSrc}
            imageAlt={vorteil.imageAlt}
            title={vorteil.title}
          >
            {vorteil.text}
          </FClubCard>
        </Reveal>
      ))}
    </div>
  );
}

export function FreundeClub() {
  const { currentUser: nutzer } = useAuth();
  const [statusText, setStatusText] = useState<string | null>(null);
  const [statusArt, setStatusArt] = useState<"success" | "error">("success");

  function mitgliedWerden(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    if (!nutzer) {
      setStatusArt("error");
      setStatusText("Bitte melde dich zuerst über das Konto-Symbol oben rechts an, um dem Freundeclub beizutreten und 10 % Rabatt zu erhalten.");
      return;
    }

    if (nutzer.isClubMember) {
      setStatusArt("success");
      setStatusText("Du bist bereits Mitglied im Freundeclub und erhältst 10 % Rabatt im Shop.");
      return;
    }

    const ergebnis = joinClub();

    if (!ergebnis.success) {
      setStatusArt("error");
      setStatusText(ergebnis.error ?? "Beitritt fehlgeschlagen.");
      return;
    }

    setStatusArt("success");
    setStatusText("Willkommen im Freundeclub! Du erhältst ab sofort 10 % Rabatt im Shop.");
    event.currentTarget.reset();
  }

  return (
    <main className="freundeclub">
      <Hero
        bild="/assets/images_converted/brauerei_innen.jpg"
        bildAlt="Blick in die Hellensteiner Brauerei von innen"
        titel="Hellensteiner Freundeclub"
        sprueche={FREUNDECLUB_SPRUECHE}
        badge={<span className="seit-badge">Gemeinschaft · Genuss · Vorteile</span>}
      />

      <section className="vorteile" aria-labelledby="benefits-title">
        <div className="club-abschnitt-innen">
          <Reveal>
            <h2 id="benefits-title">Warum mitmachen?</h2>
            <p>Als Mitglied unseres Freundeclubs genießt du zahlreiche Vorteile.</p>
          </Reveal>
          <ClubVorteile />
        </div>
      </section>

      <section className="mitglied" aria-labelledby="join-title">
        <Reveal className="club-abschnitt-innen">
          <h2 id="join-title">Jetzt Mitglied werden</h2>
          <p>Melde dich direkt an und werde Teil der Hellensteiner Bräu Gemeinschaft. Das Formular sendet noch keine echten Daten.</p>

          <form className="club-formular" onSubmit={mitgliedWerden}>
            <div className="club-formular-grid">
              <label>Anrede
                <select name="anrede" required>
                  <option value="">Bitte wählen</option>
                  <option value="frau">Frau</option>
                  <option value="herr">Herr</option>
                  <option value="divers">Divers</option>
                </select>
              </label>
              <Input label="Vorname" type="text" name="vorname" autoComplete="given-name" required />
              <Input label="Nachname" type="text" name="nachname" autoComplete="family-name" required />
              <Input label="Straße" type="text" name="strasse" autoComplete="address-line1" required />
              <Input label="Hausnummer" type="text" name="hausnummer" autoComplete="address-line2" required />
              <Input label="Postleitzahl" type="text" name="postleitzahl" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" title="Bitte gib eine fünfstellige Postleitzahl ein." required />
              <Input label="Wohnort" type="text" name="wohnort" autoComplete="address-level2" required />
              <Input label="E-Mail-Adresse" type="email" name="email" autoComplete="email" required />
              <Input label="Telefonnummer" type="tel" name="telefon" autoComplete="tel" />
              <Input label="Geburtsdatum" type="date" name="geburtsdatum" autoComplete="bday" required />
              <label>T-Shirt-Größe
                <select name="shirtgroesse" required>
                  <option value="">Bitte wählen</option>
                  {["Damen-S", "Damen-M", "Damen-L", "Damen-XL", "Damen-XXL", "Herren-S", "Herren-M", "Herren-L", "Herren-XL", "Herren-XXL"].map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </label>
              <Input label="Geworben von" type="text" name="geworben_von" placeholder="Optional" />
            </div>

            <label className="club-kontrollkaestchen">
              <input type="checkbox" name="newsletter" />
              <span>Ich möchte den Freundeclub-Newsletter erhalten.</span>
            </label>
            <label className="club-kontrollkaestchen">
              <input type="checkbox" name="datenschutz" required />
              <span>Ich habe die <Link to="/datenschutz">Datenschutzhinweise</Link> gelesen und stimme der Verarbeitung meiner Angaben für die Club-Anmeldung zu.</span>
            </label>

            <Button type="submit">Anmeldung absenden</Button>
            {statusText && (
              <p
                className={`club-formular-meldung ist-sichtbar${statusArt === "error" ? " club-formular-meldung--fehler" : ""}`}
                role="status"
                aria-live="polite"
              >
                {statusText}
              </p>
            )}
          </form>
        </Reveal>
      </section>
    </main>
  );
}
