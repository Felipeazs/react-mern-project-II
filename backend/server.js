const express = require('express')
const path = require('path')
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

//Routes
app.use('/api/users', require('./routes/user-routes'))
app.use('/api/tickets', require('./routes/ticket-routes'))

//Serve Frontend
if (process.env.NODE_ENV === 'production') {
    //create static build folder for the frontend
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    //serve index.html for all routes
    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(200).send('API is running...')
    })
}

//error handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})
