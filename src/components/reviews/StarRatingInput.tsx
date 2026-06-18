import { useState } from "react";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  name?: string;
}

const STAR_VALUES = [1, 2, 3, 4, 5] as const;

export function StarRatingInput({ value, onChange, name = "rating" }: StarRatingInputProps) {
  const [hoverValue, setHoverValue] = useState(0);
  const activeValue = hoverValue || value;

  return (
    <span className="star-rating-input" role="radiogroup" aria-label="Sterne-Bewertung">
      {STAR_VALUES.map((star) => (
        <button
          key={star}
          type="button"
          name={name}
          className={star <= activeValue ? "star-rating-input__star is-active" : "star-rating-input__star"}
          aria-label={`${star} ${star === 1 ? "Stern" : "Sterne"}`}
          aria-pressed={star === value}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          onFocus={() => setHoverValue(star)}
          onBlur={() => setHoverValue(0)}
          onClick={() => onChange(star)}
        >
          ★
        </button>
      ))}
    </span>
  );
}
