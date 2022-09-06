const express = require('express')
const router = express.Router()

const {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
} = require('../controllers/ticket-controller')
const protect = require('../middleware/auth-middleware.js')

//re-route into note router: merging to ticket routes
const noteRouter = require('./note-routes')
router.use('/:ticketId/notes', noteRouter)

router.get('/', protect, getTickets)
router.get('/:id', protect, getTicket)
router.post('/', protect, createTicket)
router.put('/:id', protect, updateTicket)
router.delete('/:id', protect, deleteTicket)

module.exports = router
