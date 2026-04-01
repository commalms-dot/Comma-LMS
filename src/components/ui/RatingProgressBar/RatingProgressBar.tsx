import React from "react";
import styles from "./RatingProgressBar.module.css";

interface RatingProgressBarProps {
	ratingCount: number;
	totalReviews: number;
	index: number;
}

const RatingProgressBar: React.FC<RatingProgressBarProps> = ({
	ratingCount,
	totalReviews,
	index,
}) => {
	const percentage = (ratingCount / totalReviews) * 100;

	return (
		<div className={styles["rating-progress-bar-container"]}>
			<span className={styles["rating-progress-bar__label"]}>{index} Star</span>
			<div className={styles["rating-progress-bar"]}>
				<div
					className={styles["rating-progress-bar__progress"]}
					style={{ width: `${percentage}%` }}
					aria-label={`Rating ${ratingCount} out of ${totalReviews}`}
					role="progressbar"
					aria-valuemin={0}
					aria-valuemax={totalReviews}
					aria-valuenow={ratingCount}
				></div>
			</div>
		</div>
	);
};

export default RatingProgressBar;
