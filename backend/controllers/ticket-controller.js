const asyncHandler = require('express-async-handler')

const User = require('../models/user-model')
const Ticket = require('../models/ticket-model')

//@desc GET user tickets
//@route /api/tickets
//@access private
const getTickets = asyncHandler(async (req, res) => {
    //Information sended from the auth-middleware
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)
})

//@desc GET user ticket
//@route /api/ticket/:id
//@access private
const getTicket = asyncHandler(async (req, res) => {
    //Information sended from the auth-middleware
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    res.status(200).json(ticket)
})

//@desc POST create ticket
//@route /api/tickets
//@access private
const createTicket = asyncHandler(async (req, res) => {
    //Information sended from the auth-middleware
    const { product, description } = req.body
    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new',
    })

    res.status(201).json(ticket)
})
//@desc UPDATE user ticket
//@route PUT /api/tickets/:id
//@access private
const updateTicket = asyncHandler(async (req, res) => {
    //Information sended from the auth-middleware
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)
})

//@desc DELETE user ticket
//@route /api/tickets/:id
//@access private
const deleteTicket = asyncHandler(async (req, res) => {
    //Information sended from the auth-middleware
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    await Ticket.deleteOne()

    res.status(200).json({ success: true })
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
}
