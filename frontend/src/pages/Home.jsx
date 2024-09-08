import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"
import CreateUpdateTaskOverlay from '../components/CreateUpdateTaskOverlay';
import "../styles/Overlay.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [openPanels, setOpenPanels] = useState({});
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const groupNotesByDate = () => {
    return notes.reduce((grouped, note) => {
      const date = note.end_date;
      if(!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(note);
      return grouped;
    }, {});
  };

  const groupedNotes = groupNotesByDate();

  const togglePanel = (date) => {
    setOpenPanels((prevState) => ({
      ...prevState,
      [date]: !prevState[date],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); 
    const day = date.getDate(); 

    const ordinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      month: "short",
      year: "numeric",
      weekday: "long",
    }).format(date);
    return `${day}${ordinalSuffix(day)} ${formattedDate}`; // Example: 6th Sept, 2024, Friday
  };
  
  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };


  return (
    // to-do: render a navbar component
    // to-do: render a display notes by date component on one half of the page
    <div>
      <button onClick={openOverlay}>Create Task</button>
      <CreateUpdateTaskOverlay closeOverlay={closeOverlay} getNotes={getNotes} isOverlayOpen={isOverlayOpen} />
      <div>
        <h2>Notes</h2>
        {Object.keys(groupedNotes).sort().map((date) => (
          <div key={date} className="collapsible-panel">
            <div className="panel-header" onClick={() => togglePanel(date)}>
              <h3>{date}</h3>
              <button>
                {openPanels[date] ? "Collapse" : "Expand"}
              </button>
            </div>
            {openPanels[date] && (
              <div className="panel-content">
                {groupedNotes[date].map((note) => (
                  <Note note={note} onDelete={deleteNote} key={note.id} getNotes={getNotes} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;