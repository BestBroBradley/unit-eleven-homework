const express = require("express")
const path = require("path")
const dbJSON = require("../db/db.json") 

const app = express();
const PORT = 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// HTML ROUTES:

//  * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"))
})

//  * GET `*` - Should return the `index.html` file
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
})

//  * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

//  API ROUTES:

//  * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
    res.json(dbJSON)
})

//  * POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post ("/api/notes", function (req, res) {
    let newNote = req.body;

    fs.appendFile('db.json', newNote, (err) => {
        if (err) throw err;
        console.log('The file has been saved!')
        return res.json(dbJSON)
      })
})

//  * DELETE `/api/notes/:id` - Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT)
})