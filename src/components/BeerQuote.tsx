import { useEffect, useState } from "react";
import { BeerQuote as createBeerQuote, type BeerQuoteItem } from "beerq";

const HOUR_MS = 3_600_000;

function getHourlyQuote(): BeerQuoteItem {
  const allQuotes = createBeerQuote("eng").getAllQuotes();
  const hourIndex = Math.floor(Date.now() / HOUR_MS) % allQuotes.length;
  return allQuotes[hourIndex];
}

async function translateToGerman(text: string, signal: AbortSignal): Promise<string> {
  const cacheKey = `beerQuoteDe:${text}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
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
  const translated: unknown = data?.responseData?.translatedText;
  if (typeof translated !== "string" || translated.trim() === "") {
    throw new Error("Keine Übersetzung erhalten.");
  }

  try {
    sessionStorage.setItem(cacheKey, translated);
  } catch {

  }

  return translated;
}

export function BeerQuote() {
  const [quote, setQuote] = useState<BeerQuoteItem>(getHourlyQuote);
  const [germanText, setGermanText] = useState<string | null>(null);

  useEffect(() => {
    const msUntilNextHour = HOUR_MS - (Date.now() % HOUR_MS);
    const timeout = setTimeout(() => setQuote(getHourlyQuote()), msUntilNextHour + 1000);
    return () => clearTimeout(timeout);
  }, [quote]);

  // Übersetzung der Zitate ins Deutsche 
  useEffect(() => {
    const controller = new AbortController();
    setGermanText(null);

    translateToGerman(quote.quote, controller.signal)
      .then(setGermanText)
      .catch(() => setGermanText(null));

    return () => controller.abort();
  }, [quote.quote]);

  const displayText = germanText ?? quote.quote;

  return (
    <figure className="beer-quote">
      <blockquote className="beer-quote__text">„{displayText}"</blockquote>
      <figcaption className="beer-quote__author">– {quote.author}</figcaption>
    </figure>
  );
}
