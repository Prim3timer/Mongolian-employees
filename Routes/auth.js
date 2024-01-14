let express = require('express')
let authController = require('../controllers/authController')
let router = express.Router()

router.post('/', authController.loginHandler)

router.get('/', authController.getAllEmployees)

// router.get('/', (req, res)=>{
//     res.json({})
// })


module.exports = router