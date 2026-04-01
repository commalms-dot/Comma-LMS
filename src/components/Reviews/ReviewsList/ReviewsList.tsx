import React from "react";
import ReviewComponent from "../ReviewComponent/ReviewComponent";
import { CourseReview } from "@/types/Review";
import "./ReviewsList.css";

interface ReviewsListProps {
	reviews: CourseReview[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
	return (
		<div className="reviews-list">
			{reviews.map((review, index) => {
				return <ReviewComponent key={index} review={review} />;
			})}
		</div>
	);
};

export default ReviewsList;