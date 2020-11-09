// Dependencies
const path = require("path");
const router = require("express").Router();

// HTML render route, gets notes.html from public
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
})

// HTML render route, gets index.html from public
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})


module.exports = router;