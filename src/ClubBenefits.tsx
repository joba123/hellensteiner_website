import { ClubBenefitCard } from "./components/ClubBenefitCard";

const clubBenefits = [
  {
    imageSrc: "/assets/images/starterpaket.png",
    imageAlt: "Starterpaket mit Hellensteiner Bräu Flasche, Glas und Shirt",
    title: "Dein Starterpaket",
    text: "Zum Start bekommst du ein exklusives Starterpaket mit Hellensteiner-Merch, einem Glas und kleinen Überraschungen."
  },
  {
    imageSrc: "/assets/images/freibier.png",
    imageAlt: "Frisch gezapftes Bier als Freibier-Vorteil",
    title: "Freibier",
    text: "Als Mitglied erwartet dich regelmäßig ein kühles Freibier. Einfach vorbeikommen, genießen und gemeinsam anstoßen."
  },
  {
    imageSrc: "/assets/images/aktionen.png",
    imageAlt: "Freundeclub-Aktionen mit Rabatten und besonderen Angeboten",
    title: "Aktionen",
    text: "Profitiere von exklusiven Freundeclub-Aktionen, Sonderrabatten, limitierten Editionen und besonderen Angeboten."
  },
  {
    imageSrc: "/assets/images/aktivitaeten.png",
    imageAlt: "Gemeinsame Aktivität im Freundeclub",
    title: "Gemeinsame Aktivitäten",
    text: "Ob Sommerfest, Biergarten-Abend oder Ausflug: Du bist dabei, wenn wir zusammen feiern und genießen."
  },
  {
    imageSrc: "/assets/images/geb_geschenk.png",
    imageAlt: "Geburtstagsgeschenk neben einem Hellensteiner Bräu Bier",
    title: "Geburtstagsgeschenk",
    text: "An deinem Geburtstag stoßen wir mit dir an und überraschen dich mit einem besonderen Hellensteiner Geschenk."
  },
  {
    imageSrc: "/assets/images/brF.png",
    imageAlt: "Brauereiführung mit Gästen in der Brauerei",
    title: "Brauereiführungen",
    text: "Erhalte spannende Einblicke hinter die Kulissen und lerne, wie unser Hellensteiner Bräu entsteht."
  }
];

export function ClubBenefits() {
  return (
    <div className="vorteile-grid">
      {clubBenefits.map((benefit) => (
        <ClubBenefitCard
          imageSrc={benefit.imageSrc}
          imageAlt={benefit.imageAlt}
          title={benefit.title}
          key={benefit.title}
        >
          {benefit.text}
        </ClubBenefitCard>
      ))}
    </div>
  );
}
