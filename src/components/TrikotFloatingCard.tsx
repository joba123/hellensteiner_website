import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "react-router";

const VERBERGEN_SCHLUESSEL = "trikot-card-dismissed";

function hide(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(VERBERGEN_SCHLUESSEL) === "true";
  } catch {
    return false;
  }
}

export function TrikotFloatingCard() {
  const [verborgen, setVerborgen] = useState(hide);

  useEffect(() => {
    setVerborgen(hide());
  }, []);

  function handleClose(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setVerborgen(true);

    try {
      window.sessionStorage.setItem(VERBERGEN_SCHLUESSEL, "true");
    } catch {
      // sessionStorage nicht verfügbar – Card bleibt nur für diesen Moment ausgeblendet.
    }
  }

  if (verborgen) {
    return null;
  }

  return (
    <Link className="trikot-schwebekarte" to="/trikot" aria-label="Sichere dir jetzt dein Deutschland Trikot">
      <button
        className="trikot-schwebekarte__schliessen"
        type="button"
        aria-label="Hinweis schließen"
        onClick={handleClose}
      >
      </button>
      <img
        className="trikot-schwebekarte__bild"
        src="/assets/images_converted/transparent/deutschland_trikot.png"
        alt="Hellensteiner Bräu Deutschland Trikot"
      />
      <div className="trikot-schwebekarte__text">
        <span className="trikot-schwebekarte__kennzeichen">Gratis</span>
        <strong>Sichere dir jetzt dein Deutschland Trikot</strong>
      </div>
    </Link>
  );
}
