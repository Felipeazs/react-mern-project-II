const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/error-middleware')
const PORT = process.env.PORT || 8000

//connect to db
connectDB()

const app = express()

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello' })
})

//Routes
app.use('/api/users', require('./routes/user-routes'))

//error handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})
