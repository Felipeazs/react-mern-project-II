const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, //relation between notes and user
            required: true,
            ref: 'User', //relation between notes and user
        },
        ticket: {
            type: mongoose.Schema.Types.ObjectId, //relation between notes and tickets
            required: true,
            ref: 'Ticket', //relation between notes and tickets
        },
        text: {
            type: String,
            required: [true, 'Please add some text'],
        },
        isStaff: {
            type: Boolean,
            default: false,
        },
        staffId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Note', noteSchema)
