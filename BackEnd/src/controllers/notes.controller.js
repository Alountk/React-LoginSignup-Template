const notesCtrl = {
};

notesCtrl.getNotes = ((req,res) => res.json({message:[]}));

notesCtrl.postNotes = ((req,res) => res.json({message:'POST - NOTES'}));

notesCtrl.updateNotes =((req,res) => res.json({message:'Note updated'}));

notesCtrl.deleteNotes =((req,res) => res.json({message:'Nota delete'}));

notesCtrl.getNote = ((req,res) => res.json({title:'hola'}));

module.exports = notesCtrl;