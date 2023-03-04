const express = require('express')
const { fs } = require('fs')
const path = require('path')
const noteData = require('./db/db.json')
// const api = require("./routes/index.js");
// const api = require('./public/assets/js/index.js')
const uuid = require('./helpers/uuid')

const PORT = 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/api', api)

app.use(express.static('public'))

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')),
)

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html')),
)

app.get('/api/notes', (req, res) =>
  // fs.readFile('./db/db.json', (err, data) => {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     // Convert string into JSON object
  //     const parsedNotes = JSON.parse(data)

  //     // Add a new review
  //     parsedNotes.push(newNote)
  //   }
  // }),
  res.status(200).json(noteData),
)

app.post('api/notes', (req, res) => {
  // Write updated reviews back to the file
  // fs.writeFile(
  //   './db/db.json',
  //   JSON.stringify(parsedNotes, null, 4),
  //   (writeErr) =>
  //     writeErr
  //       ? console.error(writeErr)
  //       : console.info('Successfully updated notes!'),
  // )
  const { title, text } = req.body

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    }

    // Obtain existing reviews
    // fs.readFile('./db/db.json', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error(err)
    //   } else {
    //     // Convert string into JSON object
    //     const parsedNotes = JSON.parse(data)

    //     // Add a new review
    //     parsedNotes.push(newNote)

    //     // Write updated reviews back to the file
    //     fs.writeFile(
    //       './db/db.json',
    //       JSON.stringify(parsedNotes, null, 4),
    //       (writeErr) =>
    //         writeErr
    //           ? console.error(writeErr)
    //           : console.info('Successfully updated notes!'),
    //     )
    //   }
    // })
    fs.writeFile(
      './db/db.json',
      JSON.stringify(parsedNotes, null, 4),
      (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.info('Successfully updated notes!'),
    )
  }
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`),
)
