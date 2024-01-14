let express = require('express')
let refreshController = require('../controllers/refreshTokenController')
let router = express.Router()

router.get('/', refreshController.refreshTokenHandler)

router.get('/', refreshController.getAllEmployees)

module.exports =  router
