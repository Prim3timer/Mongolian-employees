let path = require('path')

let {writeFile} = require('fs').promises

let data = {}

data.users = require('../views/model/user.json')

let filePath = path.join(__dirname, '..', 'views', 'model', 'user.json')

let getAllUsers = (req, res)=> {
    res.json(data.users)
}
module.exports = getAllUsers