
const data = {
    employees : require('../model/employees.json'),
    setEmployees: function (data) {this.employees = data}
}


const getAllEmployees = (req, res) => {
    res.json(data.employees)
}

const getEmployee = (req, res) => {
    res.json({"firstname" : req.params.firstname})
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length-1].id+1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({'message':'First and last name required'})
    }

    data.setEmployees([data.employees, newEmployee])
    res.status(201).json(data.employees)
}

const updateEmployee = (req, res) => {
    res.json({
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname
    })
}

const deleteEmployee = (req, res) => {
    res.json({
        "id" : req.body.id
    })
}

module.exports = { getAllEmployees, getEmployee, createNewEmployee, updateEmployee, deleteEmployee}