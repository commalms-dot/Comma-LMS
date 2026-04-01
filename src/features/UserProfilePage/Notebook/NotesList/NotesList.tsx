import React from "react";
import Collapsible from "@/components/Collapsible/Collapsible";
import styles from "./NotesList.module.css";
import { UserNotes } from "@/types/UserNotes";

interface NotesListProps {
	notesList: UserNotes;
}

const NotesList: React.FC<NotesListProps> = ({ notesList }) => {
	return (
		<Collapsible
			title={notesList.course.title}
			subtitle={notesList.author.name}
		>
			<div className={styles["notes-list__container"]}>
				{/* Course image */}
				<div className={styles["notes-list__course-image"]}>
					<img
						src={notesList.course.posterUrl}
						alt="course image"
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: "100%", height: "auto" }}
					/>
				</div>
				{/* Title */}
				<div className={styles["notes-list__title"]}>
					<p>Notes:</p>
				</div>
				{/* Notes list */}
				<ul className={styles["notes-list"]}>
					{notesList.notes.map((note, index) => {
						return (
							<li key={index} className={styles["notes-list__item"]}>
								<div className={styles["notes-list__item-text"]}>
									<p>{note.text}</p>
								</div>
								<div className={styles["notes-list__item-date"]}>
									<span>{note.time}</span>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</Collapsible>
	);
};

export default NotesList;
