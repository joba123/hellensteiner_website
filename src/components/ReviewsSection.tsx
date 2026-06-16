import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { StarRating } from "./StarRating";
import { useAuth } from "../authStore";
import { getAverageRating, removeReview, useReviews, type Review } from "../reviewStore";

interface ReviewsSectionProps {
  productId: string;
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  const reviews = useReviews(productId);
  const { currentUser } = useAuth();
  const averageRating = getAverageRating(reviews);
  const reviewCount = reviews.length;
  const existingReview = currentUser
    ? reviews.find((review) => review.userEmail === currentUser.email && review.id.startsWith("user-"))
    : undefined;

  function handleDelete(review: Review) {
    if (currentUser) {
      removeReview(review.id, currentUser.email);
    }
  }

  return (
    <section className="product-reviews" aria-labelledby="product-reviews-title">
      <div className="product-reviews__header">
        <h2 id="product-reviews-title">Bewertungen</h2>
        {reviewCount > 0 && (
          <div className="product-reviews__summary">
            <StarRating rating={averageRating} ariaLabel={`Durchschnitt ${averageRating.toFixed(1)} von 5 Sternen`} />
            <strong>{averageRating.toFixed(1)}</strong>
            <span>
              ({reviewCount} {reviewCount === 1 ? "Bewertung" : "Bewertungen"})
            </span>
          </div>
        )}
      </div>

      <div className="product-reviews__layout">
        <ReviewList
          reviews={reviews}
          currentUserEmail={currentUser?.email ?? null}
          onDelete={handleDelete}
        />

        {currentUser ? (
          <ReviewForm productId={productId} user={currentUser} existingReview={existingReview} />
        ) : (
          <div className="product-reviews__login-hint">
            <h3>Eigene Bewertung abgeben</h3>
            <p>Bitte melde dich an, um dieses Produkt zu bewerten.</p>
            <p className="product-reviews__login-note">
              Nutze den Anmelden-Button oben rechts, um dich einzuloggen.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
