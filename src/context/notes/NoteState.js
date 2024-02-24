import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = ({ children }) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const[notes, setNotes] = useState(notesInitial);


  const getNote = async()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMDZkYjU2MGI5MTY4ZWM0Yjc0MmEzIn0sImlhdCI6MTcwODE1ODM4OX0.CJe4WVJ6AJui6BOu1qRTDhStIxmQO2ix777my5AuBbc"
      }
    });
    const json = await response.json()
    setNotes(json)
  }


  const addNote = async(title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/addnote`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMDZkYjU2MGI5MTY4ZWM0Yjc0MmEzIn0sImlhdCI6MTcwODE1ODM4OX0.CJe4WVJ6AJui6BOu1qRTDhStIxmQO2ix777my5AuBbc"
      },
      body: JSON.stringify({title, description, tag})
    });
    console.log("Adding new note")
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  const deleteNote = async(id) =>{
    const response = await fetch(`${host}/api/notes/delete/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMDZkYjU2MGI5MTY4ZWM0Yjc0MmEzIn0sImlhdCI6MTcwODE1ODM4OX0.CJe4WVJ6AJui6BOu1qRTDhStIxmQO2ix777my5AuBbc"
      },
      
    });
    const json = response.json();
    


    console.log("Deleting the note with id "+id);
    const newNotes = notes.filter((note)=>
    {return note._id!==id}
    )
    setNotes(newNotes)
  }

  const editNote = async(id, title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/update/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMDZkYjU2MGI5MTY4ZWM0Yjc0MmEzIn0sImlhdCI6MTcwODE1ODM4OX0.CJe4WVJ6AJui6BOu1qRTDhStIxmQO2ix777my5AuBbc"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
