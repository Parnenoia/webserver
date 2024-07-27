const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { logger } = require('../middleware/logEvents')
const errorHandler = require('../middleware/errorHandler')
const PORT = process.env.PORT || 3000

// Custom middleware

app.use(logger)

const whitelist = []
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS policy'))
        }
    },
    optionsSuccesStatus: 200
}
app.use(cors(corsOptions))

//Express middleware

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Static files

app.use('/', express.static(path.join(__dirname, '..', '/public')))
app.use('/subdir', express.static(path.join(__dirname, '..', '/public')))

// Import routes

app.use('/', require('../routes/root'))
app.use('/subdir', require('../routes/subdir'))
app.use('/employees', require('../routes/employees'))


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app