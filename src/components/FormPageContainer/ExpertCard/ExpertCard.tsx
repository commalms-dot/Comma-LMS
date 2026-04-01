import React from "react";
import Image from "next/image";
import styles from "./ExpertCard.module.css";

const ExpertCard: React.FC = () => {
	return (
		<div className={styles["expert-card"]}>
			<div className={styles["expert-card__description"]}>
				Using Lorem Ipsum is that it has a more-or-less normal distribution of
				letters, as opposed to using here, content here&apos;, making it look
				like readable English. tent here&apos;, making it look like readable
				English.
			</div>
			<div className={styles["expert-card__details"]}>
				<Image
					src="/images/temp-user-1.jpeg"
					alt="User image"
					width={40}
					height={40}
					priority
					className={styles["expert-card__details__avatar"]}
				/>
				<div className={styles["expert-card__details-info"]}>
					<h5 className={styles["expert-card__details-info__name"]}>
						Ahmed Youness
					</h5>
					<span className={styles["expert-card__details-info__role"]}>
						Civil Engineer at Oura
					</span>
				</div>
			</div>
		</div>
	);
};

export default ExpertCard;
