const express = require('express')
const router = express.Router()
const data = {}
data.employees = require('../data/employees.json')

router.route('/')
    .get((req, res) => {
        res.json(data.employees)
    })
    .post((req, res) => {
        res.json({
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname
        })
    })
    .put((req, res) => {
        res.json({
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({
            "id" : req.body.id
        })
    })

// router.route('/:name')
// .get((req, res) => {
//     res.json({"name" : req.params.firstname + '-' + req.params.lastname})
// })

router.route('/:firstname')
.get((req, res) => {
    res.json({"firstname" : req.params.firstname})
})

module.exports = router