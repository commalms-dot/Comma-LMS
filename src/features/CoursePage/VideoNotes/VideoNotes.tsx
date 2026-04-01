import React, { useState } from "react";
import styles from "./VideoNotes.module.css";
import { VideoPlayerHandle } from "../VideoPlayer/VideoPlayer";

interface Note {
  time: string;
  chapterName: string;
  courseName: string;
  content: string;
}

interface VideoNotesProps {
  videoRef: React.RefObject<VideoPlayerHandle>; // ✅ updated
  chapterName: string;
  courseName: string;
}

const VideoNotes: React.FC<VideoNotesProps> = ({
  videoRef,
  chapterName,
  courseName,
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState("");

  const handleAddNote = () => {
    if (!noteText.trim()) return;

    // ✅ now TypeScript knows getCurrentTime exists
    const currentTime = videoRef.current?.getCurrentTime() || 0;

    const newNote: Note = {
      time: formatTime(currentTime),
      chapterName,
      courseName,
      content: noteText,
    };

    setNotes([newNote, ...notes]);
    setNoteText("");
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={styles.videoNotesContainer}>
      <h3 className={styles.notesTitle}>📓 Video Notes</h3>
      <div className={styles.notesInputWrapper}>
        <textarea
          className={styles.notesInput}
          placeholder="Write a note..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button className={styles.addNoteButton} onClick={handleAddNote}>
          Add Note
        </button>
      </div>

      <div className={styles.notesList}>
        {notes.length === 0 && (
          <p className={styles.emptyNotes}>No notes yet. Start taking notes!</p>
        )}
        {notes.map((note, index) => (
          <div className={styles.noteCard} key={index}>
            <div className={styles.noteTime}>{note.time}</div>
            <div className={styles.noteContent}>{note.content}</div>
            <div className={styles.noteMeta}>
              <span>{note.chapterName}</span> | <span>{note.courseName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoNotes;
