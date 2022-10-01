import React , {useContext} from 'react'
import trash from './trash.svg'
import edit from './edit.svg'
import NoteContext from '../context/notes/NoteContext';
// import Notes from './Notes';
const Icon = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { Note , updatenote , showAlert} = props;
  return (
    <div className='twoicons d-flex'>
    
    <div className="trash" >
     
      <img src={trash} alt="trash" onClick={() => {deleteNote(Note._id); showAlert("Note deleted !" , "success");}}/>
    </div>

    <div className="edit mx-4">

        <img src={edit} alt="edit" onClick={() => {updatenote(Note)}} />
    </div>
    
    </div>
  )
}

export default Icon