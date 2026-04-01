import Image from "next/image";
import styles from "./BannerReviewCard.module.css";
import { CSSProperties } from "react";
export default function BannerReviewCard({ style }: { style?: CSSProperties }) {
	return (
		<div className={styles["container"]} style={style}>
			<Image
				className={styles["image"]}
				width={40}
				height={40}
				src="/images/person.png"
				alt="user"
			/>
			<p className={styles["review"]}>
				Amazing Learning journey with amazing instructors.
			</p>
		</div>
	);
}
