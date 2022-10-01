import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const takenNotes = []
  const [notes, setNotes] = useState(takenNotes)

  // GetAllNotes
  const GetNote = async () => {
    // TODO api call
      // Default options are marked with *
      const response = await fetch( `${host}/api/notes/fetchAllNotes`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
       
        headers : {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem('token')

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      // console.log(json);
      setNotes(json);



  }


  // Add notes
  const addNote = async (title, description, tag) => {
    // TODO api call
    
      // Default options are marked with *
      const response = await fetch( `${host}/api/notes/addnote`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
       
        headers : {
          'Content-Type': 'application/json',
          "auth-token" :localStorage.getItem('token')

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify({title , description , tag}) 
      });
      const note = await response.json(); // parses JSON response 
      setNotes(notes.concat(note))
  }

  // delete note 
  const deleteNote = async (id) => {
    // TODO API CALL 
     // Default options are marked with *
     const response = await fetch( `${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
     
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token') 

        // 'Content-Type': 'application/x-www-form-urlencoded',
      }, 
       // body data type must match "Content-Type" header
    });
    const json =  await response.json(); // parses JSON response into native JavaScript objects
    const NewNote = notes.filter((note) => { return note._id !== id });
    setNotes(NewNote);
  }

  // edit note
  const editNote = async (id, title, description, tag) => {
    // API CALl

    
      // Default options are marked with *
      const response = await fetch( `${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
       
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')

          // 'Content-Type': 'application/x-www-form-urlencoded',
        }, 
        body: JSON.stringify({title , description , tag}) // body data type must match "Content-Type" header
      });
      const json =  response.json(); // parses JSON response into native JavaScript objects
      


    let newnotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit to client  
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setNotes(newnotes);

  }

  return (
    // while you wrap anything all childrens automatically takes place between them
    <NoteContext.Provider value={{ notes, GetNote ,  addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;