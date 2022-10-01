import React from 'react'
import Icon from '../components/Icon'
const NoteItem = (props) => {
    const { note , updatenote , showAlert } = props;

    return (
        <>



            <div className=" my-3">

                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text"> {note.description}</p>
                        <Icon Note = {note} updatenote = {updatenote} showAlert = {showAlert} />
                    </div>
                </div>


            </div>

        </>
    )
}

export default NoteItem