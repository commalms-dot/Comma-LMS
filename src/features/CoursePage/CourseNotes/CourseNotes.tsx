import React, { useState } from "react";
import { PiPlusCircleFill as PlusIcon } from "react-icons/pi";
import InputEditor from "@/components/InputEditor/InputEditor";
import Button from "@/components/ui/Button/Button";
import DurationBadge from "@/components/ui/DurationBadge/DurationBadge";
import {
	useAddNoteMutation,
	useUpdateNoteMutation,
	useDeleteNoteMutation,
	useGetNotesQuery,
} from "@/services/notes.service";
import NotesList from "@/components/Notes/NotesList/NotesList";
import "./CourseNotes.css";

interface CourseNotesProps {
	chapterId: number;
	userId?: number;
	currentTimestamp: string;
	pauseVideo: () => void;
}

const CourseNotes: React.FC<CourseNotesProps> = ({
	chapterId,
	userId,
	currentTimestamp,
	pauseVideo,
}) => {
	const [isEditorVisible, setEditorVisible] = useState(false);
	const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
	const [page, setPage] = useState(1);

	const { data: notesData, isLoading } = useGetNotesQuery({
		chapterId: chapterId,
		userId: userId,
		page,
		limit: 10,
	});

	const [addNote] = useAddNoteMutation();
	const [updateNote] = useUpdateNoteMutation();
	const [deleteNote] = useDeleteNoteMutation();

	const toggleCreateNote = () => {
		setEditorVisible(!isEditorVisible);
		setSelectedNoteId(null);
		pauseVideo();
	};

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const handleSubmit = async (content: string) => {
		try {
			if (selectedNoteId) {
				await updateNote({
					id: selectedNoteId,
					updatedNote: { content, timestamp: currentTimestamp },
				});
			} else {
				await addNote({
					content,
					timestamp: currentTimestamp,
					chapterId: chapterId,
					userId: userId,
				});
			}
			toggleCreateNote();
		} catch (error) {
			console.error("Failed to save the note:", error);
		}
	};

	const handleDeleteNote = async (noteId: string) => {
		try {
			await deleteNote(noteId);
		} catch (error) {
			console.error("Failed to delete the note:", error);
		}
	};

	const handleEditNote = async (noteId: string, content: string) => {
		try {
			await updateNote({
				id: noteId,
				updatedNote: { content, timestamp: currentTimestamp },
			});
			setSelectedNoteId(null);
		} catch (error) {
			console.error("Failed to edit the note:", error);
		}
	};

	return (
		<div className="course--tab-content">
			{!isEditorVisible ? (
				<div className="create-bookmark__container">
					<div className="create-bookmark__container">
						<Button
							type="button"
							variant="transparent"
							size="full"
							className="create-bookmark__button"
							onClick={toggleCreateNote}
						>
							<span className="create-bookmark__button__content">
								<span>
									Create a new note at{" "}
									<span data-purpose="create-bookmark-current-time">
										{currentTimestamp}
									</span>
								</span>
								<PlusIcon fill="black" size={20} />
							</span>
						</Button>
					</div>
				</div>
			) : (
				<div className="create-bookmark__input">
					<DurationBadge duration={currentTimestamp} />
					<InputEditor onCancel={toggleCreateNote} onSubmit={handleSubmit} />
				</div>
			)}
			<div>
				<NotesList
					notes={notesData?.data || []}
					handleDeleteNote={handleDeleteNote}
					handleEditNote={handleEditNote}
				/>
				{notesData?.totalPages && page < notesData.totalPages ? (
					<Button
						variant="transparent"
						className="load-more-btn"
						isLoading={isLoading}
						onClick={handleLoadMore}
					>
						See More Notes
					</Button>
				) : null}
			</div>
		</div>
	);
};

export default CourseNotes;
