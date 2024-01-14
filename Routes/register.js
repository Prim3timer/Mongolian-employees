const express = require('express')
const router = express.Router()
const registerController = require('../controllers/registerController')
// const users = require('../views/model/user.json')

router.post('/', registerController.newUserHandler)

router.get('/', (req, res)=>{
    try {
        res.status(201).json({users}) 
        
    } catch (error) {
      res.status(500).json({"message": error.message})  
    }
})
    


module.exports = router 