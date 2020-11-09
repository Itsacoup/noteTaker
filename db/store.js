// Dependencies
const fs = require("fs");
const path = require("path");
const util = require("util");
const express = require("express");
const app = express();

// Creates read and write promises, which the program will complete before moving on. 
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// creates class to be utilized evertime its contained functionality is called from the API. includes read and write, GET, POST and DELETE.
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
    
    // function to get the notes stored in db.json as they currently exist
    getNotes() {
        return this.read().then(notes => {
            let parsedNotes = JSON.parse(notes);
            console.log(parsedNotes);
            return parsedNotes;
        });
    };

    // function to add a note to db.json, takes the inputs and creates a new object that adds an id, then gets the notes and add its to them
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

    // function that when called, takes the id passed in pulled form the data attr of onclick, gets the notes array and then filters out the referenced id
    deleteNotes(id) {
        
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== parseInt(id)))
            .then(filteredNotes => this.write(filteredNotes));
    }
};

const store = new Store();

module.exports = store;