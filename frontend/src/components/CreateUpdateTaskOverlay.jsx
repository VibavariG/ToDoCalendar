import { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import "../styles/Overlay.css";

function CreateUpdateTaskOverlay({ closeOverlay, getNotes, isOverlayOpen, task }) {
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    frequency: "one-time",
    start_date: "",
    end_date: ""
  });

  useEffect(() => {
    if (task) {
      setNoteData({
        title: task.title,
        content: task.content,
        frequency: task.frequency,
        start_date: task.start_date,
        end_date: task.end_date
      });
    } else {
      setNoteData({
        title: "",
        content: "",
        frequency: "one-time",
        start_date: "",
        end_date: ""
      });
    }
  }, [task]);

  return (
    <div>
      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-button" onClick={closeOverlay}>X</button>
            <h2>{task ? "Update Task" : "Create Task"}</h2>
            <NoteForm 
              getNotes={getNotes} 
              closeOverlay={closeOverlay}
              noteData={noteData}
              isUpdate={!!task}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateUpdateTaskOverlay;
