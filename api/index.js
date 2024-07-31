const express = require('express')
const app = express()
const path = require('path')
const credentials = require('../middleware/credentials')
const cors = require('cors')
const corsOptions = require('../config/corsOptions')
const { logger } = require('../middleware/logEvents')
const errorHandler = require('../middleware/errorHandler')
const verifyJWT = require('../middleware/verifyJWT')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000

// Custom middleware
app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))

//Express middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieParser())

// Static files
app.use('/', express.static(path.join(__dirname, '..', '/public')))

// Import routes
app.use('/', require('../routes/root'))
app.use('/register', require('../routes/register'))
app.use('/login', require('../routes/auth'))
app.use('/refresh', require('../routes/refresh'))
app.use('/login', require('../routes/auth'))
app.use('/logout', require('../routes/logout'))

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname,'..', 'views', '404.html'))
    } else if(req.accepts('json')) {
        res.json({"error":"404"})
    } else {
        res.type('txt').send("404 not found")
    }
})

app.use(verifyJWT)
app.use('/employees', require('../routes/employees'))

app.use(errorHandler)


// Serve
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app