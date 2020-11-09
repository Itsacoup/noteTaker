
const fs = require("fs");
const path = require("path");
const util = require("util");
const express = require("express");
const app = express();

// Creates a promise, which the program will complete before moving on. 
const readFileAsync = util.promisify(fs.readFile);
// Creates a promise, which the program will complete before moving on. 
const writeFileAsync = util.promisify(fs.writeFile);

// Creates a new class called "Store"
// A data array will be created inside of one of the below functions
// getNotes, addNotes, and deleteNotes are the only three remaining
class Store {
    constructor() {
        this.lastId = 0;
    };
    read() {
        return readFileAsync(path.join(__dirname, "db.json"), "utf8");
    };
    write(note) {
        return writeFileAsync(path.join(__dirname, "db.json"), JSON.stringify(note));
    };
    getNotes() {
        return this.read().then(notes => {
            // let parsedNotes = [].concat(JSON.parse(notes));
            let parsedNotes = JSON.parse(notes);
            console.log(parsedNotes);
            return parsedNotes;
        });
    };
    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("note 'title' and 'text' cannot be blank")
        }

        const newNote = { title, text, id: ++this.lastId };

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    };

    deleteNotes(id) {
        // use the filter function
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== parseInt(id)))
            .then(filteredNotes => this.write(filteredNotes));
    }
};

const store = new Store();

module.exports = store;