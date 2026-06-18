import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "react-router";

const DISMISS_STORAGE_KEY = "trikot-card-dismissed";

function readDismissed(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(DISMISS_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function TrikotFloatingCard() {
  const [dismissed, setDismissed] = useState(readDismissed);

  useEffect(() => {
    setDismissed(readDismissed());
  }, []);

  function handleClose(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDismissed(true);

    try {
      window.sessionStorage.setItem(DISMISS_STORAGE_KEY, "true");
    } catch {
      // sessionStorage nicht verfügbar – Card bleibt nur für diesen Moment ausgeblendet.
    }
  }

  if (dismissed) {
    return null;
  }

  return (
    <Link className="trikot-float-card" to="/trikot" aria-label="Sichere dir jetzt dein Deutschland Trikot">
      <button
        className="trikot-float-card__close"
        type="button"
        aria-label="Hinweis schließen"
        onClick={handleClose}
      >
        ×
      </button>
      <img
        className="trikot-float-card__image"
        src="/assets/images/deutschland_trikot.png"
        alt="Hellensteiner Bräu Deutschland Trikot"
      />
      <div className="trikot-float-card__text">
        <span className="trikot-float-card__badge">Gratis</span>
        <strong>Sichere dir jetzt dein Deutschland Trikot</strong>
      </div>
    </Link>
  );
}
