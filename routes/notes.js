const notes = require('express').Router()
const uuid = require('../helpers/uuid')
// const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js')
const fs = require('fs')

notes.get('/api/notes', (req, res) => {
  fs.readFile('../db/db.json', 'utf8').then((noteData) =>
    res.json(JSON.parse(noteData)),
  )
})

notes.post('/api/notes', (req, res) => {
  const { title, text } = req.body

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    }
    fs.readFile('.../db/db.json').then((data) => {
      console.log(data)
      const oldData = json.parse(data)

      fs.writeFile('.../db/db.json', json.stringify(oldData, null, '  '))
      const response = { status: 'success', body: newNote }
      console.log(response)
      res.status(201).json(response)
    })
  } else {
    res.status(500).json('error in posting')
  }
})

module.exports = notes
