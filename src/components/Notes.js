import React, { useContext, useEffect, useRef , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from "../context/notes/NoteContext";
import AddNote from './AddNote';
// import Home from './Home';
import NoteItem from './NoteItem';
const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, GetNote , editNote } = context;
  let history  = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      GetNote()
    }
    else{
      history("/login");
    }
  },[])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({id : "" , edittitle : "" , editdescription : "", edittag : "" });
  const updatenote = (recentnote) => {
    ref.current.click();
    setnote({id : recentnote._id , edittitle : recentnote.title , editdescription : recentnote.description , edittag : recentnote.tag});

  };
  const HandleClick = (e) =>{
    e.preventDefault();
    console.log("clicked" , note);
    editNote(note.id , note.edittitle , note.editdescription , note.edittag);
    refClose.current.click();
    props.showAlert("Your note updated !" , "success");
  }
  const onChange = (e) =>{
    setnote({...note , [e.target.name] : e.target.value});
  }
  return (
    <>
      <AddNote showAlert = {props.showAlert} />

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>
    
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
              <div className="mb-3">
                <label htmlFor="editnotetitle" className="form-label">Title</label>
                <input type="text" value = {note.edittitle} className="form-control" id="editnoteTitle" placeholder="here..{alleast 3 words for valid description}" name="edittitle" onChange={onChange} minLength = {3} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="editdescription" className="form-label">Description</label>
                <textarea value={note.editdescription} placeholder="here... {alleast 5 words for valid description}" className="form-control" id="editdescription" rows="3" name="editdescription" onChange={onChange} minLength = {5} required></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="edittag" className="form-label">Tag</label>
                <input type="text" value = {note.edittag} placeholder="here.." className="form-control" id="edittag" name="edittag" onChange={onChange} />
              </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref = {refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled = {note.edittitle.length < 3 || note.editdescription.length < 5} type="button" className="btn btn-primary" onClick={HandleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h4> Your notes : </h4>
        <span style={{"fontWeight" : "bolder"}}>{notes.length === 0 && "No notes to display"}</span>
        {notes.map((note, index) => {
          return <NoteItem key={index} note={note} updatenote={updatenote} showAlert = {props.showAlert} />;
        })}
      </div>


    </>
  )
}

export default Notes