import React from "react";
import "../styles/Note.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    const today = new Date();

    const dateRange = [...Array(7)].map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    });

    const handleNoteUpdate = () => {

    }

    return (
        <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-start-date">{note.start_date}</p>
            <p className="note-end-date">{note.end_date}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
            <button className="delete-button" onClick={handleNoteUpdate}>Update</button>
            {/* checkbox to  */}
        </div>
    );
}

export default Note