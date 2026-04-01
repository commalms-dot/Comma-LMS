"use client";
import React, { useState } from "react";
import styles from "./Notes.module.css";

export default function Notes({ notes }: any) {
  const [filterCourse, setFilterCourse] = useState<number | "all">("all");
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [editedText, setEditedText] = useState("");

  const handleOpenNote = (note: any) => {
    setSelectedNote(note);
    setEditedText(note.text);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  const handleSave = () => {
    // Here you could later call an API to update note
    alert(`Note updated: ${editedText}`);
    handleCloseModal();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>My Notes</h3>
        <div>
          <select
            className={styles.select}
            value={filterCourse}
            onChange={(e) =>
              setFilterCourse(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
          >
            <option value="all">All courses</option>
            {notes.map((c: any) => (
              <option key={c.courseId} value={c.courseId}>
                {c.courseTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.list}>
        {notes
          .filter((c: any) =>
            filterCourse === "all" ? true : c.courseId === filterCourse
          )
          .map((c: any) => (
            <div key={c.courseId} className={styles.courseBlock}>
              <div className={styles.courseTitle}>{c.courseTitle}</div>
              <div className={styles.noteList}>
                {c.notes.map((n: any) => (
                  <div
                    key={n.id}
                    className={styles.note}
                    onClick={() => handleOpenNote(n)}
                  >
                    <div className={styles.noteVideo}>{n.video}</div>
                    <div className={styles.noteText}>{n.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {selectedNote && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()} // prevent closing on modal click
          >
            <div className={styles.modalHeader}>
              <h3>Edit Note</h3>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.modalVideo}>
                <strong>Video:</strong> {selectedNote.video}
              </p>
              <textarea
                className={styles.textarea}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={handleCloseModal}>
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
