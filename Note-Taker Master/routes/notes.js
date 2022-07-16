const { json } = require('body-parser');
const fs = require ('fs');
const path= require('path');

function filterById(id, notesArr) {
    const result=notesArr.filter(note => note.id===id)[0];
    return result;
};

function validateNote(note) {
    if(!note.title || typeof note.title !== 'string'){
        return false;
    }
    if(!note.text || typeof note.text!=='string'){
        return false;
    }
    return true;
};

function getNote() {
 let notes=JSON.parse(fs.readFileSync(path.join(__dirname,'../apiRoutes/db.json')))
 return notes.notes;
};

function createNote(body, notesArr) {
    const note = body;
    
    notesArr.push(note);
    fs.writeFileSync(
        path.join(__dirname,'../apiRoutes/db.json'),
        JSON.stringify({notes: notesArr}, null, 2)
    );
    return note;
};

function removeNote(id, notesArr) {
    let newNotes = [];
   notesArr.forEach(note=>{
       if(note.id != id)
            newNotes.push(note);
   });
   notesArr=newNotes;
   fs.writeFileSync(
        path.join(__dirname,'../apiRoutes/db.json'),
        JSON.stringify({notes: notesArr}, null, 2)
   );
   return notesArr;
};

module.exports = {
    createNote,
    filterById,
    removeNote,
    getNote,
    validateNote,
    
}
