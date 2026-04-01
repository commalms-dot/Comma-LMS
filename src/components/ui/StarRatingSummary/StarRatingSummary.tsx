import React from "react";
import StarRating from "../StarRating/StarRating";
import styles from "./StarRatingSummary.module.css";

interface StarRatingSummaryProps {
  rating: number;
  reviewsCount: number;
  className?: string;
}

const StarRatingSummary: React.FC<StarRatingSummaryProps> = ({
  rating,
  reviewsCount,
  className,
}) => {
  return (
    <div className={`${styles["star-rating-summary"]} ${className || ""}`}>
      <div className={styles.ratingWrapper}>
        <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
        <StarRating rating={rating} />
      </div>
      <span className={styles.reviewCount}>{reviewsCount} reviews</span>
    </div>
  );
};

export default StarRatingSummary;
