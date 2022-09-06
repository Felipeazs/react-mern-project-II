const express = require('express')
const router = express.Router({ mergeParams: true }) // merge with the ticket routes: /api/tickets/:ticketId/notes

const { getNotes, addNote } = require('../controllers/note-controller')

const protect = require('../middleware/auth-middleware')

router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router
