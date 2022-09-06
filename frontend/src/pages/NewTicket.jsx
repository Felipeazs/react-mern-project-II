import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const NewTicket = () => {
    const { user } = useSelector(state => state.auth)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')

    const submitHandler = event => {
        event.preventDefault()
    }

    return (
        <>
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
                            <option value="Macbook">Macbook</option>
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
