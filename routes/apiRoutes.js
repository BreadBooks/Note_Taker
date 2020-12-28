const fs = require("fs");
const uuidv1 = require("uuid/v1");
const express = require("express");

module.exports = function(app) {
    app.get("/api/notes", (req, res) => {
        fs.readFile(__dirname + "/../db/db.json", (err, data) => { 
            if (err) throw err;
            let storedNotes = JSON.parse(data);
            return res.json(storedNotes);
        })
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        let savedNotes = [];
        
        fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => { 
            if (err) throw err;

            savedNotes = JSON.parse(data);

            newNote.id = uuidv1();
            savedNotes.push(newNote);

            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(savedNotes), "utf8", err => {
                if (err) throw err;
                res.end();
            })
        })
    })

    app.delete("/api/notes/:id", (req, res) => {
        let noteTBD = req.params.id;

        fs.readFile(__dirname + "/../db/db.json", "utf8", (err,data) => {
            if (err) throw err;

            let restNotes = JSON.parse(data).filter((entry) => {
                return entry.id != noteTBD; // took away !==
            });

            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(restNotes), "utf8", err => {
                if (err) throw err;
                res.end();
            })
        })
    })
}