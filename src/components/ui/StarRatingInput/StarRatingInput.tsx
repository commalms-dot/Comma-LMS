import React, { useState } from "react";
import styles from "./StarRatingInput.module.css";

interface StarRatingInputProps {
	rating: number;
	onRatingChange: (rating: number) => void;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ rating, onRatingChange }) => {
	const [hoverRating, setHoverRating] = useState<number>(0);

	const handleMouseEnter = (index: number) => {
		setHoverRating(index);
	};

	const handleMouseLeave = () => {
		setHoverRating(0);
	};

	const handleClick = (index: number) => {
		onRatingChange(index);
	};

	return (
		<div className={styles["star-rating"]}>
			{[1, 2, 3, 4, 5].map((index) => (
				<span
					key={index}
					className={`${styles.star} ${index <= (hoverRating || rating) ? styles.filled : ""}`}
					onMouseEnter={() => handleMouseEnter(index)}
					onMouseLeave={handleMouseLeave}
					onClick={() => handleClick(index)}
				>
					★
				</span>
			))}
		</div>
	);
};

export default StarRatingInput;

