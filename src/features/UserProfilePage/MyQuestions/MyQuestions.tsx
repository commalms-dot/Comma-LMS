import React from "react";
import styles from "./MyQuestions.module.css";

const MyQuestions = () => {
	return (
		<div className={styles["my-questions"]}>
			<div className={styles["my-questions__header"]}>
				<h2>My Questions</h2>
			</div>
			<div className={styles["my-questions__content"]}>My Questions</div>
		</div>
	);
};

export default MyQuestions;
