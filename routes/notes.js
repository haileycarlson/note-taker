// const noteRouter = require('express').Router()
// const { readFromFile } = require('../helpers/fsUtils')

// noteRouter.get('/notes', (req, res) => {
//   readFromFile('../../public/notes.html').then((data) =>
//     res.json(JSON.parse(data)),
//   )
// })

// noteRouter.get('/', (req, res) => {
//   readFromFile('../../public/index.html').then((data) =>
//     res.json(JSON.parse(data)),
//   )
// })

// module.exports = noteRouter
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
  //   const { title, text } = req.body

  //   // If all the required properties are present
  //   if (title && text) {
  //     // Variable for the object we will save
  //     const newNote = {
  //       title,
  //       text,
  //       note_id: uuid(),
  //     }

  //     readAndAppend(newNote, './db/db.js')
  //     res.json(`Note added successfully 🚀`)
  //   } else {
  //     res.error('Error adding notes')
  //   }
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
