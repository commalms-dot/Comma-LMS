import React from "react";
import styles from "./Notebook.module.css";
import NotesList from "./NotesList/NotesList";

const Notebook = () => {
	// Fetch user notes
	const userNotesData: any[] = [];

	return (
		<div className={styles["my-courses"]}>
			<div className={styles["my-courses__header"]}>
				<h2>Notebook</h2>
				<p>Check the most important points in your learning journey!</p>
			</div>
			<div className={styles["my-courses__content"]}></div>
		</div>
	);
};

export default Notebook;
