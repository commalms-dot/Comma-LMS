import React from "react";
import styles from "./UserReviewCard.module.css";
import UserAvatarCard from "@/components/User/UserAvatarCard/UserAvatarCard";
import { UserReview } from "@/types/Review";

interface UserReviewCardProps {
	review: UserReview;
}

const UserReviewCard: React.FC<UserReviewCardProps> = ({ review }) => {
	return (
		<section className={styles["user-review"]}>
			<div className={styles["upper"]}>
				<UserAvatarCard user={review.reviewee} />
				<p className={styles["review-content"]}>{review.text}</p>
			</div>

			<hr className={styles["separator"]} />
			<div className={styles["lower"]}>
				<UserAvatarCard user={review.reviewer} />
			</div>
		</section>
	);
};

export default UserReviewCard;
