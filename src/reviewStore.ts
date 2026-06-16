import { useSyncExternalStore } from "react";

const REVIEWS_STORAGE_KEY = "hellensteiner-reviews";

export interface Review {
  id: string;
  productId: string;
  userEmail: string;
  userName: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface ReviewInput {
  productId: string;
  userEmail: string;
  userName: string;
  rating: number;
  text: string;
}

// Vordefinierte Beispiel-Bewertungen pro Produkt-ID.
const BEISPIEL_REVIEWS: readonly Review[] = [
  {
    id: "example-hefeweiss-1",
    productId: "hefeweiss",
    userEmail: "andrea.k@example.com",
    userName: "Andrea Köhler",
    rating: 5,
    text: "Mein absolutes Lieblingsweißbier – fruchtig, frisch und herrlich spritzig. Schmeckt wie früher beim Wirt um die Ecke.",
    createdAt: "2026-04-12T18:24:00.000Z"
  },
  {
    id: "example-hefeweiss-2",
    productId: "hefeweiss",
    userEmail: "tobias.m@example.com",
    userName: "Tobias Mayr",
    rating: 4,
    text: "Sehr gutes Hefeweizen mit schöner Bananennote. Einzig die Lieferung hat etwas gedauert.",
    createdAt: "2026-03-30T09:10:00.000Z"
  },
  {
    id: "example-hefeweiss-3",
    productId: "hefeweiss",
    userEmail: "sabine.r@example.com",
    userName: "Sabine Reiter",
    rating: 5,
    text: "Super Geschmack und tolle Qualität. Das Starterpaket war schnell da und gut verpackt.",
    createdAt: "2026-02-18T20:45:00.000Z"
  },
  {
    id: "example-kristallweiss-1",
    productId: "kristallweiss",
    userEmail: "michael.b@example.com",
    userName: "Michael Brand",
    rating: 4,
    text: "Klar, sauber und erfrischend. Genau das richtige für einen warmen Sommerabend im Biergarten.",
    createdAt: "2026-04-02T16:05:00.000Z"
  },
  {
    id: "example-kristallweiss-2",
    productId: "kristallweiss",
    userEmail: "julia.f@example.com",
    userName: "Julia Fischer",
    rating: 5,
    text: "Wunderbar mild und elegant. Schmeckt auch Gästen, die sonst kein Weißbier mögen.",
    createdAt: "2026-03-11T12:30:00.000Z"
  },
  {
    id: "example-dunkelweiss-1",
    productId: "dunkelweiss",
    userEmail: "peter.h@example.com",
    userName: "Peter Hofmann",
    rating: 5,
    text: "Malzig, vollmundig und mit feiner Karamellnote. Mein Favorit für die kühleren Abende.",
    createdAt: "2026-03-22T19:50:00.000Z"
  },
  {
    id: "example-dunkelweiss-2",
    productId: "dunkelweiss",
    userEmail: "claudia.w@example.com",
    userName: "Claudia Wagner",
    rating: 4,
    text: "Schönes dunkles Weißbier mit Charakter. Etwas kräftiger als erwartet, aber sehr lecker.",
    createdAt: "2026-02-28T21:15:00.000Z"
  },
  {
    id: "example-helles-original-1",
    productId: "helles-original",
    userEmail: "stefan.l@example.com",
    userName: "Stefan Lang",
    rating: 5,
    text: "Ein klassisches Helles wie es sein soll – süffig, ausgewogen und nie langweilig. Top!",
    createdAt: "2026-04-08T17:40:00.000Z"
  },
  {
    id: "example-helles-original-2",
    productId: "helles-original",
    userEmail: "nina.s@example.com",
    userName: "Nina Schuster",
    rating: 4,
    text: "Sehr angenehmes, mildes Bier. Perfekt für gesellige Runden mit Freunden.",
    createdAt: "2026-03-15T14:20:00.000Z"
  },
  {
    id: "example-zwickl-hell-1",
    productId: "zwickl-hell",
    userEmail: "georg.p@example.com",
    userName: "Georg Pfeiffer",
    rating: 5,
    text: "Naturtrüb und herrlich aromatisch. Man schmeckt das Handwerk in jedem Schluck.",
    createdAt: "2026-04-01T18:00:00.000Z"
  },
  {
    id: "example-masskrug-1",
    productId: "masskrug",
    userEmail: "franziska.d@example.com",
    userName: "Franziska Dietrich",
    rating: 5,
    text: "Wunderschöner, schwerer Maßkrug mit edler Gravur. Macht auf jedem Tisch etwas her.",
    createdAt: "2026-03-19T10:35:00.000Z"
  },
  {
    id: "example-masskrug-2",
    productId: "masskrug",
    userEmail: "robert.n@example.com",
    userName: "Robert Neubauer",
    rating: 4,
    text: "Sehr solide Qualität und gute Verarbeitung. Etwas teuer, aber das Geld wert.",
    createdAt: "2026-02-25T15:55:00.000Z"
  },
  {
    id: "example-hoodie-1",
    productId: "hoodie",
    userEmail: "lena.v@example.com",
    userName: "Lena Vogel",
    rating: 5,
    text: "Super weicher Stoff und angenehm warm. Die Stickerei ist hochwertig verarbeitet.",
    createdAt: "2026-04-05T13:10:00.000Z"
  }
];

interface ReviewsState {
  userReviews: Review[];
}

const listeners = new Set<() => void>();
let reviewsState: ReviewsState = readReviewsState();

function readReviewsState(): ReviewsState {
  if (typeof window === "undefined") {
    return { userReviews: [] };
  }

  try {
    const storedReviews = window.localStorage.getItem(REVIEWS_STORAGE_KEY);

    if (!storedReviews) {
      return { userReviews: [] };
    }

    const parsedReviews = JSON.parse(storedReviews) as ReviewsState;

    if (!Array.isArray(parsedReviews.userReviews)) {
      return { userReviews: [] };
    }

    return {
      userReviews: parsedReviews.userReviews.filter(
        (review) =>
          review &&
          typeof review.id === "string" &&
          typeof review.productId === "string" &&
          typeof review.rating === "number"
      )
    };
  } catch {
    return { userReviews: [] };
  }
}

function writeReviewsState(nextState: ReviewsState) {
  reviewsState = nextState;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(nextState));
  }

  listeners.forEach((listener) => listener());
}

function normalizeRating(rating: number): number {
  return Math.max(1, Math.min(5, Math.round(rating)));
}

export function subscribeToReviews(listener: () => void): () => void {
  listeners.add(listener);

  function handleExternalReviewsChange() {
    reviewsState = readReviewsState();
    listener();
  }

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleExternalReviewsChange);
  }

  return () => {
    listeners.delete(listener);

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleExternalReviewsChange);
    }
  };
}

export function getReviewsSnapshot(): ReviewsState {
  return reviewsState;
}

export function getProductReviews(productId: string): Review[] {
  const exampleReviews = BEISPIEL_REVIEWS.filter((review) => review.productId === productId);
  const userReviews = reviewsState.userReviews.filter((review) => review.productId === productId);

  return [...userReviews, ...exampleReviews].sort(
    (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
  );
}

export function useReviews(productId: string): Review[] {
  useSyncExternalStore(subscribeToReviews, getReviewsSnapshot, getReviewsSnapshot);

  return getProductReviews(productId);
}

export function getAverageRating(reviews: readonly Review[]): number {
  if (reviews.length === 0) {
    return 0;
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return total / reviews.length;
}

export function getUserReviewForProduct(productId: string, userEmail: string): Review | undefined {
  return reviewsState.userReviews.find(
    (review) => review.productId === productId && review.userEmail === userEmail
  );
}

export function addReview(reviewInput: ReviewInput) {
  const rating = normalizeRating(reviewInput.rating);
  const text = reviewInput.text.trim();

  // Eine Bewertung pro Nutzer und Produkt – vorhandene wird ersetzt.
  const withoutPrevious = reviewsState.userReviews.filter(
    (review) => !(review.productId === reviewInput.productId && review.userEmail === reviewInput.userEmail)
  );

  const newReview: Review = {
    id: `user-${reviewInput.productId}-${reviewInput.userEmail}-${Date.now()}`,
    productId: reviewInput.productId,
    userEmail: reviewInput.userEmail,
    userName: reviewInput.userName,
    rating,
    text,
    createdAt: new Date().toISOString()
  };

  writeReviewsState({ userReviews: [...withoutPrevious, newReview] });
}

export function removeReview(reviewId: string, userEmail: string) {
  writeReviewsState({
    userReviews: reviewsState.userReviews.filter(
      (review) => !(review.id === reviewId && review.userEmail === userEmail)
    )
  });
}

export function formatReviewDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}
