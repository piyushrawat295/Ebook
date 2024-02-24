const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes'); // Changed to Note from Notes
const router = express.Router();

router.get('/fetchallnotes', fetchuser, async (req, res) =>{
    try{
        const notes = await Note.find({user: req.user.id}); // Changed to Note from Notes
        res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }), // Changed 'Title' to 'title'
    body('description', 'Description is required').isLength({ min: 5 }), // Added meaningful error message
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()}); // Fixed typo in .json()
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
});

router.put('/update/:id', fetchuser, async (req, res) =>{
    const{title, description, tag} = req.body;
    const newNote ={};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if (note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
});

router.delete('/delete/:id', fetchuser, async (req, res) =>{
    const{title, description, tag} = req.body;

    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if (note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Note has been Deleted", note: note});
})

module.exports = router;
