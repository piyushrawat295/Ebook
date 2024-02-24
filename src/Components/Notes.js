import React, { useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
  const context = React.useContext(NoteContext);
  const { notes, getNote, editNote } = context;

  useEffect(() => {
    return () => {
      getNote()
      // eslint-disable-next-line
    };
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "default" })

    const handleClick = (e) => {
      console.log("updating the note..", note)
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click();

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
      ref.current.click();
      setNote({
          id: currentNote._id,
          etitle: currentNote.title,
          edescription: currentNote.description,
          etag: currentNote.tag
      });
  }

  return (
    <>
      <Addnote />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="form my-3">
                <div className="mb-3 input-container">
                  
                  <input type="text" className="inputmodal" id="etitle" name="etitle" value={note.etitle} placeholder="TITLE" minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">                 
                  <textarea className="inputmodal" id="edescription" name="edescription" value={note.edescription} placeholder="DESCRIPTION" minLength={5} required onChange={onChange} rows="5"></textarea>
                </div>
                <div className="mb-3 input-container">                 
                  <input type="text" className="inputmodal" id="etag" name="etag" value={note.etag} placeholder="TAG" onChange={onChange} />
                </div>          
              </form>

            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="button-74" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="button-74">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        {notes.map((note) => {
        
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
          
        })}
      </div>
    </>

  );
}

export default Notes;
