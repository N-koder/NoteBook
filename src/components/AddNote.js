import React , {useContext , useState} from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {

  const context = useContext(NoteContext);
  const { addNote } = context;
 
  const [note, setnote] = useState({title : "" , description : "", tag : "" });
  const HandleClick = (e) =>{
    e.preventDefault();
    console.log("clicked");
    addNote(note.title , note.description , note.tag);
    setnote({title : "" , description : "", tag : "" })
    props.showAlert("Note added !" , "success");
  }

  const onChange = (e) =>{
    setnote({...note , [e.target.name] : e.target.value});
  }
  return (
    <>
      <div className="container my-3">
        <h3>Create and add note :</h3>
      <form>  
        <div className="mb-3">
          <label htmlFor="notetitle" className="form-label">Title</label>
          <input type="text" value = {note.title} className="form-control" id="noteTitle" placeholder="here... {alleast 3 words for valid description}" name = "title" onChange={onChange} minLength = {3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea placeholder="here... {alleast 5 words for valid description}" className="form-control" id="description" rows="3"  name = "description" value = {note.description}  onChange={onChange} minLength = {5} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type= "text" placeholder="here.." className="form-control" id="tag"  name = "tag" value={note.tag} onChange={onChange} />
        </div>
        <button disabled = {note.title.length < 3 || note.description.length < 5}className="btn btn-dark submit" onClick={HandleClick}>ADD</button>
        </form> 
      </div>


    </>
  )
}

export default AddNote
