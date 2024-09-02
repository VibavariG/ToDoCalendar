import "../styles/Home.css"
import { useState } from "react";
import api from "../api";

function NoteForm( { getNotes }) {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [frequency, setFrequency] = useState('one-time');
    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Formats to 'YYYY-MM-DD'
    });
    const [endDate, setEndDate] = useState('');

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
        setStartDate(() => {
            const today = new Date();
            return today.toISOString().split('T')[0]; // Formats to 'YYYY-MM-DD'
        });
        setEndDate('');
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;

        if (name === 'deadline-date') {
            setStartDate(value)
            setEndDate(value)
        } else if (name === 'start-date') {
            setStartDate(value)
        } else if (name === 'end-date') {
            setEndDate(value)
        }

        console.log('Frequency:', frequency);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
    }

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

    return <form onSubmit={createNote}>
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
            value={startDate}
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
            value={startDate}
            onChange={handleDateChange}
            />
            <label htmlFor="end-date">End Date:</label>
            <input
            type="date"
            id="end-date"
            name="end-date"
            value={endDate}
            onChange={handleDateChange}
            />
        </div>
        )}
        
        <input type="submit" value="Submit"></input>
    </form>
}

export default NoteForm