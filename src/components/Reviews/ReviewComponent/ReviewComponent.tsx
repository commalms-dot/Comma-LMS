import React from "react";
import UserAvatarCard from "@/components/User/UserAvatarCard/UserAvatarCard";
import { CourseReview } from "@/types/Review";
import "./ReviewComponent.css";

export interface ReviewComponentProps {
  review: CourseReview;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ review }) => {
  return (
    <div className="review-item">
      <UserAvatarCard
        user={review.user}
        withRating={true}
        rating={review.rating}
      />
      <div>{review.text}</div>
    </div>
  );
};

export default ReviewComponent;
