const User = require('../views/model/User')
let bcrypt = require('bcrypt')

let newUserHandler = async (req, res) => {
    let {user, pswd} = req.body
    if (!user || !pswd) res.status(400).json({"message": "please provide username and password"})
    newUser = {user, pswd}

    // CHECK FOR DUPLICATE USER
    let duplicate = await User.findOne({username: user}).exec()
    if(duplicate) res.sendStatus(409) //conflict statuscode
    try {
        // ENCRYPT THE PASSWORD
        let hashedPswd = await bcrypt.hash(pswd, 10)

        //CREATE AND STORE NEW USER
        const result = await User.create({
            "username": user,
             "password": hashedPswd
            })
            console.log(result)
       
            res.status(201).json({'success': `new user ${user} created`})
    } catch (error) {
        res.status(500).json({"message": error.message})
}
}

module.exports = {newUserHandler}