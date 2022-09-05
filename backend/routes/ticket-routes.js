const express = require('express')
const router = express.Router()

const { getTickets, createTicket } = require('../controllers/ticket-controller')
const protect = require('../middleware/auth-middleware.js')

router.get('/', protect, getTickets)
router.post('/', protect, createTicket)

module.exports = router
