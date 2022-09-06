const asyncHandler = require('express-async-handler')

const User = require('../models/user-model')
const Note = require('../models/note-model')
const Ticket = require('../models/ticket-model')

//@desc GET notes for a ticket
//@route /api/tickets/:ticketId/notes
//@access private
const getNotes = asyncHandler(async (req, res) => {
    //Information sended from the auth-middleware
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.findById(req.params.ticketId)
    if (tickets.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const notes = await Note.find({ ticket: req.params.ticketId })

    res.status(200).json(notes)
})

//@desc Create ticket note
//@route /api/tickets/:ticketId/notes
//@access private
const addNote = asyncHandler(async (req, res) => {
    //Information sended from the auth-middleware
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.findById(req.params.ticketId)
    if (tickets.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id,
    })

    res.status(200).json(note)
})

module.exports = {
    getNotes,
    addNote,
}
