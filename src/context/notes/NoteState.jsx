import React from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../alert/AlertContext";

const NoteState = ({ children }) => {
  const host = "http://localhost:5000";
  const alertContext = React.useContext(AlertContext);
  const {useAlert} = alertContext;
  //Get all Notes
  const [notes, setNotes] = React.useState([]);
  const getNotes = async () => {
    //Fecth Api

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);

  }

  // Add note in the note list
  const addNote = async (title, description, tag) => {
    //Fecth Api

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    //Logic to edit in client
    setNotes(notes.concat(json))
  }

  //Delete an existing note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });
    const json = await response.json();

    const newNote = notes.filter((notes) => { return notes._id !== id })
    setNotes(newNote);
    useAlert('Deleted an existing note', 'Success');
  }
  //Edit an existing note
  const editNote = async (id, title, description, tag) => {
    //Fecth Api
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }

    }
    setNotes(newNotes);

  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {children}
    </NoteContext.Provider>
  )
}
export default NoteState;