"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthUser } from "@/hooks/useAuthUser";
import styles from "./CourseNotesSection.module.css";

interface Note {
  id: number;
  content: string;
  timestamp: string;
  videoId: number;
  userId: number;
}

interface Props {
  videoId: number;
  currentTimestamp?: string;
}

const CourseNotesSection: React.FC<Props> = ({ videoId, currentTimestamp }) => {
  const { isAuthenticated, authUser, token } = useAuthUser();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  // Fetch notes for this video & user
  const fetchNotes = async () => {
    if (!authUser) return;
    try {
      const res = await axios.get(`${BASE_URL}/notes?videoId=${videoId}&userId=${authUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchNotes();
  }, [isAuthenticated, videoId]);

  // Add new note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/notes`,
        {
          content: newNote,
          timestamp: currentTimestamp || new Date().toISOString(),
          videoId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewNote("");
      await fetchNotes();
    } catch (err) {
      console.error("Error adding note:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update existing note
  const handleUpdateNote = async (id: number, content: string) => {
    try {
      await axios.put(
        `${BASE_URL}/notes/${id}`,
        {
          content,
          timestamp: new Date().toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingNoteId(null);
      await fetchNotes();
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  // Delete note
  const handleDeleteNote = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.notLoggedIn}>
        <p>🔒 Sign in to add and view your personal notes.</p>
      </div>
    );
  }

  return (
    <div className={styles.notesSection}>
      <h3 className={styles.title}>📝 My Notes</h3>
      <div className={styles.addNote}>
        <textarea
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={handleAddNote} disabled={loading}>
          {loading ? "Saving..." : "Add Note"}
        </button>
      </div>

      <div className={styles.notesList}>
        {notes.length === 0 ? (
          <p className={styles.noNotes}>No notes yet for this video.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className={styles.noteItem}>
              {editingNoteId === note.id ? (
                <textarea
                  defaultValue={note.content}
                  onBlur={(e) => handleUpdateNote(note.id, e.target.value)}
                  autoFocus
                />
              ) : (
                <p>{note.content}</p>
              )}
              <div className={styles.noteActions}>
                <span className={styles.timestamp}>{note.timestamp}</span>
                <button onClick={() => setEditingNoteId(note.id)}>Edit</button>
                <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseNotesSection;
