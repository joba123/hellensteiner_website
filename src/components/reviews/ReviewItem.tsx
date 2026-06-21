//AI-Tool - siehe AI-Tool Doku - 

import { Button } from "../Button";
import { StarRating } from "./StarRating";
import { formatReviewDate, type Review } from "../../../assets/ts/reviewStore";
import { getUserInitials } from "../../../assets/ts/authStore";

interface ReviewItemProps {
  review: Review;
  canDelete?: boolean;
  onDelete?: (review: Review) => void;
}

export function ReviewItem({ review, canDelete = false, onDelete }: ReviewItemProps) {
  return (
    <article className="bewertung">
      <div className="bewertung__header">
        <span className="bewertung__avatar" aria-hidden="true">
          {getUserInitials(review.userName)}
        </span>
        <div className="bewertung__metadaten">
          <strong className="bewertung__autor">{review.userName}</strong>
          <time className="bewertung__datum" dateTime={review.createdAt}>
            {formatReviewDate(review.createdAt)}
          </time>
        </div>
        <StarRating rating={review.rating} size="small" className="review-item__stars" />
      </div>

      {review.text && <p className="bewertung__text">{review.text}</p>}

      {canDelete && (
        <Button
          type="button"
          variant="unstyled"
          className="bewertung__loeschen"
          onClick={() => onDelete?.(review)}
        >
          Meine Bewertung löschen
        </Button>
      )}
    </article>
  );
}

//AI-Tool - siehe AI-Tool Doku - 
