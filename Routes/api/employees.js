let express = require('express')
let router = express.Router()

let {
    getAllEmployees,
    getAnEmployee,
    createEmployee,
    editEmployee,
    deleteEmployee,
} = require('../../controllers/employeeControllers')

let ROLES_LIST = require('../../config/roles_list')
let verifyRoles = require('../../middleware/verifyRoles')




router.route('/')
.get(getAllEmployees)
.post(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor), createEmployee)
// .post(createEmployee)

router.route('/:id')
.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), editEmployee)

router.route('/:id')
.get(getAnEmployee)
router.route('/:id')
.delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)
router.route('/')







module.exports = router