const express = require('express')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const url = require('url')
const queryString = require('querystring')
const flash = require('express-flash')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

// init env variables
dotenv.config()

const app = express()
app.use(fileUpload())

const store = new MongoStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: process.env.SECRET_KEY,
    store: store,
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

// Create static public folder
app.use(express.static('public'))

// Set hbs shablonizator
app.engine('hbs', exphbs({extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use('/', require('./routes/homeRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/post', require('./routes/postRoutes'))

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI
        const conn = await mongoose.connect(uri, {
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`Mongo db connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
    }
}

connectDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})