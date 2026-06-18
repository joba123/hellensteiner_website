import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { CheckoutApp } from "./CheckoutApp";
import { CareerApp } from "./CareerApp";
import { JobDetailApp } from "./JobDetailApp";
import { BewerbungApp } from "./BewerbungApp";
import { ProduktDetailSeite } from "./pages/ProduktDetailSeite";
import { Button } from "./components/Button";
import { SiteLayout } from "./components/SiteLayout";
import { AgbPage, DatenschutzPage, ImpressumPage } from "./pages/LegalPages";
import { FreundeClub } from "./pages/FreundeClub";
import { Kontakt } from "./pages/Kontakt";
import { LandingPage } from "./pages/LandingPage";
import { Shop } from "./pages/Shop";
import { TrikotBestellung } from "./pages/TrikotBestellung";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NotFoundPage() {
  return (
    <main className="application-page application-page--empty">
      <section className="application-empty">
        <p className="career-eyebrow">Hellensteiner Bräu</p>
        <h1>Seite nicht gefunden</h1>
        <p>Diese Seite existiert nicht oder wurde in die neue React-Navigation verschoben.</p>
        <Button as="a" href="/">Zur Startseite</Button>
      </section>
    </main>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <SiteLayout>
              <LandingPage />
            </SiteLayout>
          }
        />
        <Route
          path="/shop"
          element={
            <SiteLayout aktiveRoute="shop">
              <Shop />
            </SiteLayout>
          }
        />
        <Route
          path="/produkt/:id"
          element={
            <SiteLayout aktiveRoute="shop">
              <main>
                <ProduktDetailSeite />
              </main>
            </SiteLayout>
          }
        />
        <Route
          path="/freunde-club"
          element={
            <SiteLayout aktiveRoute="freunde-club">
              <FreundeClub />
            </SiteLayout>
          }
        />
        <Route
          path="/karriere"
          element={
            <SiteLayout aktiveRoute="karriere" warenkorbAnzeigen={false}>
              <CareerApp />
            </SiteLayout>
          }
        />
        <Route
          path="/bewerbung/:id"
          element={
            <SiteLayout aktiveRoute="karriere" warenkorbAnzeigen={false}>
              <JobDetailApp />
            </SiteLayout>
          }
        />
        <Route
          path="/bewerbung/:id/formular"
          element={
            <SiteLayout aktiveRoute="karriere" warenkorbAnzeigen={false}>
              <BewerbungApp />
            </SiteLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <SiteLayout aktiveRoute="shop">
              <main>
                <CheckoutApp />
              </main>
            </SiteLayout>
          }
        />
        <Route
          path="/trikot"
          element={
            <SiteLayout>
              <TrikotBestellung />
            </SiteLayout>
          }
        />
        <Route
          path="/kontakt"
          element={
            <SiteLayout>
              <Kontakt />
            </SiteLayout>
          }
        />
        <Route
          path="/impressum"
          element={
            <SiteLayout>
              <ImpressumPage />
            </SiteLayout>
          }
        />
        <Route
          path="/datenschutz"
          element={
            <SiteLayout>
              <DatenschutzPage />
            </SiteLayout>
          }
        />
        <Route
          path="/agb"
          element={
            <SiteLayout>
              <AgbPage />
            </SiteLayout>
          }
        />
        <Route
          path="*"
          element={
            <SiteLayout warenkorbAnzeigen={false}>
              <NotFoundPage />
            </SiteLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
