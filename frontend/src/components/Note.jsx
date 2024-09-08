import React from "react";
import { useState } from "react";
import "../styles/Note.css"
import CreateUpdateTaskOverlay from '../components/CreateUpdateTaskOverlay';

function Note({ note, onDelete, getNotes }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const openOverlay = () => {
        setIsOverlayOpen(true);
    };

    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };

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
            <button className="update-button" onClick={openOverlay}>Update</button>
            <CreateUpdateTaskOverlay closeOverlay={closeOverlay} getNotes={getNotes} isOverlayOpen={isOverlayOpen} task={note}/>
        </div>
    );
}

export default Note