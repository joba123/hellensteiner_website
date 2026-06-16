import { ReviewItem } from "./ReviewItem";
import type { Review } from "../reviewStore";

interface ReviewListProps {
  reviews: readonly Review[];
  currentUserEmail?: string | null;
  onDelete?: (review: Review) => void;
}

export function ReviewList({ reviews, currentUserEmail, onDelete }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="review-list__empty">Für dieses Produkt gibt es noch keine Bewertungen.</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          canDelete={Boolean(currentUserEmail) && review.userEmail === currentUserEmail}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
