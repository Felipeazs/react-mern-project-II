const asyncHandler = require('express-async-handler')

//@desc Register a new user
//@route /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    res.send('Register route')
})

//@desc Login user
//@route /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Register login')
})

module.exports = {
    registerUser,
    loginUser,
}
