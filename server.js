require('dotenv').config()
const { compareDesc } = require('date-fns')
const express = require('express')
const path = require('path')
let cors = require('cors')
let corsOptions = require('./config/corsOptions')
let {logEvents, logger} = require('./middleware/logEvents')
const corsError = require('./middleware/errorHandler')
let verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
//THE MONGOOSE CONNECTOR
const connectDB = require('./config/dbConn')
let err
// const newUserHandler = require('./controllers/registerController')
const app = express()
let fs = require('fs').promises
const PORT = process.env.PORT || 5000

//CONNECT TO MONGODB
connectDB()


app.use(logger)
// HANDLE OPTIONS CREDENTIALS CHECK - BEFORE CORS AND FETCH COOKIES CREDENTIALS REQUIREMENT
app.use(credentials)
// CORS ORIGIN RESOURCE SHARING
app.use(cors(corsOptions))
// BUILT-IN MIDDLEWARE TO HANDLE URLENCODED FROM DATA
app.use(express.urlencoded({extended: false}))
//BUILT IN MIDDLEWARE FOR JSON
app.use(express.json())

// middle for cookie
app.use(cookieParser())

// static middleware for the root directory
app.use(express.static(path.join(__dirname, '/public')))


// for the request for the 'subdir' folder. The default path below will serve
// the index page

// mdiddleware for the root file
app.use('/', require('./Routes/root'))

app.use('/auth', require('./Routes/auth'))
app.use('/register', require('./Routes/register'))
// this has to be declared before the jwt verify middleware because it is
// supposed to generate a new access token for jwt.
app.use('/refresh', require('./Routes/refresh'))
app.use('/logout', require('./Routes/logout'))
app.use(verifyJWT)
app.use('/employees', require('./Routes/api/employees'))
app.use('/users', require('./Routes/api/users'))



app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

// app.all is usually applied as a route and accepts regex while app.use is a middleware.
app.all('*', (req, res) => {
    res.status(404)
   if(req.accepts('html')){
    res.sendFile(path.join(__dirname, 'veiws', '404.html'))
   } else if (req.accepts('json')){
    res.json({error: '404 not found'})
   } else {
    res.send('404 not found')
   }
})


app.use(corsError)

mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB')
    app.listen(PORT, ()=> console.log('running on port:', PORT))
})