import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset } from '../features/tickets/ticket-slice'
import { toast } from 'react-toastify'

import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useEffect } from 'react'

const Ticket = () => {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.tickets)
    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, message, id])

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
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('es-CL')}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
        </div>
    )
}

export default Ticket
