import React from 'react';
import NoteContext from '../context/notes/noteContext';
import '../App.css';
import { useState } from 'react';

const Addnote = () => {
    const context = React.useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
        <div className='container my-3'>
            <h1>Add a Note</h1>
            <form className="form my-3">
                <div className="mb-3 input-container">
                    {/* <label htmlFor="title" className="title">Title</label> */}
                    <input type="text" className="input" id="title" name="title" placeholder="TITLE" value={note.title} minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    {/* <label htmlFor="description" className="title">Description</label> */}
                    <textarea className="input" id="description" name="description" placeholder="DESCRIPTION" value={note.description} onChange={onChange} minLength={5} required rows="5"></textarea>
                </div>
                <div className="mb-3 input-container">
                    {/* <label htmlFor="title" className="title">Title</label> */}
                    <input type="text" className="input" id="tag" name="tag" placeholder="TAG" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="button-74" onClick={handleClick}>Add Note</button>
            </form>
        </div>
        <div className='Head mx-3'>
        <h1>Your Notes</h1>
         
        </div>
        
        </>
    );
}

export default Addnote;
