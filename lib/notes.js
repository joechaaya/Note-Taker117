const fs = require('fs');
const path = require('path');

function createNote(body, noteArray) {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: noteArray }, null, 2)
    )
};

function editNote(body, noteArray) {
    const index = noteArray.findIndex(note => note.id === body.id);


    noteArray.splice(index, 1);
    noteArray.splice(index, 0, body);

 
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: noteArray }, null, 2)
    )
}

function filterById(id, noteArray) {
    const result = noteArray.filter(note => note.id === id)[0];
    return result;
}

function removeNote(result, noteArray) {
    const index = noteArray.indexOf(result);

    noteArray.splice(index, 1);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: noteArray }, null, 2))
}

module.exports = {
    createNote,
    filterById,
    removeNote,
    editNote
}
