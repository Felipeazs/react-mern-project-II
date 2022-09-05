const asyncHandler = require('express-async-handler')

const User = require('../models/user-model')
const Ticket = require('../models/ticket-model')

//@desc GET user tickets
//@route /api/tickets
//@access private
const getTickets = asyncHandler(async (req, res) => {
    //Information sended from the auth-middleware

    res.status(200).json({ message: 'Get tickets' })
})

//@desc POST create ticket
//@route /api/tickets
//@access private
const createTicket = asyncHandler(async (req, res) => {
    //Information sended from the auth-middleware

    res.status(200).json({ message: 'Create tickets' })
})

module.exports = {
    getTickets,
    createTicket,
}
