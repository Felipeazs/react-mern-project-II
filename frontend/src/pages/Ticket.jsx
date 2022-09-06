import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket, reset } from '../features/tickets/ticket-slice'
import { toast } from 'react-toastify'

import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useEffect } from 'react'

const Ticket = () => {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.tickets)
    const dispatch = useDispatch()

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, message, id])

    const closeTicketHandler = () => {
        dispatch(closeTicket(id))
        toast.success('Ticket Closed Successfully')
        navigate('/tickets')
    }

    if (isLoading) {
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
            </header>
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
