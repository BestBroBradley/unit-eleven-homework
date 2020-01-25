const express = require("express")
const path = require("path")

const app = express();
var PORT = process.env.PORT || 8080;

const dbJSON = []

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

// HTML ROUTES:

//  * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})


//  * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

//  API ROUTES:

//  * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
    res.json(dbJSON)
})

//  * GET `*` - Should return the `index.html` file
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
//  * POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post ("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = newNote.title.split(" ").join("").toLowerCase()
    dbJSON.push(newNote);
    console.log(newNote)
    console.log(dbJSON)
    res.json(newNote)
})

//  * DELETE `/api/notes/:id` - Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.delete ("/api/notes/:id", function (req, res) {
    var delNote = req.params.id

    for (var i = 0; i < dbJSON.length; i++) {
        if (delNote === dbJSON[i].id) {
            dbJSON.splice(i, 1)
            return res.json(dbJSON)
        }
    } res.send(false)

})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT)
})