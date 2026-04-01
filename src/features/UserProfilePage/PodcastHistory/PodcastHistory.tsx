import React from "react";
import styles from "./PodcastHistory.module.css";

const PodcastHistory = () => {
	return (
		<div className={styles["podcast-history"]}>
			<div className={styles["podcast-history__header"]}>
				<p>Podcast History</p>
			</div>
			<div className={styles["podcast-history__content"]}>Podcast History</div>
		</div>
	);
};

export default PodcastHistory;
