

const notes = require('./notes')
// const notesAPI = require('./api/notes')



// app.use('/api/notes', notesAPI)
app.use('/notes', notes)

module.exports = app
