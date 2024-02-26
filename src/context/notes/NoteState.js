import React, { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = ({ children }) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNote();
    // eslint-disable-next-line
  }, []);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const getNote = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": getToken()
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": getToken()
        },
        body: JSON.stringify({ title, description, tag })
      });
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      console.log("Adding new note");
      const note = await response.json();
      setNotes([...notes, note]);
    } catch (error) {
      console.error('Error adding note:', error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": getToken()
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      console.log("Deleting the note with id " + id);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": getToken()
        },
        body: JSON.stringify({ title, description, tag })
      });
      if (!response.ok) {
        throw new Error('Failed to edit note');
      }
      console.log("Editing the note with id " + id);
      setNotes(notes.map(note => note._id === id ? { ...note, title, description, tag } : note));
    } catch (error) {
      console.error('Error editing note:', error.message);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
