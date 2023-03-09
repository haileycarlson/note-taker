const express = require('express')
const path = require('path')
// const api = require('./routes/notes.js')
const uuid = require('./helpers/uuid')
const fs = require('fs')
// const { readAndAppend, readFromFile } = require('./helpers/fsUtils.js')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/api', api)

app.use(express.static('public'))

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html')),
)

// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html')),
// )

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', function (err, noteData) {
    res.json(JSON.parse(noteData))
  })
})
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body
  console.log(req.body)

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    }

    fs.readFile('./db/db.json', 'utf8', function (err, noteData) {
      const oldData = JSON.parse(noteData)
      const newData = oldData.unshift(newNote)
      console.log(oldData)
      fs.writeFile('./db/db.json', JSON.stringify(oldData), (err) => {
        if (err) console.log(err)
        else {
          const response = { status: 'success', body: newNote }
          console.log(response)
          res.status(201).json(response)
        }
      })
    })
  } else {
    res.status(500).json('error in posting')
  }
})

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')),
)

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`),
)
