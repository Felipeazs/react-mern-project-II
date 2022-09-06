import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticket-slice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const NewTicket = () => {
    const { user } = useSelector(state => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector(state => state.ticket)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        if (isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }
    }, [dispatch, isError, isSuccess, message, navigate])

    const submitHandler = event => {
        event.preventDefault()

        dispatch(createTicket({ product, description }))
    }

    if (isLoading) return <Spinner />

    return (
        <>
            <BackButton url="/" />
            <section className="heading">
                <h1>Create new ticket</h1>
                <p>Please fill out the form below</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        value={name}
                        disabled
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input
                        type="text"
                        value={email}
                        disabled
                        className="form-control"
                    />
                </div>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name="product"
                            value={product}
                            onChange={event => setProduct(event.target.value)}
                            id="product">
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea
                            name="description"
                            id="description"
                            className="form-control"
                            placeholder="Description"
                            value={description}
                            onChange={event => setDescription(event.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket
