import React from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItems from './NoteItems';
import AddNote from './AddNote';
import AlertContext from '../context/alert/AlertContext';
import { useNavigate } from 'react-router-dom';


const Notes = () => {
  const navigate = useNavigate();
  const context = React.useContext(NoteContext);
  const alertContext = React.useContext(AlertContext);

  const { useAlert} = alertContext
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = React.useState({id:'', etitle: '', edescription:'', etag:'default'})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  }


  const handleClick = () =>{
    editNote(note.id, note.etitle, note.edescription, note.etag);
    useAlert('Edited An Existing Note', 'Success')
    refClose.current.click();

  }
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const ref = React.useRef(null)
  const refClose = React.useRef(null)
  React.useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate('/login')
    }
  }, [])
  return (
    <>
      <AddNote />
      <button type="button" className="d-none btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} onChange={handleChange} minLength={5} required name="etitle" />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} onChange={handleChange} minLength={5} required name="edescription" />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="etag">Tag</label>
                  <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={handleChange} minLength={5} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length <= 3? true : false || note.edescription.length <= 3? true : false} onClick={handleClick} type="button" className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && 'No notes to be displayed'}
        </div>
        {
         
          notes.map((note) => {
            return (
              <NoteItems key={note._id} note={note} updateNote={updateNote} />
            )
          })
        }
      </div>

    </>
  )
}

export default Notes
