const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
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

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/subdir', express.static(path.join(__dirname, '/public')))

app.use('/subdir', require('./routes/subdir'))


// Routes

app.get('^/$|index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.redirect(301, '/new-page.html') // 302 by default
})

// Route handlers

app.get('/hello(.html)?', (req, res, next) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    next()
}, (req, res) =>{
    res.send('Hello world')
}
)

const one = (req, res, next) => {
    console.log('one')
    next()
}

const two = (req, res, next) => {
    console.log('two')
    next()
}

const three = (req, res) => {
    console.log('three')
    res.send('Three')
}

app.get('/chain(.html)?', [one, two, three]
)

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')) {
        res.type('txt').send("404 not found")
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))