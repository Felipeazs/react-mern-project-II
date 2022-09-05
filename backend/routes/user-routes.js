const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth-middleware')
const { registerUser, loginUser, getMe } = require('../controllers/user-controller')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

module.exports = router
