const User = require('../views/model/User')

let logoutHandler =  async (req, res)=> {
    // ON CLIENT ALSO DELETE THE ACCESS TOKEN
    const cookies = req.cookies
// if there is no cookies or jwt
    if (!cookies?.jwt) res.sendStatus(204) // no content
    const refreshToken = cookies.jwt
    //IS THE REFRESH TOKEN IN THE DATABASE?
    let foundUser = await User.findOne({refreshToken: refreshToken}).exec()
    if (!foundUser){
        res.clearCookie('jwt', {httponly: true})
        return res.sendStatus(204) 
    }
    
    // DELETE REFRESH TOKEN
    foundUser.refreshToken = ''
    let result = foundUser.save()
    console.log(result)

    res.clearCookie('jwt', {httponly: true}) // secure: true only serves on https
    res.sendStatus(204)
}

let getAllEmployees = async (req, res)=> {
    res.send(userDB.users)
}

module.exports = {logoutHandler, getAllEmployees}