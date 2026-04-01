import React from "react";
import Image from "next/image";
import styles from "./ExpertTrustSummary.module.css";

const ExpertTrustSummary: React.FC = () => {
	return (
		<div className={styles["expert-trust-summary"]}>
			<div className={styles["expert-images-container"]}>
				<Image
					src="/images/temp-user-1.jpeg"
					alt="Expert"
					className={`${styles["expert-image"]} ${styles["first-image"]}`}
					width={32}
					height={32}
					priority
				/>
				<Image
					src="/images/temp-user-2.jpeg"
					alt="Expert"
					className={`${styles["expert-image"]} ${styles["first-image"]}`}
					width={32}
					height={32}
					priority
				/>
				<Image
					src="/images/temp-user-3.jpeg"
					alt="Expert"
					className={`${styles["expert-image"]} ${styles["first-image"]}`}
					width={32}
					height={32}
					priority
				/>
				<Image
					src="/images/temp-user-4.jpeg"
					alt="Expert"
					className={`${styles["expert-image"]} ${styles["first-image"]}`}
					width={32}
					height={32}
					priority
				/>
				<Image
					src="/images/temp-user-5.jpeg"
					alt="Expert"
					className={`${styles["expert-image"]} ${styles["first-image"]}`}
					width={32}
					height={32}
					priority
				/>
				<span className={styles["expert-counter"]}>+99</span>
			</div>
			<p className={styles["expert-text"]}>Expert trust summary</p>
		</div>
	);
};

export default ExpertTrustSummary;
