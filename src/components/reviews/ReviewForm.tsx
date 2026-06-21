//AI-Tool - siehe AI-Tool Doku - 

import { useState } from "react";
import { Button } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import { StarRatingInput } from "./StarRatingInput";
import { addReview, type Review } from "../../../assets/ts/reviewStore";
import type { PublicUser } from "../../../assets/ts/authStore";

interface ReviewFormProps {
  productId: string;
  user: PublicUser;
  existingReview?: Review;
}

export function ReviewForm({ productId, user, existingReview }: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [text, setText] = useState(existingReview?.text ?? "");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (rating < 1) {
      setStatus(null);
      setError("Bitte vergib mindestens einen Stern.");
      return;
    }

    if (text.trim().length < 3) {
      setStatus(null);
      setError("Bitte schreibe einen kurzen Kommentar (mindestens 3 Zeichen).");
      return;
    }

    addReview({
      productId,
      userEmail: user.email,
      userName: user.name,
      rating,
      text
    });

    setError(null);
    setStatus(existingReview ? "Deine Bewertung wurde aktualisiert." : "Danke für deine Bewertung!");
  }

  return (
    <form className="bewertungsformular" onSubmit={handleSubmit} noValidate>
      <h3 className="bewertungsformular__titel">
        {existingReview ? "Deine Bewertung bearbeiten" : "Bewertung schreiben"}
      </h3>

      <div className="bewertungsformular__feld">
        <span className="bewertungsformular__beschriftung">Deine Sterne</span>
        <StarRatingInput value={rating} onChange={setRating} />
      </div>

      <label className="bewertungsformular__feld">
        <span className="bewertungsformular__beschriftung">Dein Kommentar</span>
        <textarea
          className="bewertungsformular__textfeld"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          placeholder="Wie hat dir das Produkt geschmeckt?"
          maxLength={600}
          required
        />
      </label>

      {error && <ErrorMessage message={error} className="bewertungsformular__fehler" />}
      {status && (
        <p className="bewertungsformular__status" role="status" aria-live="polite">
          {status}
        </p>
      )}

      <Button type="submit" className="bewertungsformular__absenden">
        {existingReview ? "Bewertung aktualisieren" : "Bewertung absenden"}
      </Button>
    </form>
  );
}

//AI-Tool - siehe AI-Tool Doku - 
