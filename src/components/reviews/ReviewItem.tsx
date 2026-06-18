import { Button } from "../Button";
import { StarRating } from "./StarRating";
import { formatReviewDate, type Review } from "../../reviewStore";
import { getUserInitials } from "../../authStore";

interface ReviewItemProps {
  review: Review;
  canDelete?: boolean;
  onDelete?: (review: Review) => void;
}

export function ReviewItem({ review, canDelete = false, onDelete }: ReviewItemProps) {
  return (
    <article className="review-item">
      <div className="review-item__header">
        <span className="review-item__avatar" aria-hidden="true">
          {getUserInitials(review.userName)}
        </span>
        <div className="review-item__meta">
          <strong className="review-item__author">{review.userName}</strong>
          <time className="review-item__date" dateTime={review.createdAt}>
            {formatReviewDate(review.createdAt)}
          </time>
        </div>
        <StarRating rating={review.rating} size="small" className="review-item__stars" />
      </div>

      {review.text && <p className="review-item__text">{review.text}</p>}

      {canDelete && (
        <Button
          type="button"
          variant="unstyled"
          className="review-item__delete"
          onClick={() => onDelete?.(review)}
        >
          Meine Bewertung löschen
        </Button>
      )}
    </article>
  );
}
