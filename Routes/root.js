let express = require("express")
let path = require('path')
let router = express.Router()




router.get('^/$|/index(.html)?', async (req, res)=> {
    let filePath = path.join(__dirname, '..', 'views', 'index.html')
        // let data =  await fs.readFile(filePath, 'utf-8')
        res.sendFile(filePath)
       
    })


module.exports = router