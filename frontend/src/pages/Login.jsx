import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/auth-slice'

import { FaUser, FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const dispatch = useDispatch()

    //values from /auth/user-slice
    const { user, isLoading, isSuccess, message } = useSelector(state => state.auth)

    const changeHandler = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const submitHandler = event => {
        event.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData)) //Manage state with redux
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login to get support</p>
            </section>
            <section className="form">
                <form onSubmit={submitHandler}>
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
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
