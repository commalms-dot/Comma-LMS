import React from "react";
// import Review from "@/types/Review";
import styles from "./UserReviewList.module.css";
// import UserReviewCard from "../UserReviewCard/UserReviewCard";

type Props = {
	category: string;
};

async function UserReviewList({ category }: Props) {
	const delay = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	await delay(500);
	// const reviewsResponse = await fetch(
	// 	`${process.env.NEXT_PUBLIC_API_URL}reviews?categories=${category}`
	// );
	// const reviews: Review[] = await reviewsResponse.json();

	return (
		<article className={styles["list"]}>
			{/* {reviews.map((review, index) => (
				<UserReviewCard key={index} review={review} />
			))} */}
		</article>
	);
}

export default UserReviewList;
