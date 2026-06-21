import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes as Routen, Route, useLocation } from "react-router";
import { CheckoutApp as KassenSeite } from "./pages/CheckoutApp";
import { CareerApp as KarriereSeite } from "./pages/CareerApp";
import { JobDetailApp as StellenDetailSeite } from "./pages/JobDetailApp";
import { BewerbungApp as BewerbungsSeite } from "./pages/BewerbungApp";
import { ProduktDetailSeite } from "./pages/ProduktDetailSeite";
import { Button as Knopf } from "./components/Button";
import { SiteLayout as SeitenLayout } from "./components/SiteLayout";
import { AgbPage as AgbSeite, DatenschutzPage as DatenschutzSeite, ImpressumPage as ImpressumSeite } from "./pages/LegalPages";
import { FreundeClub as FreundeClubSeite } from "./pages/FreundeClub";
import { Kontakt as KontaktSeite } from "./pages/Kontakt";
import { LandingPage as Startseite } from "./pages/LandingPage";
import { Shop as ShopSeite } from "./pages/Shop";
import { TrikotBestellung as TrikotBestellSeite } from "./pages/TrikotBestellung";
import { BiergartenApp as BiergartenSeite } from "./pages/BiergartenApp";
import { HistorieApp as HistorieSeite } from "./pages/HistorieApp";

function Hochscrollen() {
  const { pathname: pfadname } = useLocation();

  useEffect(() => {
    const bisherigeScrollWiederherstellung = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = bisherigeScrollWiederherstellung;
    };
  }, []);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [pfadname]);

  return null;
}

function NichtGefunden() {
  return (
    <main className="bewerbung-seite bewerbung-seite--leer">
      <section className="bewerbung-leer">
        <p className="karriere-ueberzeile">Hellensteiner Bräu</p>
        <h1>Seite nicht gefunden</h1>
        <p>Diese Seite existiert nicht oder wurde in die neue React-Navigation verschoben.</p>
        <Knopf as="a" href="/">Zur Startseite</Knopf>
      </section>
    </main>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Hochscrollen />
      <Routen>
        <Route
          path="/"
          element={
            <SeitenLayout>
              <Startseite />
            </SeitenLayout>
          }
        />
        <Route
          path="/shop"
          element={
            <SeitenLayout aktiveRoute="shop">
              <ShopSeite />
            </SeitenLayout>
          }
        />
        <Route
          path="/produkt/:id"
          element={
            <SeitenLayout aktiveRoute="shop">
              <main>
                <ProduktDetailSeite />
              </main>
            </SeitenLayout>
          }
        />
        <Route
          path="/historie"
          element={
            <SeitenLayout aktiveRoute="historie">
              <main className="historie-seite">
                <HistorieSeite />
              </main>
            </SeitenLayout>
          }
        />
        <Route
          path="/biergarten"
          element={
            <SeitenLayout aktiveRoute="biergarten">
              <main className="biergarten-seite">
                <BiergartenSeite />
              </main>
            </SeitenLayout>
          }
        />
        <Route
          path="/freunde-club"
          element={
            <SeitenLayout aktiveRoute="freunde-club">
              <FreundeClubSeite />
            </SeitenLayout>
          }
        />
        <Route
          path="/karriere"
          element={
            <SeitenLayout aktiveRoute="karriere" warenkorbAnzeigen={false}>
              <KarriereSeite />
            </SeitenLayout>
          }
        />
        <Route
          path="/bewerbung/:id"
          element={
            <SeitenLayout aktiveRoute="karriere" warenkorbAnzeigen={false}>
              <StellenDetailSeite />
            </SeitenLayout>
          }
        />
        <Route
          path="/bewerbung/:id/formular"
          element={
            <SeitenLayout aktiveRoute="karriere" warenkorbAnzeigen={false}>
              <BewerbungsSeite />
            </SeitenLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <SeitenLayout aktiveRoute="shop">
              <main>
                <KassenSeite />
              </main>
            </SeitenLayout>
          }
        />
        <Route
          path="/trikot"
          element={
            <SeitenLayout>
              <TrikotBestellSeite />
            </SeitenLayout>
          }
        />
        <Route
          path="/kontakt"
          element={
            <SeitenLayout>
              <KontaktSeite />
            </SeitenLayout>
          }
        />
        <Route
          path="/impressum"
          element={
            <SeitenLayout>
              <ImpressumSeite />
            </SeitenLayout>
          }
        />
        <Route
          path="/datenschutz"
          element={
            <SeitenLayout>
              <DatenschutzSeite />
            </SeitenLayout>
          }
        />
        <Route
          path="/agb"
          element={
            <SeitenLayout>
              <AgbSeite />
            </SeitenLayout>
          }
        />
        <Route
          path="*"
          element={
            <SeitenLayout warenkorbAnzeigen={false}>
              <NichtGefunden />
            </SeitenLayout>
          }
        />
      </Routen>
    </BrowserRouter>
  );
}
