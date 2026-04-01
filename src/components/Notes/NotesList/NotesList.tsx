import React from "react";
import NoteItem from "../NoteItem/NoteItem";
import { Note } from "@/types/Note";
import styles from "./NotesList.module.css";

interface ReviewsListProps {
	notes: Note[];
	handleEditNote: (noteId: string, content: string) => void;
	handleDeleteNote: (noteId: string) => void;
}

const NotesList: React.FC<ReviewsListProps> = ({
	notes,
	handleEditNote,
	handleDeleteNote,
}) => {
	return (
		<div className={styles["notes-list"]}>
			{notes?.map((note, index) => {
				return (
					<NoteItem
						key={index}
						note={note}
						onDelete={handleDeleteNote}
						onEdit={handleEditNote}
					/>
				);
			})}
		</div>
	);
};

export default NotesList;

