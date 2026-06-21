import { useEffect, useState } from "react";
import { BeerQuote as createBeerQuote, type BeerQuoteItem } from "beerq";

const stundeInMs = 3_600_000;

function zitatAktualisieren(): BeerQuoteItem {  //Aktuell stündlich
  const alleQuotes = createBeerQuote("eng").getAllQuotes();
  const stundenIndex = Math.floor(Date.now() / stundeInMs) % alleQuotes.length;
  return alleQuotes[stundenIndex];
}

async function uebersetzen(text: string, signal: AbortSignal): Promise<string> {
  const cacheSchluessel = `beerQuoteDe:${text}`;
  try {
    const cached = sessionStorage.getItem(cacheSchluessel);
    if (cached) {
      return cached;
    }
  } catch {

  }

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|de`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Übersetzung fehlgeschlagen.");
  }

  const data = await response.json();
  const uebersetzt: unknown = data?.responseData?.translatedText;
  if (typeof uebersetzt !== "string" || uebersetzt.trim() === "") {
    throw new Error("Keine Übersetzung erhalten.");
  }

  try {
    sessionStorage.setItem(cacheSchluessel, uebersetzt);
  } catch {

  }

  return uebersetzt;
}

export function BeerQuote() {
  const [quote, setQuote] = useState<BeerQuoteItem>(zitatAktualisieren);
  const [germanText, setText] = useState<string | null>(null);

  useEffect(() => {
    const msBisNaechsteStunde = stundeInMs - (Date.now() % stundeInMs);
    const timeout = setTimeout(() => setQuote(zitatAktualisieren()), msBisNaechsteStunde + 1000);
    return () => clearTimeout(timeout);
  }, [quote]);

  // Übersetzt Zitate auf Deutsche 
  useEffect(() => {
    const controller = new AbortController();
    setText(null);

    uebersetzen(quote.quote, controller.signal)
      .then(setText)
      .catch(() => setText(null));

    return () => controller.abort();
  }, [quote.quote]);

  const anzeigeText = germanText ?? quote.quote;

  return (
    <figure className="bierzitat">
      <blockquote className="bierzitat__text">„{anzeigeText}"</blockquote>
      <figcaption className="bierzitat__autor">– {quote.author}</figcaption>
    </figure>
  );
}
