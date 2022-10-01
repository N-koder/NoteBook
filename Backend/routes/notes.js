const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser.js');

// Route 1 : GET all the notes using : GET "api/auth/getUser" : LOGIN required
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch(error){
        console.error(error.message);
        res.status(500).json({error : "Internal Server error ! !"});
      }
})


// Route 2 : Add all the notes using  : POST "api/auth/addnote" : LOGIn required
router.post('/addnote', fetchUser, [
   body('title', 'title length min : 5').isLength({min : 3}),
   body('description' , 'description length min : 10').isLength({min : 5}),

], async (req, res) => {

    const { title, description, tag } = req.body;
    try {


        // if there are errors returns bad request / errors;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const SavedNote = await note.save()
        res.json(SavedNote)
    }
        catch(error){
            console.error(error.message);
            res.status(500).json({error : "Internal Server error ! !"});
          }
})

// Route 3 : Update a existing note using  : PUT "api/auth/updatenotes" , LOGIn required

router.put('/updatenotes/:id' , fetchUser, async (req, res) => {

const {title , description , tag} = req.body;

// create a newNote object 
const newNote = {};

if(title){newNote.title = title};
if(description){newNote.description = description};
if(tag){newNote.tag = tag};

// find the note to be update it;
let note = await Notes.findById(req.params.id);
if(!note){return res.status(404).send("Notfound")}

// Allow updation only if user owns this note
if(note.user.toString() !==  req.user.id){
    return res.status(401).send("Not allowed");
}

note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new:true})
res.json({note}); 

})

// Route 4 : delete a existing note using  : DELETE "api/auth/deletenotes" , LOGIn required

router.delete('/deletenotes/:id' , fetchUser, async (req, res) => {

    const {title , description , tag} = req.body;
    
    
    // find the note to be delete and delete it ;
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Notfound")}
    
    // Allow deletion only if user owns this note 
    if(note.user.toString() !==  req.user.id){
        return res.status(401).send("Not allowed");
    }
    
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success " : "Your note has been deleted" , note : note}); 
    
    })
    



module.exports = router;