import React from "react";
import styles from "./StarRating.module.css";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Helper function to determine star type
  const getStarClass = (index: number) => {
    const roundedRating = Math.floor(rating);
    const fraction = rating - roundedRating;
    
    if (index <= roundedRating) return styles.filled;
    if (index === roundedRating + 1) {
      if (fraction > 0) {
        return fraction > 0.75 ? styles.full : fraction > 0.25 ? styles.half : styles.empty;
      }
    }
    return styles.empty;
  };

  return (
      <div className={styles["rating-stars"]}>
        {[1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            className={`${styles.star} ${getStarClass(index)}`}
          >
            ★
          </span>
        ))}
      </div>
  );
};

export default StarRating;
