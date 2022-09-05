import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/auth-slice'

import { FaUser, FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Spinner from '../components/Spinner'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //states from /auth/user-slice
    const { user, isLoading, isSuccess, message, isError } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        //redirect on success
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, message, user, navigate, dispatch])

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

        dispatch(login(userData)) //Manage the login state with redux
    }

    if (isLoading) {
        return <Spinner />
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
