const express = require('express');
const router = express.Router();

const { getNotes , postNotes , updateNotes , deleteNotes , getNote } =require('../controllers/notes.controller')

router.route('/')
    .get(getNotes)
    .post(postNotes)

    
router.route('/:id')
    .get(getNote)
    .put(updateNotes)
    .delete(deleteNotes)


module.exports = router;