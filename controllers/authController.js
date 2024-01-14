let bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const User = require('../views/model/User')

let loginHandler = async (req, res)=> {
    const {user, pswd} = req.body
    if (!user || !pswd) res.status(400).json({"message": "Please enter a username and password"})
    let foundUser = await User.findOne({username: user}).exec()
    if (!foundUser) return res.sendStatus(401)
    let match = await  bcrypt.compare(pswd, foundUser.password)
    if (match){
        let roles = Object.values(foundUser.roles)
        // create JWT
        let accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '60s'}
        )
        let refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        // SAVING REFRESH TOKEN WITH CURRENT USER
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        console.log(result) 
        // WHEN THE HTTPONLY PROPERTY OF THE COOKIE IS SET TO TRUE, IT BECOMES UNVAILABLE TO JAVASCRIPT
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'none',  maxAge: 24*60*60*1000}) // you might need to set the secure prop of this
        // object to true
        res.json({accessToken})
    }
    else {
    return res.sendStatus(401)
}
}

let getAllEmployees = async (req, res)=> {
    const users = await User.find({User})
    res.send(users)
}

module.exports = {loginHandler, getAllEmployees}