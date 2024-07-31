const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('../config/corsOptions')
const { logger } = require('../middleware/logEvents')
const errorHandler = require('../middleware/errorHandler')
const PORT = process.env.PORT || 3000

// Custom middleware
app.use(logger)
app.use(cors(corsOptions))

//Express middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Static files
app.use('/', express.static(path.join(__dirname, '..', '/public')))

// Import routes
app.use('/', require('../routes/root'))
app.use('/login', require('../routes/auth'))
app.use('/register', require('../routes/register'))
app.use('/employees', require('../routes/employees'))

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
app.use(errorHandler)

// Serve
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app