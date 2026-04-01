import React from "react";
import RatingProgressBar from "@/components/ui/RatingProgressBar/RatingProgressBar";
import styles from "./CourseFeedback.module.css";
import StarRatingSummary from "@/components/ui/StarRatingSummary/StarRatingSummary";

interface CourseFeedbackProps {
  totalReviews?: number;
  oneStarCount?: number;
  twoStarCount?: number;
  threeStarCount?: number;
  fourStarCount?: number;
  fiveStarCount?: number;
  overallRating?: string;
}

const CourseFeedback: React.FC<CourseFeedbackProps> = ({
  totalReviews = 0,
  oneStarCount = 0,
  twoStarCount = 0,
  threeStarCount = 0,
  fourStarCount = 0,
  fiveStarCount = 0,
  overallRating = "0",
}) => {
  return (
    <div className={styles["course-feedback"]}>
      {/* Star rating */}
      <div className={styles["course-feedback__rating"]}>
        <div className={styles["course-feedback__star-rating"]}>
          <StarRatingSummary
            rating={parseFloat(overallRating)}
            reviewsCount={totalReviews}
          />
          <span>{`${overallRating} out of 5`}</span>
        </div>
        {/* <div>{totalReviews} ratings</div> */}
      </div>
      {/* RatingProgressBar */}
      <div className={styles["course-feedback__rating"]}>
        <RatingProgressBar
          totalReviews={totalReviews}
          ratingCount={fiveStarCount}
          index={5}
        />
        <RatingProgressBar
          totalReviews={totalReviews}
          ratingCount={fourStarCount}
          index={4}
        />
        <RatingProgressBar
          totalReviews={totalReviews}
          ratingCount={threeStarCount}
          index={3}
        />
        <RatingProgressBar
          totalReviews={totalReviews}
          ratingCount={twoStarCount}
          index={2}
        />
        <RatingProgressBar
          totalReviews={totalReviews}
          ratingCount={oneStarCount}
          index={1}
        />
      </div>
    </div>
  );
};

export default CourseFeedback;
