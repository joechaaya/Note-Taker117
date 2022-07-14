const router = require('express').Router();
const db = require('../apiRoutes/db.json')
const { filterById, createNote, removeNote, editNote, validateNote } = require('../notes');


router.get('/notes', (req, res) => {
    let results = db
    res.json(results)
});

router.get('/notes/:id', (req, res) => {
    const result = filterById(req.params.id, results);
    if (result) {
        res.json(result)
    } else {
        res.sendStatus(404);
    }
})

router.post('/notes', (req, res) => {
    var results = db
    if (validateNote(req.body)) {
        result= createNote(req.body, results)
        res.json(result)
    } else{
        res.sendStatus(404)
    }
})

router.delete('/notes/:id', (req, res) => {
    var results = db
    result = deleteNote(req.params.id, results)
    res.send(result)
})

module.exports = router