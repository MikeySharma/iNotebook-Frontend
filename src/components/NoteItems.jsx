import React from 'react';
import NoteContext from '../context/notes/NoteContext';
const NoteItems = ({ note, updateNote }) => {
    const context = React.useContext(NoteContext);
    const {deleteNote} = context;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-space-between">
                        <h5 className="card-title">{note.title}</h5>
                        <ion-icon style={{margin: '0 5px', cursor:'pointer'}} size="small" onClick={()=>{deleteNote(note._id)}} name="trash-outline"></ion-icon>
                        <ion-icon style={{margin: '0 5px', cursor: 'pointer'}} size="small" onClick={()=>{updateNote(note)}} name="create-outline"></ion-icon>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItems
