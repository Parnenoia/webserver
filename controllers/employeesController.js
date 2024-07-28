
const data = {
    employees : require('../model/employees.json'),
    setEmployees: function (data) {this.employees = data}
}


const getAllEmployees = (req, res) => {
    res.json(data.employees)
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
    if(data.employees.find(emp => emp.firstname === req.body.firstname) && data.employees.find(emp => emp.lastname === req.body.lastname) ) return res.json("user already exists")
    data.setEmployees([...data.employees, newEmployee])
    res.status(201).json(data.employees)
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({'message':'No employee found for the requested ID'})
    }
    if(req.body.firstname) employee.firstname = req.body.firstname
    if(req.body.lastname) employee.lastname = req.body.lastname
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    const unsortedArray = [...filteredArray, employee]
    data.setEmployees(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.json(data.employees)
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({'message':'No employee found for the requested ID'})
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    data.setEmployees([...filteredArray])
    res.json(data.employees)
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id))
    if(!employee){
        return res.status(400).json({'message':'No employee found for the requested ID'})
    }
    res.json(employee)
}

module.exports = { getAllEmployees, getEmployee, createNewEmployee, updateEmployee, deleteEmployee}