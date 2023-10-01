import React, {useState} from 'react'
import NoteContext from '../context/notes/NoteContext';
import AlertContext from '../context/alert/AlertContext';

const AddNote = () => {
    const context = React.useContext(NoteContext);
    const alertContext = React.useContext(AlertContext);

    const {useAlert} = alertContext;
  const {addNote}= context;
  const [note, setNote] = useState({title: '', description:'', tag:''})
  
  const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: '', description:'', tag:''})
    useAlert('Created A New Note', 'Success')
  }

  const handleChange = (e) =>{
    setNote({...note, [e.target.name] : e.target.value})
  }
  return (
    <section>
      <div className="container my-3">
          <h2>Add Note</h2>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" onChange={handleChange} minLength={5} value={note.title} required name="title" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" onChange={handleChange} minLength={5} value={note.description} required name="description" />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} minLength={5} value={note.tag}/>
          </div>
          <button disabled={note.title.length <= 3? true : false} type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
        </form>
    </section>
  )
}

export default AddNote
