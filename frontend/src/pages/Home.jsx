import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState('one-time');

  useEffect(() => {
    getNotes();
  }, []);

  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value);
  };

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

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          setTitle("")
          setContent("")
          alert("Note created!");
        }
        else alert("Failed to create note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>

      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        {/* add radio button for one time or recurring */}
        <label htmlFor="frequency">Frequency:</label>
        <div className="radio-container">
          <div className="radio-option">
            <input className="radio-btn" type="radio" id="one-time" name="frequency" value="one-time" checked={frequency === 'one-time'} onChange={handleFrequencyChange}/>
            <label className="radio-label" htmlFor="one-time">One-time</label>
          </div>
          <div className="radio-option">
            <input className="radio-btn" type="radio" id="recurring" name="frequency" value="recurring" checked={frequency === 'recurring'} onChange={handleFrequencyChange}/>
            <label className="radio-label" htmlFor="recurring">Recurring</label>
          </div>
        </div>

        {/* Conditional rendering based on the selected frequency */}
        {frequency === 'one-time' && (
          <div>
            <label htmlFor="deadline-date">Deadline Date:</label>
            <input
              type="date"
              id="deadline-date"
              name="deadline-date"
            />
          </div>
        )}

        {frequency === 'recurring' && (
          <div>
            <label htmlFor="start-date">Start Date:</label>
            <input
              type="date"
              id="start-date"
              name="start-date"
            />
            <label htmlFor="end-date">End Date:</label>
            <input
              type="date"
              id="end-date"
              name="end-date"
            />
          </div>
        )}
        
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
