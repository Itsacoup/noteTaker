// Dependencies
const router = require("express").Router()
const store = require("./../db/store.js")

// GET route which uses getNotes() from store.js
router.get("/notes", (req, res) => {
    
    store
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err))
});

// POST route which uses addNotes() from store.js
router.post("/notes", (req, res) => {
   
    store
        .addNote(req.body)
        .then((notes) => res.json(notes))
        .catch(err => res.status(500).json(err))
})

// DELETE route which uses removeNote() from store.js with ID passed in as a param 
router.delete("/notes/:id", (req, res) => {
  
    store
        .deleteNotes(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})


module.exports = router;
