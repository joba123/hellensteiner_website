export type JobKategorie = "ausbildung" | "studium" | "fachkraefte";

export interface JobDetailAbschnitt {
  titel: string;
  text?: string;
  punkte?: readonly string[];
}

export interface JobKategorieInfo {
  id: JobKategorie;
  navigationLabel: string;
  headline: string;
  intro: string;
  vorteile: readonly string[];
}

export interface Job {
  id: string;
  kategorie: JobKategorie;
  titel: string;
  standort: string;
  start: string;
  arbeitsmodell: string;
  kurzbeschreibung: string;
  beschreibung: string;
  details: readonly JobDetailAbschnitt[];
  anforderungen: readonly string[];
  vorteile: readonly string[];
  perspektive: string;
  mailSubject: string;
}

export const jobKategorieReihenfolge: readonly JobKategorie[] = [
  "ausbildung",
  "studium",
  "fachkraefte"
];

export const jobKategorieInfos: Record<JobKategorie, JobKategorieInfo> = {
  ausbildung: {
    id: "ausbildung",
    navigationLabel: "Ausbildung",
    headline: "Ausbildung",
    intro:
      "Starte mit echtem Handwerk, moderner Technik und einem Team, das dich Schritt für Schritt einarbeitet.",
    vorteile: [
      "Praxisnahes Lernen in einer regionalen Brauerei",
      "Persönliche Betreuung statt anonymer Großbetrieb",
      "Sehr gute Übernahmechancen nach der Ausbildung"
    ]
  },
  studium: {
    id: "studium",
    navigationLabel: "Duales Studium",
    headline: "Duales Studium",
    intro:
      "Verbinde Hochschulwissen mit Brauereipraxis und arbeite früh an echten Prozessen, Produkten und Projekten mit.",
    vorteile: [
      "Praxisphasen mit Verantwortung im Betrieb",
      "Einblick in Produktion, Labor und Technologie",
      "Starke Perspektiven in der Getränke- und Lebensmitteltechnik"
    ]
  },
  fachkraefte: {
    id: "fachkraefte",
    navigationLabel: "Fachkräfte & Meister",
    headline: "Fachkräfte & Meister",
    intro:
      "Bring deine Erfahrung in eine unabhängige Brauerei ein und gestalte Qualität, Vertrieb und Zukunft aktiv mit.",
    vorteile: [
      "Kurze Wege und viel Gestaltungsspielraum",
      "Familiäres Team mit regionaler Verwurzelung",
      "Langfristige Entwicklungsmöglichkeiten"
    ]
  }
};

export const jobs: readonly Job[] = [
  {
    id: "ausbildung-brauer-maelzer",
    kategorie: "ausbildung",
    titel: "Ausbildung zum Brauer & Mälzer (m/w/d)",
    standort: "Heidenheim",
    start: "September 2026",
    arbeitsmodell: "Ausbildung · 3 Jahre",
    kurzbeschreibung:
      "Lerne das traditionelle Handwerk des Bierbrauens von der Rohstoffauswahl bis zur Abfüllung.",
    beschreibung:
      "Bier brauen ist traditionsreiches Handwerk und moderne Lebensmitteltechnologie zugleich. Als Brauer & Mälzer lernst du, wie aus Malz, Hopfen, Hefe und Wasser hochwertige Biere entstehen. Du begleitest alle Schritte vom Maischen über das Gären bis zur Filtration und Abfüllung.",
    details: [
      {
        titel: "Das lernst du bei uns",
        punkte: [
          "Auswahl und Beurteilung von Malz, Hopfen und weiteren Rohstoffen",
          "Herstellung von Würze und Bier nach traditionellen und modernen Verfahren",
          "Steuerung und Überwachung von Brau-, Gär- und Lagerprozessen",
          "Qualitätskontrollen im Labor",
          "Reinigung, Pflege und Wartung technischer Anlagen",
          "Einblick in Produktentwicklung und neue Bierspezialitäten"
        ]
      },
      {
        titel: "Ausbildungsdauer",
        text:
          "Die Ausbildung dauert regulär 3 Jahre und erfolgt im dualen System: praktische Arbeit bei Hellensteiner Bräu und theoretischer Unterricht an der Berufsschule."
      }
    ],
    anforderungen: [
      "Interesse an Lebensmitteln, Naturwissenschaften und Technik",
      "Saubere und verantwortungsvolle Arbeitsweise",
      "Teamgeist und Freude an handwerklichen Tätigkeiten",
      "Körperliche Belastbarkeit und Sorgfalt",
      "Guter Haupt- oder Realschulabschluss"
    ],
    vorteile: [
      "Moderne Ausbildung in einer regionalen, unabhängigen Brauerei",
      "Herzliches Team, das dich unterstützt und einarbeitet",
      "Sehr gute Übernahmechancen",
      "Möglichkeit zur Weiterbildung, zum Beispiel zum Braumeister",
      "Faire Vergütung und zusätzliche Benefits im Brauereiumfeld"
    ],
    perspektive:
      "Nach deiner Ausbildung stehen dir Wege in Produktion, Qualitätssicherung, Getränketechnologie oder Weiterbildung offen.",
    mailSubject: "Bewerbung Ausbildung Brauer & Mälzer"
  },
  {
    id: "ausbildung-lagerlogistik",
    kategorie: "ausbildung",
    titel: "Ausbildung Fachkraft für Lagerlogistik (m/w/d)",
    standort: "Heidenheim",
    start: "September 2026",
    arbeitsmodell: "Ausbildung · 3 Jahre",
    kurzbeschreibung:
      "Organisiere Rohstoffe, Verpackung und Versand und halte den Materialfluss der Brauerei am Laufen.",
    beschreibung:
      "In der Logistik läuft alles zusammen: Rohstoffe, Verpackungsmaterial, Maschinenkomponenten und unser fertiges Bier. Du sorgst dafür, dass Materialien rechtzeitig ankommen, richtig eingelagert werden und jederzeit abrufbar sind.",
    details: [
      {
        titel: "Das lernst du bei uns",
        punkte: [
          "Warenannahme, Prüfung und fachgerechte Einlagerung",
          "Arbeiten mit modernen Lager- und Warenwirtschaftssystemen",
          "Kommissionierung für Produktion und Abfüllung",
          "Verpacken, Versenden und Abstimmen mit Speditionen",
          "Inventuren und Bestandskontrollen",
          "Sicheres Bedienen von Flurförderzeugen"
        ]
      },
      {
        titel: "Ausbildungsdauer",
        text:
          "Die Ausbildung dauert regulär 3 Jahre und verbindet praktische Ausbildung bei Hellensteiner Bräu mit Berufsschulunterricht."
      }
    ],
    anforderungen: [
      "Zuverlässigkeit und Verantwortungsgefühl",
      "Interesse an logistischen Abläufen",
      "Sorgfältige und strukturierte Arbeitsweise",
      "Teamfähigkeit und Freude an körperlicher Tätigkeit",
      "Guter Haupt- oder Realschulabschluss"
    ],
    vorteile: [
      "Abwechslungsreiche Ausbildung mit Einblicken in alle Logistikbereiche",
      "Erwerb des Staplerscheins während der Ausbildung",
      "Modern ausgestattete Lager- und Logistikflächen",
      "Familiäres, hilfsbereites Team",
      "Sehr gute Übernahmechancen"
    ],
    perspektive:
      "Nach der Ausbildung sind Wege in Lagerleitung, Materialwirtschaft, Logistikplanung oder Weiterbildungen möglich.",
    mailSubject: "Bewerbung Ausbildung Lagerlogistik"
  },
  {
    id: "duales-studium-brautechnologie",
    kategorie: "studium",
    titel: "Duales Studium Brau- & Getränketechnologie (m/w/d)",
    standort: "Heidenheim",
    start: "Oktober 2026",
    arbeitsmodell: "Duales Studium · 3 Jahre",
    kurzbeschreibung:
      "Verbinde Ingenieurwissen, Lebensmitteltechnologie und Brauereipraxis in einem starken Einstieg.",
    beschreibung:
      "Das duale Studium verbindet Ingenieurwissenschaften, Lebensmitteltechnologie und traditionelles Brauhandwerk. In den Praxisphasen begleitest du Brau-, Gär-, Filter- und Abfüllprozesse und verknüpfst dein Hochschulwissen mit unserer Produktion.",
    details: [
      {
        titel: "Das erwartet dich",
        punkte: [
          "Grundlagen der Ingenieur- und Lebensmitteltechnologie",
          "Planung und Optimierung von Brau- und Produktionsprozessen",
          "Qualitätssicherung, Sensorik und Laboranalysen",
          "Automatisierungstechnik und moderne Prozesssteuerung",
          "Rohstoffkunde und Entwicklung neuer Getränkerezepturen",
          "Regelmäßige Praxisphasen bei Hellensteiner Bräu"
        ]
      },
      {
        titel: "Studiendauer",
        text:
          "Das duale Studium dauert regulär 3 Jahre und kombiniert Praxisphasen bei Hellensteiner Bräu mit Theoriephasen an einer Partnerhochschule."
      }
    ],
    anforderungen: [
      "Allgemeine oder fachgebundene Hochschulreife",
      "Interesse an Naturwissenschaften, Technik und Lebensmittelproduktion",
      "Gute mathematische und naturwissenschaftliche Grundlagen",
      "Teamfähigkeit und Verantwortungsbewusstsein",
      "Strukturierte und sorgfältige Arbeitsweise"
    ],
    vorteile: [
      "Praxisphasen in einer unabhängigen, regionalen Brauerei",
      "Moderne Anlagen und echte Mitwirkung an unseren Produkten",
      "Individuelle Betreuung während der Praxisphasen",
      "Abwechslungsreiche Projekte zwischen Technologie, Labor und Produktion",
      "Faire Vergütung und zusätzliche Brauerei-Benefits"
    ],
    perspektive:
      "Nach dem Studium warten Perspektiven in Produktionsleitung, Qualitätssicherung, Prozessentwicklung oder Lebensmitteltechnologie.",
    mailSubject: "Bewerbung Duales Studium Brau- & Getränketechnologie"
  },
  {
    id: "braumeister",
    kategorie: "fachkraefte",
    titel: "Braumeister (m/w/d)",
    standort: "Heidenheim",
    start: "Sofort oder nach Vereinbarung",
    arbeitsmodell: "Vollzeit",
    kurzbeschreibung:
      "Übernimm Verantwortung für Sudhausprozesse, Qualität und die Weiterentwicklung unserer Biere.",
    beschreibung:
      "Als Braumeister übernimmst du eine zentrale Rolle in unserer Produktion. Du planst, steuerst und überwachst den Brauprozess und sorgst dafür, dass unsere Biere ihren charakteristischen Geschmack und höchste Qualität behalten.",
    details: [
      {
        titel: "Deine Aufgaben",
        punkte: [
          "Eigenständige Steuerung des gesamten Brauprozesses",
          "Überwachung von Gärung, Filtration und Reifung",
          "Durchführung und Auswertung von Qualitätskontrollen",
          "Pflege, Kontrolle und Optimierung der Produktionsanlagen",
          "Weiterentwicklung bestehender Rezepte und neuer Biersorten",
          "Dokumentation aller Produktionsschritte",
          "Anleitung und Unterstützung des Brauteams"
        ]
      }
    ],
    anforderungen: [
      "Abgeschlossene Qualifikation als Braumeister",
      "Sicheres Fachwissen in Brautechnologie und Rohstoffkunde",
      "Verantwortungsbewusstsein und sorgfältige Arbeitsweise",
      "Erfahrung im Umgang mit technischen Anlagen",
      "Teamfähigkeit und Freude an Zusammenarbeit",
      "Kreativität bei der Entwicklung neuer Ideen"
    ],
    vorteile: [
      "Modernes Arbeitsumfeld in einer unabhängigen Brauerei",
      "Gestaltungsspielraum für eigene Bierideen",
      "Motiviertes, familiäres Team",
      "Leistungsgerechte Vergütung",
      "Rabatte auf Produkte unseres Sortiments"
    ],
    perspektive:
      "Du gestaltest Prozesse, Qualität und neue Spezialitäten langfristig mit und bringst deine Erfahrung sichtbar ein.",
    mailSubject: "Bewerbung Braumeister"
  },
  {
    id: "vertrieb-aussendienst",
    kategorie: "fachkraefte",
    titel: "Vertrieb & Außendienst (m/w/d)",
    standort: "Bayern & Baden-Württemberg",
    start: "Nach Vereinbarung",
    arbeitsmodell: "Vollzeit",
    kurzbeschreibung:
      "Betreue unsere Partner, entwickle regionale Absatzmöglichkeiten und mache die Marke erlebbar.",
    beschreibung:
      "Als Teil unseres Vertriebs bist du das Gesicht von Hellensteiner Bräu bei Kunden, Gastronomen, Getränkehändlern und Events. Du baust stabile Beziehungen auf, präsentierst unsere Produkte und entwickelst neue Absatzmöglichkeiten im regionalen Markt.",
    details: [
      {
        titel: "Deine Aufgaben",
        punkte: [
          "Betreuung und Ausbau unseres regionalen Kundennetzwerks",
          "Besuche bei Gastronomie- und Handelspartnern",
          "Beratung und aktiver Verkauf unserer Produkte",
          "Planung und Umsetzung von Verkaufsaktionen",
          "Organisation von Verkostungen und Promotions",
          "Markt- und Wettbewerbsbeobachtung",
          "Abstimmung mit Marketing, Produktion und Logistik"
        ]
      }
    ],
    anforderungen: [
      "Kommunikationsstärke und Freude am direkten Kontakt",
      "Selbstständige und strukturierte Arbeitsweise",
      "Verlässlichkeit und sicheres Auftreten",
      "Interesse an Bier, regionalen Produkten und Markenaufbau",
      "Führerschein Klasse B",
      "Erfahrung im Vertrieb oder in der Gastronomie ist ein Plus"
    ],
    vorteile: [
      "Abwechslungsreiches Arbeitsumfeld mit Eigenverantwortung",
      "Regional verwurzeltes Unternehmen mit familiärer Kultur",
      "Leistungsorientierte Vergütung",
      "Dienstfahrzeug, Smartphone und Arbeitsmaterialien",
      "Regelmäßige Events, Produktverkostungen und Teamaktivitäten"
    ],
    perspektive:
      "Mit deinem Engagement kannst du Richtung Key Account Management, strategischer Vertrieb oder Teamleitung wachsen.",
    mailSubject: "Bewerbung Vertrieb & Außendienst"
  }
];

export function findeJob(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}

export function jobDetailUrl(id: string): string {
  return `/bewerbung/${encodeURIComponent(id)}`;
}
