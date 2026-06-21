# Komponenten-Katalog und Component Tree

## 1. Komponenten-Katalog

### Anwendung und Seiten

| Komponente | Kurzbeschreibung |
| `App` | Enthält Router und alle Routen. |
| `Hochscrollen` | Setzt die Scrollposition bei einem Seitenwechsel zurück. |
| `NichtGefunden` | Zeigt die Fehlerseite für unbekannte URLs. |
| `LandingPage` | Startseite der Anwendung. |
| `Altersabfrage` | Prüft Alter und Herkunftsland. |
| `Shop` | Zeigt Suche, Kategorien und Produkte. |
| `ProduktDetailSeite` | Zeigt Details, Auswahl, Warenkorb und Bewertungen. |
| `HistorieApp` | Zeigt Geschichte, Fakten, Slideshow und Zeitreise. |
| `BiergartenApp` | Zeigt Biergarten, Speisekarte und Reservierung. |
| `FreundeClub` | Zeigt Clubvorteile und das Anmeldeformular. |
| `CareerApp` | Zeigt alle Stellenangebote. |
| `JobDetailApp` | Zeigt die Details einer Stelle. |
| `BewerbungApp` | Enthält den Bewerbungsprozess. |
| `CheckoutApp` | Zeigt Bestellübersicht und Demo-Checkout. |
| `TrikotBestellung` | Steuert Anmeldung und Trikotbestellung. |
| `Kontakt` | Zeigt die Kontaktinformationen. |
| `DatenschutzPage` | Zeigt die Datenschutzerklärung. |
| `AgbPage` | Zeigt die AGB. |
| `ImpressumPage` | Zeigt das Impressum. |
| `LegalPage` | Gemeinsame interne Vorlage der rechtlichen Seiten. |

### Layout und allgemeine UI

| Komponente | Kurzbeschreibung |
| `SiteLayout` | Gemeinsamer Rahmen aller Seiten. |
| `AchtungBanner` | Zeigt den Hinweis zum Studienprojekt. |
| `Header` | Enthält Logo, Navigation, Konto und Warenkorb. |
| `Footer` | Enthält Karte, Links und Social Media. |
| `Button` | Einheitlicher Button oder interner Link. |
| `Input` | Einheitliches beschriftetes Eingabefeld. |
| `ErrorMessage` | Zeigt eine Fehlermeldung an. |
| `Datum` | Eingabefeld für einen Teil des Geburtsdatums. |
| `Länderwahl` | Auswahlfeld für ein Land. |

### Darstellung und Animation

| Komponente | Kurzbeschreibung |
| `Reveal` | Blendet Inhalte beim Scrollen ein. |
| `FlipCard` | Karte mit Vorder- und Rückseite. |
| `CountUpNumber` | Zählt eine Zahl animiert hoch. |
| `Hero` | Hero-Bereich mit wechselnden Sprüchen. |
| `BeerQuote` | Zeigt ein stündlich wechselndes Bier-Zitat. |
| `FClubCard` | Zeigt einen Vorteil des Freundeclubs. |
| `Slideshow` | Zeigt historische Bilder als Slideshow. |
| `Zeitreise` | Zeigt eine historische Timeline. |
| `TimelineEintrag` | Interner Eintrag der Zeitreise. |
| `TrikotFloatingCard` | Schwebender Hinweis auf die Trikotaktion. |

### Shop und Warenkorb

| Komponente | Kurzbeschreibung |
| `ShopCard` | Produktkarte mit Bildwechsel. |
| `LazyProductImage` | Lädt ein Produktbild verzögert. |
| `Card` | Warenkorb-Schaltfläche und Seitenleiste. |
| `AuswahlFeld` | Internes Auswahlfeld für Produktoptionen. |

### Karriere und Bewerbung

| Komponente | Kurzbeschreibung |
| `CareerSection` | Gruppiert Stellen nach Kategorie. |
| `JobCard` | Zeigt ein Stellenangebot kompakt an. |
| `Bewerbungsformular` | Formular für eine Bewerbung. |

### Nutzersystem

| Komponente | Kurzbeschreibung |
| `UserWidget` | Konto-Schaltfläche und Anmeldeseitenleiste. |
| `UserAvatar` | Zeigt die Initialen eines Nutzers. |
| `AccountLogin` | Zeigt Kontodaten und Logout. |
| `LoginForm` | Formular für die Anmeldung. |
| `RegisterForm` | Formular für die Registrierung. |

### Bewertungen

| Komponente | Kurzbeschreibung |
| `ReviewsSection` | Koordiniert Bewertungsübersicht, Liste und Formular. |
| `ReviewList` | Zeigt mehrere Bewertungen. |
| `ReviewItem` | Zeigt eine einzelne Bewertung. |
| `ReviewForm` | Erstellt oder bearbeitet eine Bewertung. |
| `StarRating` | Zeigt eine Sternebewertung an. |
| `StarRatingInput` | Erlaubt die Eingabe einer Sternebewertung. |

### Biergarten

| Komponente | Kurzbeschreibung |
| `Speisekarte` | Durchsuchbare und filterbare Speisekarte. |
| `Reservierung` | Kalender und Formular für Tischreservierungen. |
| `OeffnungsStatus` | Interne Anzeige des aktuellen Öffnungsstatus. |

## 2. Component Tree
main.tsx
├─ #app-root
│  └─ StrictMode
│     └─ App
│        └─ BrowserRouter
│           ├─ Hochscrollen
│           └─ Routes
│              ├─ Route "/"
│              │  └─ SiteLayout
│              │     └─ LandingPage
│              │        ├─ Altersabfrage
│              │        │  ├─ Länderwahl
│              │        │  ├─ Datum × 3
│              │        │  └─ ErrorMessage                 [bedingt]
│              │        ├─ LandingHero
│              │        ├─ LandingStats
│              │        │  └─ Reveal
│              │        │     └─ StatCard                  [Liste]
│              │        │        └─ CountUpNumber
│              │        ├─ ValuesStory
│              │        │  └─ Reveal
│              │        │     └─ FlipCard                  [Liste]
│              │        ├─ LandingClassics
│              │        │  └─ Reveal
│              │        ├─ LandingFinalCta
│              │        │  └─ Reveal
│              │        │     ├─ BeerQuote
│              │        │     └─ Button
│              │        └─ TrikotFloatingCard
│              │
│              ├─ Route "/shop"
│              │  └─ SiteLayout
│              │     └─ Shop
│              │        ├─ Reveal                          [Suchbereich]
│              │        ├─ Reveal                          [Liste]
│              │        │  └─ ShopCard                     [Liste]
│              │        │     ├─ LazyProductImage          [Liste]
│              │        │     └─ Button                    [Slider-Punkte]
│              │        └─ Button                          [keine Treffer]
│              │
│              ├─ Route "/produkt/:id"
│              │  └─ SiteLayout
│              │     └─ ProduktDetailSeite
│              │        ├─ AuswahlFeld                     [optional]
│              │        ├─ AuswahlFeld                     [Menge]
│              │        ├─ Button                          [Warenkorb]
│              │        ├─ ReviewsSection
│              │        │  ├─ StarRating
│              │        │  ├─ ReviewList
│              │        │  │  └─ ReviewItem                [Liste]
│              │        │  │     ├─ StarRating
│              │        │  │     └─ Button                 [bedingt]
│              │        │  └─ ReviewForm                   [angemeldet]
│              │        │     ├─ StarRatingInput
│              │        │     ├─ ErrorMessage              [bedingt]
│              │        │     └─ Button
│              │        └─ ShopCard                        [Empfehlungen]
│              │
│              ├─ Route "/historie"
│              │  └─ SiteLayout
│              │     └─ HistorieApp
│              │        ├─ Hero
│              │        ├─ Slideshow
│              │        ├─ Fakten
│              │        │  └─ StatCard                     [Liste]
│              │        │     └─ CountUpNumber
│              │        ├─ Geschaeftsfuehrung
│              │        └─ Zeitreise
│              │           └─ TimelineEintrag              [Liste]
│              │
│              ├─ Route "/biergarten"
│              │  └─ SiteLayout
│              │     └─ BiergartenApp
│              │        ├─ Hero
│              │        │  ├─ OeffnungsStatus
│              │        │  └─ Button                       [Aktionen]
│              │        ├─ Reveal                          [Highlights]
│              │        ├─ FlipCard                        [Liste]
│              │        ├─ Reveal                          [Öffnungszeiten]
│              │        ├─ Speisekarte
│              │        └─ Reservierung
│              │
│              ├─ Route "/freunde-club"
│              │  └─ SiteLayout
│              │     └─ FreundeClub
│              │        ├─ Hero
│              │        ├─ Reveal
│              │        ├─ ClubVorteile
│              │        │  └─ FClubCard                    [Liste]
│              │        ├─ Input                           [mehrere]
│              │        └─ Button
│              │
│              ├─ Route "/karriere"
│              │  └─ SiteLayout
│              │     └─ CareerApp
│              │        └─ CareerSection                   [Liste]
│              │           └─ JobCard                      [Liste]
│              │              └─ Button
│              │
│              ├─ Route "/bewerbung/:id"
│              │  └─ SiteLayout
│              │     └─ JobDetailApp
│              │        └─ Button
│              │
│              ├─ Route "/bewerbung/:id/formular"
│              │  └─ SiteLayout
│              │     └─ BewerbungApp
│              │        └─ Bewerbungsformular
│              │           ├─ Input                        [mehrere]
│              │           └─ Button
│              │
│              ├─ Route "/checkout"
│              │  └─ SiteLayout
│              │     └─ CheckoutApp
│              │        └─ Button
│              │
│              ├─ Route "/trikot"
│              │  └─ SiteLayout
│              │     └─ TrikotBestellung
│              │        ├─ TrikotBestellformular           [angemeldet]
│              │        │  ├─ TrikotShowcase
│              │        │  └─ Button
│              │        └─ TrikotAuthGate                  [nicht angemeldet]
│              │           ├─ LoginForm oder RegisterForm
│              │           └─ TrikotShowcase
│              │
│              ├─ Route "/kontakt"
│              │  └─ SiteLayout
│              │     └─ Kontakt
│              │
│              ├─ Route "/impressum"
│              │  └─ SiteLayout
│              │     └─ ImpressumPage
│              │        └─ LegalPage
│              │
│              ├─ Route "/datenschutz"
│              │  └─ SiteLayout
│              │     └─ DatenschutzPage
│              │        └─ LegalPage
│              │
│              ├─ Route "/agb"
│              │  └─ SiteLayout
│              │     └─ AgbPage
│              │        └─ LegalPage
│              │
│              └─ Route "*"
│                 └─ SiteLayout
│                    └─ NichtGefunden
│                       └─ Button
│
├─ Gemeinsamer SiteLayout-Unterbaum
│  ├─ AchtungBanner                         [optional]
│  ├─ Header
│  │  ├─ UserWidget
│  │  │  ├─ UserAvatar                      [angemeldet]
│  │  │  └─ Auth-Seitenleiste               [Portal, geöffnet]
│  │  │     ├─ AccountLogin                 [angemeldet]
│  │  │     ├─ LoginForm                    [Login]
│  │  │     └─ RegisterForm                 [Registrierung]
│  │  └─ Card                               [optional]
│  │     └─ Cart-Seitenleiste               [Portal, geöffnet]
│  ├─ jeweilige Page Component
│  └─ Footer
│
├─ #cart-root                               [optional]
│  └─ StrictMode
│     └─ Card
│
└─ #user-root                               [optional]
   └─ StrictMode
      └─ UserWidget
