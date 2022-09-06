import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

import { getTicket, closeTicket } from '../features/tickets/ticket-slice'
import { getNotes, createNote, reset as notesReset } from '../features/notes/note-slice'

import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'

const customStyles = {
    content: {
        width: '500px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

const Ticket = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

    const { ticket, isLoading, isError, message } = useSelector(state => state.tickets)
    const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes)
    const dispatch = useDispatch()

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(id))
        dispatch(getNotes(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, message, id])

    const closeTicketHandler = () => {
        dispatch(closeTicket(id))
        toast.success('Ticket Closed Successfully')
        navigate('/tickets')
    }

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    const submitHandler = event => {
        event.preventDefault()

        dispatch(createNote({ noteText, id }))
        closeModal()
    }

    if (isLoading || notesIsLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h3>Something went wrong</h3>
    }
    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url="/tickets" />
                <h2>
                    Ticket iD: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Product: {ticket.product}</h3>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('es-CL')}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {ticket.status !== 'closed' && (
                <button
                    className="btn"
                    onClick={openModal}>
                    <FaPlus /> Add note
                </button>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Note">
                <h2>Add note</h2>
                <button
                    className="btn-close"
                    onClick={closeModal}>
                    X
                </button>
                <form
                    action=""
                    onSubmit={submitHandler}>
                    <div className="form-group">
                        <textarea
                            name="noteText"
                            id="noteText"
                            className="form-control"
                            placeholder="note text"
                            value={noteText}
                            onChange={event => setNoteText(event.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <button
                            className="btn"
                            type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            {notes.map(note => (
                <NoteItem
                    key={note._id}
                    note={note}
                />
            ))}

            {ticket.status !== 'closed' && (
                <button
                    onClick={closeTicketHandler}
                    className="btn btn-block btn-danger">
                    Close Ticket
                </button>
            )}
        </div>
    )
}

export default Ticket
