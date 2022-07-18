const fs = require('fs');
const path = require('path');

function createNote(body, noteArr) {
    const note = body;
    noteArr.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: noteArr }, null, 2)
    )
};

function editNote(body, noteArr) {
    const index = noteArr.findIndex(note => note.id === body.id);

    noteArr.splice(index, 1);
    noteArr.splice(index, 0, body);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: noteArr }, null, 2)
    )
}

function filterById(id, noteArr) {
    const result = noteArr.filter(note => note.id === id)[0];
    return result;
}

function removeNote(result, noteArr) {
    const index = noteArr.indexOf(result);

    noteArr.splice(index, 1);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: noteArr }, null, 2))
}

module.exports = {
    createNote,
    filterById,
    removeNote,
    editNote
}