type LegalSection = {
  title: string;
  body: string[];
};

const privacySections: LegalSection[] = [
  {
    title: "Verantwortliche Stelle",
    body: [
      "Hellensteiner Bräu, Schmelzofenvorstadt 39, 89520 Heidenheim an der Brenz, Deutschland.",
      "E-Mail: info@hellensteiner.de. Verantwortlich im Sinne der Datenschutzgesetze ist die Geschäftsleitung der Hellensteiner Bräu."
    ]
  },
  {
    title: "Erhebung und Nutzung personenbezogener Daten",
    body: [
      "Wir verarbeiten personenbezogene Daten nur, soweit dies notwendig ist, um unsere Website, unseren Online-Shop oder unsere Informationsangebote bereitzustellen.",
      "Dazu zählen technische Daten wie IP-Adresse, Browsertyp oder Zeitpunkt des Seitenaufrufs. Diese Daten dienen ausschließlich der Systemsicherheit und Verbesserung unseres Internetauftritts."
    ]
  },
  {
    title: "Cookies",
    body: [
      "Unsere Website verwendet Cookies, um ein bestmögliches Nutzererlebnis zu bieten.",
      "Sie können das Setzen von Cookies in den Einstellungen Ihres Browsers einschränken oder deaktivieren."
    ]
  },
  {
    title: "Kontaktformular und Kommunikation",
    body: [
      "Wenn Sie uns per E-Mail oder telefonisch erreichen, speichern wir Ihre Angaben zur Bearbeitung Ihrer Anfrage und für mögliche Rückfragen.",
      "Ihre Daten werden nicht an Dritte weitergegeben, außer es besteht eine gesetzliche Verpflichtung oder Sie haben ausdrücklich zugestimmt."
    ]
  },
  {
    title: "Ihre Rechte",
    body: [
      "Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer personenbezogenen Daten.",
      "Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen."
    ]
  },
  {
    title: "Fragen zum Datenschutz",
    body: [
      "Bei Fragen erreichen Sie die Datenschutzabteilung unter datenschutz@hellensteiner.de."
    ]
  }
];

const agbSections: LegalSection[] = [
  {
    title: "1. Geltungsbereich",
    body: [
      "Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen und Vertragsabschlüsse über den Online-Shop der Hellensteiner Bräu.",
      "Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, die Hellensteiner Bräu stimmt ihrer Geltung ausdrücklich zu."
    ]
  },
  {
    title: "2. Vertragspartner",
    body: [
      "Der Kaufvertrag kommt zustande mit der Hellensteiner Bräu, Schmelzofenvorstadt 39, 89520 Heidenheim an der Brenz.",
      "E-Mail: info@hellensteiner.de, Telefon: +49 (0)7321 123456."
    ]
  },
  {
    title: "3. Vertragsabschluss",
    body: [
      "Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar.",
      "Durch Absenden der Bestellung geben Sie ein verbindliches Angebot ab. Der Vertrag kommt zustande, sobald Sie eine Bestellbestätigung erhalten."
    ]
  },
  {
    title: "4. Jugendschutz",
    body: [
      "Der Verkauf alkoholischer Getränke erfolgt ausschließlich an volljährige Personen ab 18 Jahren.",
      "Bei der Lieferung behalten wir uns vor, eine Altersprüfung durchzuführen."
    ]
  },
  {
    title: "5. Preise, Zahlung und Lieferung",
    body: [
      "Alle Preise verstehen sich in Euro inklusive gesetzlicher Mehrwertsteuer. Versandkosten werden im Bestellprozess ausgewiesen.",
      "Lieferzeiten und Verfügbarkeit entnehmen Sie den jeweiligen Produktseiten."
    ]
  },
  {
    title: "6. Widerruf, Haftung und Schlussbestimmungen",
    body: [
      "Verbraucher haben das Recht, ihre Bestellung innerhalb von 14 Tagen zu widerrufen, soweit kein Ausschlussgrund vorliegt.",
      "Es gilt deutsches Recht. Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt."
    ]
  }
];

const impressumSections: LegalSection[] = [
  {
    title: "Angaben gemäß § 5 TMG",
    body: [
      "Brauerei Hellensteiner Bräu, Schmelzofenvorstadt 39, 89520 Heidenheim an der Brenz, Deutschland."
    ]
  },
  {
    title: "Vertretungsberechtigte",
    body: [
      "Geschäftsführung: Markus Hellenstein, Brauereiinhaber und Braumeister in vierter Generation.",
      "Die Hellensteiner Bräu steht für handwerkliche Braukunst, regionale Rohstoffe und den Erhalt der Heidenheimer Biertradition seit 1892."
    ]
  },
  {
    title: "Kontakt",
    body: [
      "Telefon: +49 (0)7321 9876543, E-Mail: info@hellensteiner.de, Fax: +49 (0)7321 9876544."
    ]
  },
  {
    title: "Umsatzsteuer-ID und Aufsichtsbehörde",
    body: [
      "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE275894120.",
      "Aufsichtsbehörde: Landratsamt Heidenheim, Fachdienst Lebensmittelüberwachung und Verbraucherschutz."
    ]
  },
  {
    title: "Haftung für Inhalte und Links",
    body: [
      "Wir bemühen uns, die Inhalte dieser Website aktuell, vollständig und korrekt zu halten.",
      "Für Inhalte externer Links übernehmen wir keine Haftung; verantwortlich sind ausschließlich deren Betreiber."
    ]
  }
];

function LegalPage({
  title,
  dateLabel,
  image,
  imageAlt,
  sections
}: {
  title: string;
  dateLabel: string;
  image: string;
  imageAlt: string;
  sections: LegalSection[];
}) {
  return (
    <main className="body">
      <section className="header2">
        <h1>{title}</h1>
        <p><strong>{dateLabel}</strong> 18. Oktober 2025</p>
      </section>
      <section className="container">
        <img src={image} alt={imageAlt} className="side-image" />
        {sections.map((section) => (
          <article key={section.title}>
            <h1>{section.title}</h1>
            {section.body.map((paragraph) => (
              <p className="absatz-zwei" key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </section>
    </main>
  );
}

export function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzrichtlinie"
      dateLabel="Aktualisiert am:"
      image="/assets/images_converted/Image-Datenschutz.jpg"
      imageAlt="Freunde stoßen mit Hellensteiner-Bräu-Biergläsern und -Flasche an."
      sections={privacySections}
    />
  );
}

export function AgbPage() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen (AGB)"
      dateLabel="Aktualisiert am:"
      image="/assets/images_converted/Image-AGB.jpg"
      imageAlt="Holzfässer mit Hellensteiner-Bräu-Logo in einer Brauerei."
      sections={agbSections}
    />
  );
}

export function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      dateLabel="Stand:"
      image="/assets/images_converted/Image-Impressum.jpg"
      imageAlt="Nahaufnahme eines glänzenden Bierzapfhahns in einer Bar."
      sections={impressumSections}
    />
  );
}
