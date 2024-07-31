const express= require('express')
const router = express.Router()
const registerController = require('../controllers/registerController')

router
    .get('^/$|index(.html)?', (req, res) => {res.send('test')})
    .post('/', registerController.handleNewUser)

module.exports = router