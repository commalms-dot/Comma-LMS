import React, { useEffect, useRef } from "react";
import { Note } from "@/types/Note";
// import { MdDelete as DeleteIcon, MdEdit as EditIcon } from "react-icons/md";
import DurationBadge from "@/components/ui/DurationBadge/DurationBadge";
import styles from "./NoteItem.module.css";

interface NoteItemProps {
	note: Note;
	onDelete: (noteId: string) => void;
	onEdit: (noteId: string, content: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({
	note: { timestamp, content, id },
	onDelete,
	onEdit,
}) => {
	const [isEditing, setIsEditing] = React.useState(false);
	const [editedContent, setEditedContent] = React.useState(content);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleEditClick = () => setIsEditing(true);

	const handleSaveClick = () => {
		setIsEditing(false);
		onEdit(id, editedContent);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		setEditedContent(content);
	};

	const handleDeleteClick = () => {
		onDelete(id);
	};

	useEffect(() => {
		const adjustTextareaHeight = () => {
			if (textareaRef.current) {
				textareaRef.current.style.height = "auto";
				textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
			}
		};
		
		if (isEditing) {
			adjustTextareaHeight();
		}
	}, [editedContent, isEditing]);

	return (
		<div className={styles["note-item__container"]}>
			{/* Note item header */}
			<div className={styles["note-item__header"]}>
				<DurationBadge duration={timestamp} />
				<div
					className={`${styles["note-item__actions"]} ${isEditing ? styles["editing"] : ""}`}
				>
					{isEditing ? (
						<>
							<button onClick={handleSaveClick}>Save</button>
							<button onClick={handleCancelClick}>Cancel</button>
						</>
					) : (
						<>
							<button onClick={handleDeleteClick}>Delete</button>
							<button onClick={handleEditClick}>Edit</button>
						</>
					)}
				</div>
			</div>
			{/* Note item content */}
			<div className={styles["note-item"]}>
				{isEditing ? (
					<textarea
						ref={textareaRef}
						className={styles["note-item__textarea"]}
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
					/>
				) : (
					<div>{content}</div>
				)}
			</div>
		</div>
	);
};

export default NoteItem;

