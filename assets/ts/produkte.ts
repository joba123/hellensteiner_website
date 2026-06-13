export type ProduktKategorie = | "Weissbiere" | "Hellbiere" | "Alkoholfrei" | "Merchandise";

export interface ProduktBild {
  src: string;
  alt: string;
}

export interface ProduktDetailAbschnitt {
  titel: string;
  text?: string;
  punkte?: readonly string[];
}

export interface ProduktAuswahl {
  label: string;
  optionen: readonly string[];
  vorauswahl?: string;
  preise?: Partial<Record<string, string>>;
}

export interface Produkt {
  id: string;
  kategorie: ProduktKategorie;
  sliderName: string;
  name: string;
  kurzbeschreibung: string;
  preis: string;
  bilder: readonly ProduktBild[];
  highlightBild?: ProduktBild;
  details: {
    titel: string;
    beschreibung: string;
    abschnitte: readonly ProduktDetailAbschnitt[];
    auswahl?: ProduktAuswahl;
    menge: ProduktAuswahl;
  };
}

export const kategorieReihenfolge: readonly ProduktKategorie[] = [
  "Weissbiere",
  "Hellbiere",
  "Alkoholfrei",
  "Merchandise"
];

export const produktKategorieLabels: Record<ProduktKategorie, string> = {
  Weissbiere: "Weißbiere",
  Hellbiere: "Hellbiere",
  Alkoholfrei: "Alkoholfrei",
  Merchandise: "Merchandise"
};

const mengenOptionen = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
const bierGebinde = [
  "0,33 l Dose",
  "10x 0,33 l Dose",
  "0,5 l Flasche",
  "20x 0,5 l Flasche",
  "5,0 l Partyfass"
] as const;
const kleidungGroessen = ["XS", "S", "M", "L", "XL"] as const;

const standardMenge: ProduktAuswahl = {
  label: "Menge wählen:",
  optionen: mengenOptionen,
  vorauswahl: "1"
};

function bierAuswahl(preise: Partial<Record<(typeof bierGebinde)[number], string>>): ProduktAuswahl {
  return {
    label: "Größe wählen:",
    optionen: bierGebinde,
    vorauswahl: "20x 0,5 l Flasche",
    preise
  };
}

const bierPreise159 = {
  "0,33 l Dose": "1,59 €",
  "10x 0,33 l Dose": "14,90 €",
  "0,5 l Flasche": "1,89 €",
  "20x 0,5 l Flasche": "34,90 €",
  "5,0 l Partyfass": "18,90 €"
};

const bierPreise169 = {
  "0,33 l Dose": "1,69 €",
  "10x 0,33 l Dose": "15,90 €",
  "0,5 l Flasche": "1,99 €",
  "20x 0,5 l Flasche": "36,90 €",
  "5,0 l Partyfass": "19,90 €"
};

const bierPreise179 = {
  "0,33 l Dose": "1,79 €",
  "10x 0,33 l Dose": "16,90 €",
  "0,5 l Flasche": "2,09 €",
  "20x 0,5 l Flasche": "37,90 €",
  "5,0 l Partyfass": "20,90 €"
};

const bierPreise189 = {
  "0,33 l Dose": "1,89 €",
  "10x 0,33 l Dose": "17,90 €",
  "0,5 l Flasche": "2,19 €",
  "20x 0,5 l Flasche": "39,90 €",
  "5,0 l Partyfass": "21,90 €"
};

const bierPreise199 = {
  "0,33 l Dose": "1,99 €",
  "10x 0,33 l Dose": "18,90 €",
  "0,5 l Flasche": "2,29 €",
  "20x 0,5 l Flasche": "41,90 €",
  "5,0 l Partyfass": "22,90 €"
};

const bierPreise209 = {
  "0,33 l Dose": "2,09 €",
  "10x 0,33 l Dose": "19,90 €",
  "0,5 l Flasche": "2,39 €",
  "20x 0,5 l Flasche": "43,90 €",
  "5,0 l Partyfass": "23,90 €"
};

const standardKleidungAuswahl: ProduktAuswahl = {
  label: "Größe wählen:",
  optionen: kleidungGroessen,
  vorauswahl: "M"
};

const lagerung: ProduktDetailAbschnitt = {
  titel: "Lagerung",
  text: "Kühl und dunkel lagern. Ideal bei 6-8 °C genießen."
};

export const produkte: readonly Produkt[] = [
  {
    id: "hefeweiss",
    kategorie: "Weissbiere",
    sliderName: "hefe",
    name: "Hefeweiß",
    kurzbeschreibung: "Frisch, mild und süffig - unser Klassiker (5,3%)",
    preis: "Ab 1,89 €",
    bilder: [
      { src: "../assets/images/hefeweiss.png", alt: "Hefeweiß Flasche" },
      { src: "../assets/images/hefeweiss_dose.png", alt: "Hefeweiß Dose" },
      { src: "../assets/images/hefeweiss_partyfass.png", alt: "Hefeweiß Partyfass" }
    ],
    details: {
      titel: "Hefeweiß - 5,3 %",
      beschreibung:
        "Unser klassisches Hefeweiß begeistert mit seiner naturtrüben, goldgelben Farbe und einem fruchtigen Aroma mit feiner Bananennote. Gebraut nach dem bayerischen Reinheitsgebot vereint es Tradition, Frische und handwerkliche Perfektion - ein echtes Stück süddeutsche Braukunst.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 190 kJ / 45 kcal",
            "Kohlenhydrate: 3,2 g - davon Zucker: 0,2 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,5 g",
            "Salz: 0 g"
          ]
        },
        { titel: "Zutaten", text: "Wasser, Weizenmalz, Gerstenmalz, Hopfen, Hefe" },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise189),
      menge: standardMenge
    }
  },
  {
    id: "kristallweiss",
    kategorie: "Weissbiere",
    sliderName: "kristall",
    name: "Kristallweiß",
    kurzbeschreibung: "Klar, feinperlig und erfrischend (5,0 %)",
    preis: "Ab 1,99 €",
    bilder: [
      { src: "../assets/images/kristallweiss.png", alt: "Kristallweiß Flasche" },
      { src: "../assets/images/kristallweiss_dose.png", alt: "Kristallweiß Dose" },
      { src: "../assets/images/kristallweiss_partyfass.png", alt: "Kristallweiß Partyfass" }
    ],
    details: {
      titel: "Kristallweiß - 5,0 %",
      beschreibung:
        "Unser erfrischendes Kristallweiß besticht durch seine brillante, klare Farbe und den feinperligen Auftritt. Leicht, prickelnd und elegant zeigt es dezente fruchtige Aromen, die an Zitrus und reife Banane erinnern - ein besonders schlanker Weißbiergenuss. Gebraut nach dem bayerischen Reinheitsgebot verbindet es Tradition mit einer angenehm spritzigen Frische.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 185 kJ / 44 kcal",
            "Kohlenhydrate: 3,1 g - davon Zucker: 0,2 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,5 g",
            "Salz: 0 g"
          ]
        },
        { titel: "Zutaten", text: "Wasser, Weizenmalz, Gerstenmalz, Hopfen, Hefe" },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise199),
      menge: standardMenge
    }
  },
  {
    id: "dunkelweiss",
    kategorie: "Weissbiere",
    sliderName: "dunkel",
    name: "Dunkelweiß",
    kurzbeschreibung: "Malzig, karamellig und rund im Geschmack (5,4 %)",
    preis: "Ab 2,09 €",
    bilder: [
      { src: "../assets/images/dunkelweiss.png", alt: "Dunkelweiß Flasche" },
      { src: "../assets/images/dunkelweiss_dose.png", alt: "Dunkelweiß Dose" },
      { src: "../assets/images/dunkelweiss_partyfass.png", alt: "Dunkelweiß Partyfass" }
    ],
    details: {
      titel: "Dunkelweiß - 5,4 %",
      beschreibung:
        "Unser aromatisches Dunkelweiß überzeugt mit seiner tief bernsteinfarbenen bis kastanienbraunen Naturtrübung und einem vollmundigen Geschmack. Malzige Noten, die an Karamell und Brotkruste erinnern, treffen auf eine feine Frucht mit dezenter Bananennuance. Ein intensives Weißbier, das Tiefe, Tradition und Handwerkskunst vereint.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 200 kJ / 48 kcal",
            "Kohlenhydrate: 3,5 g - davon Zucker: 0,2 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,6 g",
            "Salz: 0 g"
          ]
        },
        { titel: "Zutaten", text: "Wasser, Weizenmalz, Gerstenmalz, Hopfen, Hefe" },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise209),
      menge: standardMenge
    }
  },
  {
    id: "weiss-radler",
    kategorie: "Weissbiere",
    sliderName: "weiss-radler",
    name: "Weiß-Radler",
    kurzbeschreibung: "Spritzig mit Zitronennote, perfekt für den Sommer (2,5 %)",
    preis: "Ab 1,79 €",
    bilder: [
      { src: "../assets/images/weiss_radler.png", alt: "Weiß-Radler Flasche" },
      { src: "../assets/images/weiss_radler_dose.png", alt: "Weiß-Radler Dose" },
      { src: "../assets/images/weiss_radler_partyfass.png", alt: "Weiß-Radler Partyfass" }
    ],
    details: {
      titel: "Weiß-Radler - 2,5 %",
      beschreibung:
        "Unser Weiß-Radler verbindet spritziges Weißbier mit einer erfrischenden Zitronenlimonade. Naturtrüb, leicht und fruchtig bietet es ein harmonisches Zusammenspiel aus feiner Weißbiernote und sommerlicher Zitrusfrische - der perfekte Durstlöscher für warme Tage.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 155 kJ / 37 kcal",
            "Kohlenhydrate: 4,2 g - davon Zucker: 2,8 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,3 g",
            "Salz: 0 g"
          ]
        },
        {
          titel: "Zutaten",
          text: "Weißbier (Wasser, Weizenmalz, Gerstenmalz, Hopfen, Hefe), Zitronenlimonade"
        },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise179),
      menge: standardMenge
    }
  },
  {
    id: "helles-original",
    kategorie: "Hellbiere",
    sliderName: "helles",
    name: "Helles Original",
    kurzbeschreibung: "Mild, ausgewogen, typisch süddeutsch (5,0 %)",
    preis: "Ab 1,79 €",
    bilder: [
      { src: "../assets/images/helles_original.png", alt: "Helles Original Flasche" },
      { src: "../assets/images/helles_original_dose.png", alt: "Helles Original Dose" },
      { src: "../assets/images/helles_original_partyfass.png", alt: "Helles Original Partyfass" }
    ],
    details: {
      titel: "Helles Original - 5,0 %",
      beschreibung:
        "Unser klassisches Helles Original präsentiert sich goldfarben, mild und ausgewogen. Mit feiner Malzsüße und weicher Hopfennote bietet es einen angenehm süffigen Charakter - ein traditionelles Helles, das für bayerische Braukultur und höchste Trinkfreude steht.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 185 kJ / 44 kcal",
            "Kohlenhydrate: 3,0 g - davon Zucker: 0 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,4 g",
            "Salz: 0 g"
          ]
        },
        { titel: "Zutaten", text: "Wasser, Gerstenmalz, Hopfen" },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise179),
      menge: standardMenge
    }
  },
  {
    id: "zwickl-hell",
    kategorie: "Hellbiere",
    sliderName: "zwickl",
    name: "Zwickl Hell",
    kurzbeschreibung: "Unfiltriert, leicht hefetrüb mit frischem Charakter (5,1 %)",
    preis: "Ab 1,99 €",
    bilder: [
      { src: "../assets/images/zwickl_hell.png", alt: "Zwickl Hell Flasche" },
      { src: "../assets/images/zwickl_hell_dose.png", alt: "Zwickl Hell Dose" },
      { src: "../assets/images/zwickl_hell_partyfass.png", alt: "Zwickl Hell Partyfass" }
    ],
    details: {
      titel: "Zwickl Hell - 5,1 %",
      beschreibung:
        "Unser naturbelassenes Zwickl Hell begeistert mit zarter Trübung, weichem Mundgefühl und frischer Malznote. Unfiltriert und ursprünglich zeigt es eine feine Hopfenwürze und die lebendige Charakteristik eines jungen Bieres - ein ehrliches Stück bayerischer Brautradition.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 190 kJ / 45 kcal",
            "Kohlenhydrate: 3,2 g - davon Zucker: 0 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,5 g",
            "Salz: 0 g"
          ]
        },
        { titel: "Zutaten", text: "Wasser, Gerstenmalz, Hopfen, Hefe" },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise199),
      menge: standardMenge
    }
  },
  {
    id: "export-hell",
    kategorie: "Hellbiere",
    sliderName: "export",
    name: "Export Hell",
    kurzbeschreibung: "Kräftiger im Körper, angenehm würzig (5,4 %)",
    preis: "Ab 2,09 €",
    bilder: [
      { src: "../assets/images/export_hell.png", alt: "Export Hell Flasche" },
      { src: "../assets/images/export_hell_dose.png", alt: "Export Hell Dose" },
      { src: "../assets/images/export_hell_partyfass.png", alt: "Export Hell Partyfass" }
    ],
    details: {
      titel: "Export Hell - 5,4 %",
      beschreibung:
        "Unser kräftigeres Export Hell vereint eine harmonische Malzigkeit mit einer etwas ausgeprägteren Hopfennote. Voller und würziger im Geschmack, dennoch angenehm rund - ein Bier, das Stärke, Tradition und Süffigkeit elegant miteinander verbindet.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 2000 kJ / 48 kcal",
            "Kohlenhydrate: 3,4 g - davon Zucker: 0 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,5 g",
            "Salz: 0 g"
          ]
        },
        { titel: "Zutaten", text: "Wasser, Gerstenmalz, Hopfen" },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise209),
      menge: standardMenge
    }
  },
  {
    id: "helles-radler",
    kategorie: "Hellbiere",
    sliderName: "helles-radler",
    name: "Helles Radler",
    kurzbeschreibung: "Goldgelb, erfrischend, leicht süßlich (2,4 %)",
    preis: "Ab 1,79 €",
    bilder: [
      { src: "../assets/images/helles_radler.png", alt: "Helles Radler Flasche" },
      { src: "../assets/images/helles_radler_dose.png", alt: "Helles Radler Dose" },
      { src: "../assets/images/helles_radler_partyfass.png", alt: "Helles Radler Partyfass" }
    ],
    details: {
      titel: "Helles Radler - 2,4 %",
      beschreibung:
        "Unser Helles Radler kombiniert ein mildes Helles mit erfrischender Zitronenlimonade. Leicht, spritzig und belebend überzeugt es mit harmonischer Süße und feinherbem Biergeschmack - ideal für Genussmomente mit wenig Alkohol.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 150 kJ / 36 kcal",
            "Kohlenhydrate: 4,1 g - davon Zucker: 2,7 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,3 g",
            "Salz: 0 g"
          ]
        },
        {
          titel: "Zutaten",
          text: "Helles Bier (Wasser, Gerstenmalz, Hopfen), Zitronenlimonade"
        },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise179),
      menge: standardMenge
    }
  },
  {
    id: "malztonic",
    kategorie: "Alkoholfrei",
    sliderName: "malztonic",
    name: "Malztonic",
    kurzbeschreibung: "Malz trifft Energie - gesund genießen",
    preis: "Ab 2,29 €",
    highlightBild: { src: "../assets/images/malztonic_head1.png", alt: "Malztonic" },
    bilder: [
      { src: "../assets/images/malztonic_shop.png", alt: "Malztonic" },
      { src: "../assets/images/malztonic_green.png", alt: "Malztonic grün" },
      { src: "../assets/images/malztonic_rot.png", alt: "Malztonic rot" },
      { src: "../assets/images/malztonic_yellow.png", alt: "Malztonic gelb" },
      { src: "../assets/images/malztonic_orange.png", alt: "Malztonic orange" }
    ],
    details: {
      titel: "Malztonic - 0,0 %",
      beschreibung:
        "Unser natürliches Malztonic ist ein alkoholfreier Energiespender auf Malzbasis und überzeugt mit seinem vollmundigen Geschmack und der angenehmen Süße des Gerstenmalzes. Durch seine isotonischen Eigenschaften liefert es schnelle Erfrischung und neue Kraft - ideal für Sport, Arbeit oder den bewussten Genuss zwischendurch. Erhältlich in vier Sorten verbindet Malztonic natürliche Malzkraft mit fruchtiger Vielfalt: Orange, Apfel, Kirsch und Zitrone.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 85 kJ / 20 kcal",
            "Kohlenhydrate: 4,2 g - davon Zucker: 1,2 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,2 g",
            "Salz: 0 g"
          ]
        },
        {
          titel: "Zutaten",
          text:
            "Wasser, Gerstenmalz, Kohlensäure, Süßungsmittel (Steviolglycoside, Sucralose), Hopfen, natürliche Fruchtaromen (je nach Sorte Orange, Apfel, Kirsch oder Zitrone)"
        },
        lagerung
      ],
      auswahl: {
        label: "Größe wählen:",
        optionen: ["0,33 l Dose", "0,5 l Dose"],
        vorauswahl: "0,33 l Dose",
        preise: {
          "0,33 l Dose": "2,29 €",
          "0,5 l Dose": "2,79 €"
        }
      },
      menge: standardMenge
    }
  },
  {
    id: "helles-alkoholfrei",
    kategorie: "Alkoholfrei",
    sliderName: "helles-alkoholfrei",
    name: "Helles Alkoholfrei",
    kurzbeschreibung: "Vollmundig trotz 0,0 %",
    preis: "Ab 1,59 €",
    bilder: [
      { src: "../assets/images/helles_alkoholfrei.png", alt: "Helles Alkoholfrei Flasche" },
      { src: "../assets/images/helles_alkoholfrei_dose.png", alt: "Helles Alkoholfrei Dose" },
      { src: "../assets/images/helles_alkoholfrei_partyfass.png", alt: "Helles Alkoholfrei Partyfass" }
    ],
    details: {
      titel: "Helles Alkoholfrei - 0,0 %",
      beschreibung:
        "Unser Helles Alkoholfei bietet vollen Biergeschmack ganz ohne Alkohol. Mild, hellgolden und erfrischend überzeugt es mit feiner Malznote und angenehmer Leichtigkeit - der ideale Begleiter für aktive oder bewusste Genussmomente.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 105 kJ / 25 kcal",
            "Kohlenhydrate: 5,2 g - davon Zucker: 2,8 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,2 g",
            "Salz: 0 g"
          ]
        },
        { titel: "Zutaten", text: "Wasser, Gerstenmalz, Hopfen" },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise159),
      menge: standardMenge
    }
  },
  {
    id: "weizen-alkoholfrei",
    kategorie: "Alkoholfrei",
    sliderName: "weizen-alkoholfrei",
    name: "Weizen Alkoholfrei",
    kurzbeschreibung: "Isotonisch & fruchtig (0,0%)",
    preis: "Ab 1,79 €",
    bilder: [
      { src: "../assets/images/weizen_alkoholfrei.png", alt: "Weizen Alkoholfrei Flasche" },
      { src: "../assets/images/weizen_alkoholfrei_dose.png", alt: "Weizen Alkoholfrei Dose" },
      { src: "../assets/images/weizen_alkoholfrei_partyfass.png", alt: "Weizen Alkoholfrei Partyfass" }
    ],
    details: {
      titel: "Weizen Alkoholfrei - 0,0 %",
      beschreibung:
        "Unser Weizen Alkoholfrei verführt mit seiner naturtrüben Optik und fruchtigen Frische. Mit leichten Aromen von Banane und Getreide bietet es den typischen Weißbiergeschmack - nur ohne Alkohol. Isotonisch und belebend, perfekt nach Sport oder einfach als leichte Erfrischung.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 120 kJ / 28 kcal",
            "Kohlenhydrate: 5,5 g - davon Zucker: 2,9 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,3 g",
            "Salz: 0 g"
          ]
        },
        { titel: "Zutaten", text: "Wasser, Weizenmalz, Gerstenmalz, Hopfen, Hefe" },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise179),
      menge: standardMenge
    }
  },
  {
    id: "helles-radler-alkoholfrei",
    kategorie: "Alkoholfrei",
    sliderName: "helles-radler-alkoholfrei",
    name: "Helles Radler Alkoholfrei",
    kurzbeschreibung: "Spritzig & durstlöschend (0,0%)",
    preis: "Ab 1,69 €",
    bilder: [
      { src: "../assets/images/helles_radler_alkoholfrei.png", alt: "Helles Radler Alkoholfrei Flasche" },
      { src: "../assets/images/helles_radler_alkoholfrei_dose.png", alt: "Helles Radler Alkoholfrei Dose" },
      { src: "../assets/images/helles_radler_alkoholfrei_partyfass.png", alt: "Helles Radler Alkoholfrei Partyfass" }
    ],
    details: {
      titel: "Helles Radler Alkoholfrei - 0,0 %",
      beschreibung:
        "Unser Helles Radler Alkoholfrei kombiniert ein alkoholfreies Helles mit spritziger Zitronenlimonade. Fruchtig-frisch, leicht und besonders belebend - perfekt für alle, die Erfrischung ohne Alkohol suchen.",
      abschnitte: [
        {
          titel: "Nährwerte (pro 100 ml)",
          punkte: [
            "Energie: 105 kJ / 25 kcal",
            "Kohlenhydrate: 5,5 g - davon Zucker: 3,1 g",
            "Fett: 0 g - davon gesättigte Fettsäuren: 0 g",
            "Eiweiß: 0,1 g",
            "Salz: 0 g"
          ]
        },
        {
          titel: "Zutaten",
          text: "Alkoholfreies Helles (Wasser, Gerstenmalz, Hopfen), Zitronenlimonade"
        },
        lagerung
      ],
      auswahl: bierAuswahl(bierPreise169),
      menge: standardMenge
    }
  },
  {
    id: "masskrug",
    kategorie: "Merchandise",
    sliderName: "masskrug",
    name: "Hellensteiner Maßkrug 1,0 Liter",
    kurzbeschreibung: "Robust. Kultig. Dein Bier schmeckt hier am besten",
    preis: "19,90 €",
    bilder: [
      { src: "../assets/images/hellensteiner_masskrug.png", alt: "Masskrug Bild 1" },
      { src: "../assets/images/hellensteiner_masskrug2.png", alt: "Masskrug Bild 2" }
    ],
    details: {
      titel: "Hellensteiner Maßkrug - 1,0 Liter",
      beschreibung:
        "Unser traditioneller Hellensteiner Maßkrug verbindet echte bayerische Braukultur mit hochwertiger Handwerkskunst. Robust, authentisch und perfekt ausbalanciert liegt er angenehm in der Hand und sorgt für echten Festzeltgenuss.",
      abschnitte: [
        {
          titel: "Eigenschaften & Vorteile",
          punkte: [
            "Fassungsvermögen: 1,0 Liter",
            "Besonders dickwandiges, stabiles Glas",
            "Klassische bayerische Maßkrugform",
            "Hoher Tragekomfort durch massiven Griff",
            "Spülmaschinengeeignet"
          ]
        },
        {
          titel: "Material",
          text:
            "Der Hellensteiner Maßkrug wird aus besonders widerstandsfähigem Glas gefertigt und überzeugt durch seine stabile Wandstärke."
        }
      ],
      menge: standardMenge
    }
  },
  {
    id: "flaschenoeffner",
    kategorie: "Merchandise",
    sliderName: "flaschenoeffner",
    name: "Flaschenöffner mit Gravur",
    kurzbeschreibung: "Öffne dein Bier - stilecht mit Brauereikraft",
    preis: "9,90 €",
    bilder: [
      { src: "../assets/images/flaschenoeffner_gravur.png", alt: "Flaschenöffner Bild 1" },
      { src: "../assets/images/flaschenoeffner_gravur1.png", alt: "Flaschenöffner Bild 2" }
    ],
    details: {
      titel: "Flaschenöffner mit Gravur",
      beschreibung:
        "Unser gravierter Flaschenöffner verbindet robuste Verarbeitung mit persönlicher Note. Ideal für den täglichen Einsatz, als Geschenk oder als stilvolles Accessoire rund um die Braukultur.",
      abschnitte: [
        {
          titel: "Eigenschaften & Vorteile",
          punkte: [
            "Praktischer, handlicher Flaschenöffner",
            "Gravur mit unserem Logo",
            "Langlebig und robust",
            "Ideal als Geschenk oder Souvenir"
          ]
        },
        {
          titel: "Material",
          text: "Der Flaschenöffner besteht aus hochwertigem Edelstahl und ist optional mit einem eleganten Holzgriff ausgestattet."
        }
      ],
      menge: standardMenge
    }
  },
  {
    id: "biergarten-brett",
    kategorie: "Merchandise",
    sliderName: "biergarten_brett",
    name: "Biergarten-Brett/ Brotzeitbrett",
    kurzbeschreibung: "Brotzeit? Nur mit deiner Lieblingsbrauerei",
    preis: "18,90 €",
    bilder: [
      { src: "../assets/images/biergarten_brett.png", alt: "Biergarten-Brett Bild 1" },
      { src: "../assets/images/biergarten_brett1.png", alt: "Biergarten-Brett Bild 2" }
    ],
    details: {
      titel: "Biergarten-Brett",
      beschreibung:
        "Unser traditionelles Biergarten-Brett bringt bayerisches Biergartenfeeling direkt nach Hause. Aus hochwertigem Holz gefertigt, bietet es eine robuste, geschmacksneutrale Oberfläche und eignet sich ideal für Brotzeit, Käseplatten oder rustikale Serviermomente.",
      abschnitte: [
        {
          titel: "Eigenschaften & Vorteile",
          punkte: [
            "Großzügige Fläche für Snacks oder Käseplatten",
            "Leicht zu reinigen und pflegeleicht",
            "Rustikales Design für authentische Brotzeiten"
          ]
        },
        {
          titel: "Material",
          text:
            "Das Brett wird aus massivem Holz, wie Buche oder Eiche, gefertigt und besitzt eine naturbelassene, langlebige Oberfläche."
        }
      ],
      menge: standardMenge
    }
  },
  {
    id: "holz-bierdeckelset",
    kategorie: "Merchandise",
    sliderName: "holz_bierdeckelset",
    name: "Holz-Bierdeckel-Set (4 Stück)",
    kurzbeschreibung: "Tradition zum Abstellen - handgemacht und edel",
    preis: "12,90 €",
    bilder: [
      { src: "../assets/images/holz_bierdeckelset.png", alt: "Holz Bierdeckelset Bild 1" },
      { src: "../assets/images/holz_bierdeckelset1.png", alt: "Holz Bierdeckelset Bild 2" }
    ],
    details: {
      titel: "Holz-Bierdeckel-Set (4 Stück)",
      beschreibung:
        "Unser Holz-Bierdeckel-Set besteht aus vier rustikalen Untersetzern mit feiner Gravur. Die robusten Naturholz-Oberflächen schützen Tisch und Bar vor Feuchtigkeit und Glasringen.",
      abschnitte: [
        {
          titel: "Eigenschaften & Vorteile",
          punkte: [
            "Schützt Tische vor Feuchtigkeit",
            "Set mit 4 wiederverwendbaren Bierdeckeln",
            "Langlebig und robust"
          ]
        },
        {
          titel: "Material",
          text: "Die Bierdeckel bestehen aus hochwertigem Holz, das geölt und lackiert ist."
        }
      ],
      menge: standardMenge
    }
  },
  {
    id: "hoodie",
    kategorie: "Merchandise",
    sliderName: "hoodie",
    name: "Hoodie mit Retro-Brauerei-Schriftzug",
    kurzbeschreibung: "Gemütlich. Stylisch. 100 % Brauereigefühl",
    preis: "39,90 €",
    bilder: [
      { src: "../assets/images/hoodie.png", alt: "Hoodie Bild 1" },
      { src: "../assets/images/hoodie1.png", alt: "Hoodie Bild 2" }
    ],
    details: {
      titel: "Hoodie mit Retro-Brauerei-Schriftzug",
      beschreibung:
        "Unser komfortabler Brauerei-Hoodie vereint modernen Schnitt mit klassischem Retro-Schriftzug. Der weiche Stoff bietet hohen Tragekomfort, während Kapuze und Kängurutasche für Funktionalität sorgen.",
      abschnitte: [
        {
          titel: "Eigenschaften & Vorteile",
          punkte: [
            "Angenehm weiches Tragegefühl",
            "Warm und kuschelig",
            "Retro-Schriftzug für authentisches Flair",
            "100% Baumwolle"
          ]
        },
        {
          titel: "Material",
          text: "Der Hoodie besteht aus hochwertiger Baumwolle, die weich, strapazierfähig und pflegeleicht ist."
        }
      ],
      auswahl: standardKleidungAuswahl,
      menge: standardMenge
    }
  },
  {
    id: "poloshirt",
    kategorie: "Merchandise",
    sliderName: "poloshirt",
    name: "Baumwoll-Poloshirt mit Brauerei-Design",
    kurzbeschreibung: "Trag den Geschmack deiner Lieblingsbrauerei - mit Stil",
    preis: "24,90 €",
    bilder: [
      { src: "../assets/images/poloshirt.png", alt: "Poloshirt Bild 1" },
      { src: "../assets/images/poloshirt1.png", alt: "Poloshirt Bild 2" }
    ],
    details: {
      titel: "Baumwoll-Poloshirt mit Brauerei-Design",
      beschreibung:
        "Unser elegantes Poloshirt mit Brauerei-Design kombiniert klassischen Look mit dezentem Logo. Das atmungsaktive Baumwollgewebe sorgt für angenehmen Tragekomfort.",
      abschnitte: [
        {
          titel: "Eigenschaften & Vorteile",
          punkte: [
            "Bequemer Schnitt für Alltag und Freizeit",
            "Luftige, atmungsaktive Baumwolle",
            "Stylisches Brauerei-Motiv",
            "100% Baumwolle"
          ]
        },
        {
          titel: "Material",
          text: "Das Poloshirt besteht aus 100 % hochwertiger Baumwolle, die weich, strapazierfähig und angenehm zu tragen ist."
        }
      ],
      auswahl: standardKleidungAuswahl,
      menge: standardMenge
    }
  },
  {
    id: "strickjacke",
    kategorie: "Merchandise",
    sliderName: "strickjacke",
    name: "Rustikale Strickjacke mit Brauerei-Stickerei",
    kurzbeschreibung: "Warm. Echt. Und mit Stolz getragen",
    preis: "59,90 €",
    bilder: [
      { src: "../assets/images/strickjacke.png", alt: "Rustikale Strickjacke mit Brauerei-Stickerei Bild 1" },
      { src: "../assets/images/strickjacke1.png", alt: "Rustikale Strickjacke mit Brauerei-Stickerei Bild 2" }
    ],
    details: {
      titel: "Rustikale Strickjacke mit Brauerei-Stickerei",
      beschreibung:
        "Unsere rustikale Strickjacke vereint traditionelle Optik mit liebevoller Stickerei im Brauerei-Stil. Der weiche Strickstoff hält angenehm warm und ergänzt perfekt jedes bayerische Outfit.",
      abschnitte: [
        {
          titel: "Eigenschaften & Vorteile",
          punkte: [
            "Wärmend für kühle Abende",
            "Rustikaler, traditioneller Look",
            "Hochwertige Stickerei",
            "100% Baumwolle"
          ]
        },
        {
          titel: "Material",
          text: "Die Strickjacke wird aus hochwertiger Baumwolle gefertigt, die langlebig, pflegeleicht und angenehm zu tragen ist."
        }
      ],
      auswahl: standardKleidungAuswahl,
      menge: standardMenge
    }
  },
  {
    id: "kappe",
    kategorie: "Merchandise",
    sliderName: "kappe",
    name: "Brauerei-Kappe aus Canvas",
    kurzbeschreibung: "Tradition auf dem Kopf - schlicht & echt",
    preis: "19,90 €",
    bilder: [
      { src: "../assets/images/kappe.png", alt: "Brauerei-Kappe aus Canvas Bild 1" },
      { src: "../assets/images/kappe1.png", alt: "Brauerei-Kappe aus Canvas Bild 2" }
    ],
    details: {
      titel: "Brauerei-Kappe aus Canvas",
      beschreibung:
        "Unsere robuste Canvas-Kappe bietet angenehmen Tragekomfort und schützt zuverlässig vor Sonne und Wetter. Mit dem hochwertigen Brauerei-Logo und der stabilen Canvas-Struktur ist sie ideal für Freizeit, Biergarten oder als Geschenk.",
      abschnitte: [
        {
          titel: "Eigenschaften & Vorteile",
          punkte: [
            "Verstellbare Passform",
            "Schutz vor Sonne und leichtem Regen",
            "Robust und langlebig",
            "50% Baumwolle"
          ]
        },
        {
          titel: "Material",
          text: "Die Kappe besteht aus robustem Canvas, einer strapazierfähigen Baumwolle, und ist mit hochwertiger Stickerei versehen."
        }
      ],
      menge: standardMenge
    }
  }
];

export function findeProdukt(id: string): Produkt | undefined {
  return produkte.find((produkt) => produkt.id === id);
}

export function produktDetailUrl(id: string): string {
  return `produkt.html?id=${encodeURIComponent(id)}`;
}

export function getAuswahlPreisLabel(produkt: Produkt, auswahlWert?: string): string {
  if (!auswahlWert) {
    return produkt.preis;
  }

  return produkt.details.auswahl?.preise?.[auswahlWert] ?? produkt.preis;
}
