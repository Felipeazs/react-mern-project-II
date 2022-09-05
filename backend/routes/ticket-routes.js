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

router.get('/', protect, getTickets)
router.get('/:id', protect, getTicket)
router.post('/', protect, createTicket)
router.put('/:id', protect, updateTicket)
router.delete('/:id', protect, deleteTicket)

module.exports = router
