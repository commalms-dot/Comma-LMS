import React from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
	progress: number | string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
	return (
		<div className={styles.progressBarContainer}>
			<div className={styles.progressWrapper}>
				<div className={styles.progressBar}>
					<div
						className={styles.progress}
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>
			<div className={styles.progressText}>
				<span>{progress}%</span> Complete
			</div>
		</div>
	);
};

export default ProgressBar;
