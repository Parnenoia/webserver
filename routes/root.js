const express = require('express')
const router = express.Router()
const path = require('path')

// Routes

router.get('^/$|index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/new-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, '..',  'views', 'new-page.html'))
})

router.get('/old-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.redirect(301, '/new-page.html') // 302 by default
})

// Route handlers

router.get('/hello(.html)?', (req, res, next) => {
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

router.get('/chain(.html)?', [one, two, three]
)

module.exports = router