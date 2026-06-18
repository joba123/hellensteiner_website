# State Map – Hellensteiner Bräu

> Stand: 18.06.2026 · DHBW – Business Engineering 2 (2026)
> React-Anwendung der Hellensteiner Bräu Website

## Grundprinzipien

- **Nur eine Komponente braucht den State** → lokaler `useState` in der Komponente.
- **Mehrere Komponenten brauchen den State** → State im gemeinsamen Elternteil (Lift State Up).
- **So tief wie möglich, so hoch wie nötig** – seitenübergreifender State wird in globale Stores
  (`useSyncExternalStore` + `localStorage`) ausgelagert statt durch viele Ebenen geprop-drillt.

---

## 0. Globaler / seitenübergreifender State (Stores)

Diese Werte werden von mehreren Komponenten auf mehreren Seiten gelesen → sie leben im Store
(höchste sinnvolle Ebene), nicht in einer einzelnen Page.

| State Wert            | Typ                       | Wo lebt er?                | Wer liest ihn                                                                 | Wer verändert ihn?                                                                                   |
| --------------------- | ------------------------- | -------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `cartItems` (`items`) | `CartItem[]`              | `cartStore.ts` (`useCart`) | `Card` (Warenkorb-Drawer), `CheckoutApp`, Header-Badge                       | `ProduktDetailSeite` (`addCartItem`), `Card` (`updateCartItemQuantity`, `removeCartItem`), `CheckoutApp` (`clearCart`) |
| `currentUser`/`users` | `PublicUser \| null` / `User[]` | `authStore.ts` (`useAuth`) | `UserWidget`, `Card`, `CheckoutApp`, `FreundeClub`, `ReviewsSection`, `TrikotBestellung` | `LoginForm` (`login`), `RegisterForm` (`register`), `AccountLogin` (`logout`), `FreundeClub` (`joinClub`) |
| `userReviews`         | `Review[]`                | `reviewStore.ts` (`useReviews`) | `ReviewsSection`, `ReviewList`                                            | `ReviewForm` (`addReview`), `ReviewsSection` (`removeReview`)                                        |

---

## 1. Shared Layout (auf allen React-Routen sichtbar)

`SiteLayout` → `Header` → `Card` + `UserWidget`

| State Wert                       | Typ        | Wo lebt er?      | Wer liest ihn   | Wer verändert ihn?                  |
| -------------------------------- | ---------- | ---------------- | --------------- | ----------------------------------- |
| `isOpen` (Warenkorb-Drawer)      | `boolean`  | `Card.tsx`       | nur `Card`      | `Card` (Button)                     |
| `isOpen` (Account-Drawer)        | `boolean`  | `UserWidget.tsx` | nur `UserWidget`| `UserWidget`                        |
| `mode` (`login`/`register`)      | `AuthMode` | `UserWidget.tsx` | `UserWidget`    | `LoginForm`/`RegisterForm` (Toggle) |

> Korrekt **lokal**: Der Drawer-Offen-Zustand wird nur von der jeweiligen Komponente gebraucht.

---

## 2. Shop-Seite (`/shop`)

| State Wert        | Typ       | Wo lebt er?     | Wer liest ihn                 | Wer verändert ihn?       |
| ----------------- | --------- | --------------- | ----------------------------- | ------------------------ |
| `searchTerm`      | `string`  | `Shop.tsx`      | Such-`input`, Produktliste    | Such-`input` (`onChange`)|
| `activeIndex`     | `number`  | `ShopCard.tsx`  | nur jeweilige `ShopCard`      | `ShopCard`               |
| `isInteracting`   | `boolean` | `ShopCard.tsx`  | nur `ShopCard`                | `ShopCard`               |

> `searchTerm` liegt im gemeinsamen Elternteil `Shop` (Suchfeld + Liste in derselben Datei) –
> kein zusätzliches Lift-up nötig.

---

## 3. Produkt-Detailseite (`/produkt/:id`)

| State Wert                          | Typ                          | Wo lebt er?                  | Wer liest ihn                      | Wer verändert ihn?      |
| ----------------------------------- | ---------------------------- | ---------------------------- | ---------------------------------- | ----------------------- |
| `activeIndex` (Galerie)             | `number`                     | `ProduktDetailSeite.tsx`     | Galerie + Thumbnails               | Thumbnail-Buttons       |
| `selectedOption` (Variante)         | `string`                     | `ProduktDetailSeite.tsx`     | Auswahl-`select`, Preis, `addCartItem` | Auswahl-`select`    |
| `selectedQuantity`                  | `string`                     | `ProduktDetailSeite.tsx`     | Mengen-`select`, `addCartItem`     | Mengen-`select`         |
| `warenkorbStatus`                   | `string`                     | `ProduktDetailSeite.tsx`     | Status-Hinweis                     | `handleAddToCart`       |
| `hoverValue` (Sterne-Hover)         | `number`                     | `StarRatingInput.tsx`        | nur `StarRatingInput`              | `StarRatingInput`       |
| `rating`, `text`, `error`, `status` | `number`/`string`/`string\|null` | `ReviewForm.tsx`         | nur `ReviewForm`                   | `ReviewForm`            |

---

## 4. Checkout-Seite (`/checkout`)

| State Wert                  | Typ       | Wo lebt er?       | Wer liest ihn                       | Wer verändert ihn? |
| --------------------------- | --------- | ----------------- | ----------------------------------- | ------------------ |
| `isComplete`                | `boolean` | `CheckoutApp.tsx` | `CheckoutApp` (Conditional Render)  | `handleSubmit`     |
| *(global)* `cartItems`, `currentUser` | –  | Stores            | `CheckoutApp`                       | –                  |

---

## 5. Trikot-Bestellseite (`/trikot`)

| State Wert                  | Typ        | Wo lebt er?                              | Wer liest ihn            | Wer verändert ihn?      |
| --------------------------- | ---------- | ---------------------------------------- | ------------------------ | ----------------------- |
| `mode` (`login`/`register`) | `AuthMode` | `TrikotBestellung.tsx` → `TrikotAuthGate`| `TrikotAuthGate`         | Login/Register-Toggle   |
| `bestellt`                  | `boolean`  | `TrikotBestellung.tsx` → `TrikotBestellformular` | `TrikotBestellformular` | `handleSubmit`   |
| *(global)* `currentUser`    | –          | `authStore`                              | `TrikotBestellung`       | –                       |

---

## 6. Freunde-Club (`/freunde-club`)

| State Wert       | Typ                  | Wo lebt er?        | Wer liest ihn          | Wer verändert ihn?  |
| ---------------- | -------------------- | ------------------ | ---------------------- | ------------------- |
| `statusMessage`  | `string \| null`     | `FreundeClub.tsx`  | Status-Anzeige         | `Mitglied_werden`   |
| `statusType`     | `"success"\|"error"` | `FreundeClub.tsx`  | Status-Anzeige (CSS)   | `Mitglied_werden`   |

---

## 7. Karriere / Bewerbung (`/karriere`, `/bewerbung/:id`, `/bewerbung/:id/formular`)

| State Wert             | Typ       | Wo lebt er?         | Wer liest ihn                | Wer verändert ihn?               |
| ---------------------- | --------- | ------------------- | ---------------------------- | -------------------------------- |
| `bewerbungVerschickt`  | `boolean` | `BewerbungApp.tsx`  | `BewerbungApp` (Danke-Screen)| `Bewerbungsformular` (Callback)  |

> `CareerApp` und `JobDetailApp` haben keinen eigenen `useState` – sie lesen nur Route-Parameter
> (`useParams`) und statische Daten.

---

## 8. Landing-Page (`/`) & Altersabfrage

| State Wert                                          | Typ                       | Wo lebt er?                          | Wer liest ihn          | Wer verändert ihn?       |
| --------------------------------------------------- | ------------------------- | ------------------------------------ | ---------------------- | ------------------------ |
| `value` (CountUp-Animation)                         | `number`                  | `LandingPage.tsx` → `CountUpNumber`  | nur `CountUpNumber`    | `CountUpNumber` (rAF)    |
| `dismissed` (Trikot-Card)                           | `boolean`                 | `TrikotFloatingCard.tsx`             | nur `TrikotFloatingCard`| Schließen-Button        |
| `quote`, `germanText`                               | `BeerQuoteItem`/`string\|null` | `BeerQuote.tsx`                 | nur `BeerQuote`        | `BeerQuote` (Effekt)     |
| `isVerified`, `error`, `country`, `day`, `month`, `year` | `boolean`/`string`   | `Altersabfrage.tsx`                  | nur `Altersabfrage`    | Formularfelder / `handleSubmit` |

---

## Bewertung nach den Prinzipien

- **Lokaler State, wo nur eine Komponente ihn braucht:** Slider-Index, Drawer-offen, Hover-Sterne,
  Animationen, Formularfelder.
- **State im gemeinsamen Elternteil:** `searchTerm` in `Shop`, Galerie/Auswahl in
  `ProduktDetailSeite`, `bewerbungVerschickt` in `BewerbungApp`.
- **„So hoch wie nötig":** `cartItems`, `currentUser`, `reviews` werden von Komponenten auf
  verschiedenen Seiten gebraucht → ausgelagert in globale Stores statt Prop-Drilling.
