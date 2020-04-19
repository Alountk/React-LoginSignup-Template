const notesCtrl = {
};

const Note = require ('../models/Note');

notesCtrl.getNotes = (async (req,res) => {
    const notes = await Note.find();
    res.json({notes})
    });

notesCtrl.postNotes = (async (req,res) => {
    const { title, description, date, author } =req.body;
    const newNote =new Note({title, description, date, author})
    console.log(newNote);
    await newNote.save()
    res.json({message:'POST - NOTES'})
});

notesCtrl.getNote = (async (req,res) => {
    const note = await  Note.findById(req.params.id) 
    console.log(note);
    res.json({title:'hola'})
});

notesCtrl.updateNotes =(async  (req,res) => {
    const { title, description, author } =req.body;
    await Note.findOneAndUpdate(req.params.id,{title, description, author});
    res.json({message:'Note updated'})
} );


notesCtrl.deleteNotes =(async (req,res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json({message:'Nota delete'})
});


module.exports = notesCtrl;