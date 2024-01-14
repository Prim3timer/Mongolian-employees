  
  const Employee = require('../views/model/Employee')
 
let mana = {}

mana.employees = require('../views/model/employee.json')

let {employees} = mana
let path = require('path')

let filePath = path.join(__dirname, '..', 'views', 'model', 'employee.json')
// let filePath2 = path.join(__dirname, '..', 'views', 'data', 'log.txt')

let getAllEmployees = async (req, res)=> {
    // let data = await readFile(filePath2, 'utf-8')
    const employees = await Employee.find()
    if (!employees) res.status(204).json({'message': 'no employees found'})
    res.send(employees)
   
}

let createEmployee = async(req, res)=> {
    
    if(!req?.body?.name || !req?.body?.sex){
        return res.status(400).json({'message': 'name and sex required'})
    }
    try {
        const newEmployee = await Employee.create({
            name: req.body.name,
            sex: req.body.sex
        })

        // SORT THE ARRAY
        // let sortedList = employees.sort((a, b) => {
        //     let nameA = a.id
        //     let nameB = b.id
        //    if (nameA < nameB) return -1
        //    if (nameA > nameB) return 1
        //   return 0
        // })
        // let empString = JSON.stringify(sortedList, null, 2)
        // writeFile(filePath, empString)
        res.status(201).json(newEmployee) 
    } catch (error) {
        res.status(400).json({'message': error})
    }

     
}

let editEmployee = async (req, res)=> {
    let {name, sex} = req.body
    let {id} = req.params
    if(req?.body?.id){
        return res.status(400).json({"message": `employee with id: ${id} not found`})
    }
    const currentEmployee  = await Employee.findOne({_id: id}).exec()
    if (!currentEmployee) {
        return res.status(204).json({'message': `no employee matches the ID: ${id}`})
    }

    currentEmployee.name = name ? name : currentEmployee.name
    currentEmployee.sex = sex ? sex : currentEmployee.sex
    const result  = await currentEmployee.save()
    res.json(result)
    
}

let getAnEmployee = async(req, res)=> {
 const {id} = req.params
 let employee = await Employee.findOne({_id: id})
 if (!employee){
    return res.status(400).json({'message': `employee with ID: ${id} not found`})
 }
    res.json(employee)
}

let deleteEmployee = async (req, res)=> {
    const {id} = req.params
    if (!id){
        return res.status(400).json({'message': 'employee ID required'})
    }
    const employee = await Employee.findOne({_id: id})
    if (!employee) {
        return res.sataus(204).json({'message': `there's no employee with ID: ${id}`})
    }
    await Employee.deleteOne({_id: id})
    res.json({'message': `employee with ID: ${id} has been deleted`})
    
}




module.exports = {
    getAllEmployees,
    getAnEmployee,
    createEmployee,
    editEmployee,
    deleteEmployee,
}