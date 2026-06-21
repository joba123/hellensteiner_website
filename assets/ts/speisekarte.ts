export type Kategorie = "bier" | "alkoholfrei" | "speise";

export interface Gericht {
  kat: Kategorie;
  name: string;
  groesse: string;
  preis: number;
  beschreibung: string;
}

export type FilterKategorie = "alle" | Kategorie;

export const KATEGORIE_LABEL: Record<FilterKategorie, string> = {
  alle: "Alle",
  bier: "Biere",
  alkoholfrei: "Alkoholfreies",
  speise: "Speisen"
};

export const KARTE: readonly Gericht[] = [
  // Biere
  { kat: "bier", name: "Helles Original", groesse: "0,5 l", preis: 4.2, beschreibung: "Unser süffiges Aushängeschild – goldgelb, mild gehopft, vollmundig." },
  { kat: "bier", name: "Helles Original – Maß", groesse: "1,0 l", preis: 8.2, beschreibung: "Die echte Biergarten-Maß. Anstoßen und genießen." },
  { kat: "bier", name: "Zwickl Hell (naturtrüb)", groesse: "0,5 l", preis: 4.4, beschreibung: "Ungefiltert, hefetrüb und herrlich frisch vom Lagerkeller." },
  { kat: "bier", name: "Hefeweißbier", groesse: "0,5 l", preis: 4.5, beschreibung: "Klassisch bayerisch mit Banane-und-Nelke-Note, fein moussierend." },
  { kat: "bier", name: "Kristallweizen", groesse: "0,5 l", preis: 4.5, beschreibung: "Filtriertes Weizen – klar, spritzig und elegant." },
  { kat: "bier", name: "Dunkelweizen", groesse: "0,5 l", preis: 4.6, beschreibung: "Malzbetont mit Karamell- und Brotnoten, schön rund." },
  { kat: "bier", name: "Export Hell", groesse: "0,5 l", preis: 4.4, beschreibung: "Etwas kräftiger eingebraut – malzig, vollmundig, traditionell." },
  { kat: "bier", name: "Helles Radler", groesse: "0,5 l", preis: 4.0, beschreibung: "Helles mit klarer Zitronenlimo – der Durstlöscher schlechthin." },
  // Alkoholfreies
  { kat: "alkoholfrei", name: "Helles Alkoholfrei", groesse: "0,5 l", preis: 3.9, beschreibung: "Voller Biergeschmack, 0,0 % – isotonisch und erfrischend." },
  { kat: "alkoholfrei", name: "Weizen Alkoholfrei", groesse: "0,5 l", preis: 4.1, beschreibung: "Fruchtiges Weißbier ganz ohne Alkohol." },
  { kat: "alkoholfrei", name: "Radler Alkoholfrei", groesse: "0,5 l", preis: 3.8, beschreibung: "Alkoholfreies Helles mit Zitronenlimonade." },
  { kat: "alkoholfrei", name: "Malztonic", groesse: "0,33 l", preis: 3.5, beschreibung: "Hauseigenes Malzgetränk – dunkel, malzig-süß, koffeinfrei." },
  { kat: "alkoholfrei", name: "Hellensteiner Tafelwasser", groesse: "0,5 l", preis: 2.9, beschreibung: "Still oder spritzig aus der Region." },
  { kat: "alkoholfrei", name: "Hausgemachte Apfelschorle", groesse: "0,5 l", preis: 3.6, beschreibung: "Naturtrüber Streuobst-Apfelsaft mit Sprudel." },
  { kat: "alkoholfrei", name: "Spezi", groesse: "0,5 l", preis: 3.6, beschreibung: "Cola-Orange-Mischung, eiskalt." },
  // Speisen
  { kat: "speise", name: "Brezn mit Butter", groesse: "1 Stk.", preis: 3.5, beschreibung: "Frisch gebackene Laugenbrezn mit guter Butter." },
  { kat: "speise", name: "Obatzda mit Brezn", groesse: "Portion", preis: 8.9, beschreibung: "Würziger Camembert-Aufstrich mit Zwiebeln, Paprika und Brezn." },
  { kat: "speise", name: "Weißwurst-Paar mit süßem Senf", groesse: "2 Stk.", preis: 7.5, beschreibung: "Münchner Art, dazu eine frische Brezn." },
  { kat: "speise", name: "Schweinshaxe mit Kartoffelknödel", groesse: "Portion", preis: 16.9, beschreibung: "Knusprig gebraten, mit dunkler Biersoße und Krautsalat." },
  { kat: "speise", name: "Leberkäse mit Spiegelei", groesse: "Portion", preis: 9.8, beschreibung: "Hausgemachter Leberkäse, Spiegelei und Bratkartoffeln." },
  { kat: "speise", name: "Käsespätzle", groesse: "Portion", preis: 11.5, beschreibung: "Schwäbische Spätzle mit Bergkäse und Röstzwiebeln." }
];
