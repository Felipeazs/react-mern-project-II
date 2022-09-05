import { useState } from 'react'

import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    const changeHandler = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const submitHandler = event => {
        event.preventDefault()

        if (password !== password2) {
            toast.error('Passwords must match')
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={changeHandler}
                            placeholder="Enter your name"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={changeHandler}
                            placeholder="Enter your email"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={changeHandler}
                            placeholder="Enter your password"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={changeHandler}
                            placeholder="Confirm your password"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register
