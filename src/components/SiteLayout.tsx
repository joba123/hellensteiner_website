import type { ReactNode } from "react";
import { CartWidget } from "./CartWidget";

interface SiteLayoutProps {
  children: ReactNode;
  activeRoute?: string;
  showCart?: boolean;
  showBanner?: boolean;
  headerVariant?: "default" | "career";
}

const navItems = [
  { href: "/shop", label: "Shop", key: "shop" },
  { href: "/pages/historie.html", label: "Historie", key: "historie" },
  { href: "/pages/biergarten.html", label: "Biergarten", key: "biergarten" },
  { href: "/freunde-club", label: "Freunde Club", key: "freunde-club" },
  { href: "/karriere", label: "Karriere", key: "karriere" }
];

export function AttentionBanner() {
  return (
    <div className="achtung-banner">
      <div className="achtung-banner-text">Studentisches Projekt - DHBW Heidenheim | Wirtschaftsinformatik</div>
    </div>
  );
}

export function SiteHeader({
  activeRoute,
  showCart = true,
  variant = "default"
}: {
  activeRoute?: string;
  showCart?: boolean;
  variant?: "default" | "career";
}) {
  const isCareerHeader = variant === "career";

  return (
    <header className={isCareerHeader ? "career-site-header" : undefined}>
      <a href="/">
        <div className="logo">
          <img src="/assets/images/logo_neu.png" alt="Hellensteiner Logo" />
        </div>
      </a>
      <input type="checkbox" id="menu-togglen" />
      <label htmlFor="menu-togglen" className="burger" aria-label="Menü öffnen oder schließen">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <nav className={isCareerHeader ? "career-site-nav" : undefined}>
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <a href={item.href}>{activeRoute === item.key ? <u>{item.label}</u> : item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      {showCart && <CartWidget />}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <iframe
            className="karte"
            title="karte"
            src="https://www.openstreetmap.org/export/embed.html?bbox=10.153327882289888%2C48.6816285680517%2C10.155130326747896%2C48.68267162232338&amp;layer=mapnik"
          ></iframe>
          <br />
          <a className="karte-link" aria-label="Karten-Link" href="https://www.openstreetmap.org/?#map=17/48.680587/10.152140">
            Hier findest du uns
          </a>
        </div>
        <div className="foot-row">
          <h3><a href="/impressum">Impressum</a></h3>
          <h3><a href="/kontakt">Kontakt</a></h3>
          <h3><a href="/datenschutz">Datenschutz</a></h3>
          <h3><a href="/agb">AGB's</a></h3>
        </div>
        <div>
          <h3>Folge uns:</h3>
          <a href="https://www.instagram.com/hellensteiner_brauerei/" className="social-link" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://www.facebook.com/share/17VXGpS5KQ/" className="social-link" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://www.youtube.com/@HellensteinerBr%C3%A4u" className="social-link" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.94C18.88 4 12 4 12 4s-6.88 0-8.6.48A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.94C5.12 20 12 20 12 20s6.88 0 8.6-.48a2.78 2.78 0 0 0 1.94-1.94A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z"></path>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
            </svg>
          </a>
        </div>
      </div>
      <p>© 2025 HELLENSTEINER BRÄU - Alle Rechte vorbehalten</p>
    </footer>
  );
}

export function SiteLayout({ children, activeRoute, showCart = true, showBanner = true, headerVariant = "default" }: SiteLayoutProps) {
  return (
    <>
      {showBanner && <AttentionBanner />}
      <SiteHeader activeRoute={activeRoute} showCart={showCart} variant={headerVariant} />
      {children}
      <SiteFooter />
    </>
  );
}
