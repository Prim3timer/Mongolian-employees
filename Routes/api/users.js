let express = require('express')
let router = express.Router()

const getAllUsers = require('../../controllers/userController')
let verifyRoles = require('../../middleware/verifyRoles')
let ROLES_LIST = require('../../config/roles_list')

router.route('/')
.get(verifyRoles(ROLES_LIST.Admin), getAllUsers)

module.exports = router
