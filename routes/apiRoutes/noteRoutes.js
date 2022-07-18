const router = require('express').Router();
const { notes } = require('../../db/db')
const { v4: uuidv4 } = require('uuid');
const { createNote, removeNote, editNote, filterById } = require('../../lib/notes.js');


router.get('/notes', (req, res) => {
    res.json(notes)
});

router.get('/notes/:id', (req, res) => {
    const result = filterById(req.params.id, notes);
    if (result) {
        res.json(result)
    } else {
        res.sendStatus(404);
    }
})

router.post('/notes', (req, res) => {
    if (!req.body.id) {
        req.body.id = uuidv4();
        createNote(req.body, notes);
    } else {
        editNote(req.body, notes);
    }
    res.json(req.body)
})

router.delete('/notes/:id', (req, res) => {
    const result = filterById(req.params.id, notes);

    removeNote(result, notes);
    res.json();
})

module.exports = router;