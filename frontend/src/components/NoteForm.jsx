import "../styles/Home.css"
import { useState, useEffect } from "react";
import api from "../api";

function NoteForm( { getNotes, noteData, isUpdate, closeOverlay }) {
    const today = new Date().toISOString().split('T')[0];

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [frequency, setFrequency] = useState('one-time');
    const [start_date, setStartDate] = useState(today);
    const [end_date, setEndDate] = useState(today);

    useEffect(() => {
        // Prepopulate the form if it's an update
        if (isUpdate && noteData) {
          setTitle(noteData.title);
          setContent(noteData.content);
          setFrequency(noteData.frequency);
          setStartDate(noteData.start_date);
          setEndDate(noteData.end_date);
        }
    }, [isUpdate, noteData]);

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
        setStartDate(today);
        setEndDate(today);
    };

    const handleDateChange = (e) => {
        const { name, newDate } = e.target;

        if (name === 'deadline-date') {
            setStartDate(newDate)
            setEndDate(newDate)
        } else if (name === 'start-date') {
            setStartDate(newDate)
        } else if (name === 'end-date') {
            setEndDate(newDate)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = { content, title, frequency, start_date, end_date };

        if(isUpdate) {
            api
            .put(`/api/notes/${noteData.id}/`, payload)
            .then((res) => {
                if (res.status === 200) {
                    alert("Note updated!");
                } else {
                    alert("Failed to update note.");
                }
                getNotes();
                closeOverlay();
            })
            .catch((err) => alert(err));
        } else {
            api
            .post("/api/notes/", payload)
            .then((res) => {
                if (res.status === 201) {
                    alert("Note created!");
                    setTitle("")
                    setContent("")
                    setFrequency("one-time");
                    setStartDate(today);
                    setEndDate(today);
                }
                else alert("Failed to create note.");
                getNotes();
                closeOverlay();
            })
            .catch((err) => alert(err));
        }
    }

    return <form onSubmit={handleSubmit}>
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
            value={end_date}
            onChange={handleDateChange}
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
            value={start_date}
            onChange={handleDateChange}
            />
            <label htmlFor="end-date">End Date:</label>
            <input
            type="date"
            id="end-date"
            name="end-date"
            value={end_date}
            onChange={handleDateChange}
            />
        </div>
        )}
        
        <input type="submit" value={isUpdate ? "Save" : "Create Task"}></input>
    </form>
}

export default NoteForm