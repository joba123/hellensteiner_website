import { CheckoutApp } from "./CheckoutApp";
import { CareerApp } from "./CareerApp";
import { JobDetailApp } from "./JobDetailApp";
import { ProductDetailApp } from "./ProductDetailApp";
import { Button } from "./components/Button";
import { SiteLayout } from "./components/SiteLayout";
import { AgbPage, DatenschutzPage, ImpressumPage } from "./pages/LegalPages";
import { ClubPage } from "./pages/ClubPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
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
  const pathname = normalizePath(window.location.pathname);

  if (pathname === "/") {
    return (
      <SiteLayout>
        <HomePage />
      </SiteLayout>
    );
  }

  if (pathname === "/shop") {
    return (
      <SiteLayout activeRoute="shop">
        <ShopPage />
      </SiteLayout>
    );
  }

  if (pathname.startsWith("/produkt/")) {
    return (
      <SiteLayout activeRoute="shop">
        <main>
          <ProductDetailApp />
        </main>
      </SiteLayout>
    );
  }

  if (pathname === "/freunde-club") {
    return (
      <SiteLayout activeRoute="freunde-club">
        <ClubPage />
      </SiteLayout>
    );
  }

  if (pathname === "/karriere") {
    return (
      <SiteLayout activeRoute="karriere" showCart={false}>
        <CareerApp />
      </SiteLayout>
    );
  }

  if (pathname.startsWith("/bewerbung/")) {
    return (
      <SiteLayout activeRoute="karriere" showCart={false}>
        <JobDetailApp />
      </SiteLayout>
    );
  }

  if (pathname === "/checkout") {
    return (
      <SiteLayout activeRoute="shop">
        <main>
          <CheckoutApp />
        </main>
      </SiteLayout>
    );
  }

  if (pathname === "/kontakt") {
    return (
      <SiteLayout>
        <ContactPage />
      </SiteLayout>
    );
  }

  if (pathname === "/impressum") {
    return (
      <SiteLayout>
        <ImpressumPage />
      </SiteLayout>
    );
  }

  if (pathname === "/datenschutz") {
    return (
      <SiteLayout>
        <DatenschutzPage />
      </SiteLayout>
    );
  }

  if (pathname === "/agb") {
    return (
      <SiteLayout>
        <AgbPage />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout showCart={false}>
      <NotFoundPage />
    </SiteLayout>
  );
}
