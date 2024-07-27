const express = require('express')
const router = express.Router()
const path = require('path')
const data = {}
data.employees = require('../data/employees.json')

router.route('/')
    .get((req, res) => {
        res.json(data.employees)
    })
    .post((req, res) => {
        res.json({
            "firstname" : req.body.firstname,
            "lastname" : req.bodylastname
        })
    })
    .put((req, res) => {
        res.json({
            "firstname" : req.body.firstname,
            "lastname" : req.bodylastname
        })
    })
    .delete((req, res) => {
        res.json({
            "id" : req.body.id
        })
    })

router.route('/:name')
.get((req, res) => {
    res.json({"name" : req.params.firstname + '-' + req.params.lastname})
})

module.exports = router