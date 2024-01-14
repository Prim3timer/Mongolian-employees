let express = require('express')
let logoutController = require('../controllers/logoutController')
let router = express.Router()

router.get('/', logoutController.logoutHandler)

router.get('/', logoutController.getAllEmployees)

module.exports =  router
