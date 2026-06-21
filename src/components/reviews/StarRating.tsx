//AI-Tool - siehe AI-Tool Doku - 

interface StarRatingProps {
  rating: number;
  size?: "small" | "medium" | "large";
  className?: string;
  ariaLabel?: string;
}

const STAR_VALUES = [1, 2, 3, 4, 5] as const;

export function StarRating({ rating, size = "medium", className, ariaLabel }: StarRatingProps) {
  const roundedRating = Math.round(rating);
  const starClassName = ["sternebewertung", `star-rating--${size}`, className].filter(Boolean).join(" ");
  const label = ariaLabel ?? `Bewertung: ${roundedRating} von 5 Sternen`;

  return (
    <span className={starClassName} role="img" aria-label={label}>
      {STAR_VALUES.map((value) => (
        <span
          key={value}
          aria-hidden="true"
          className={value <= roundedRating ? "sternebewertung__stern ist-ausgefuellt" : "sternebewertung__stern"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

//AI-Tool - siehe AI-Tool Doku - 
