require('dotenv').config()

const express = require('express')
const app = express() //express constructor
const PORT = process.env.PORT
const URI = process.env.MONGO_URI
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')





// Attaches request to object
app.use(express.json())

// Logs requests coming in
app.use((req, res, next)=> {
    console.log(`Path: ${req.path} Method: ${req.method}`)
    next()
})

// Ataches routes to app
app.use('/api/workouts', workoutRoutes)

// Mongo Database Connection
mongoose.connect(URI)
    .then(() =>{
        app.listen(PORT, () => {
            console.log('Connected to Database on port', PORT)
        })        
    })
    .catch((error) =>{
        console.log(error)
    })