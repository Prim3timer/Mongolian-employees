

const jwt = require('jsonwebtoken')
const User = require('../views/model/User')

let refreshTokenHandler =  async (req, res)=> {
    const cookies = req.cookies
// if there is no cookies or jwt
    if (!cookies?.jwt) res.sendStatus(401) // unauthorized
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    let foundUser = await User.findOne({refreshToken}).exec()
    if (!foundUser) return res.sendStatus(403) // forbidden
    
    // verify jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) res.sendStatus(403)
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "userInfo": decoded.username,
                    "roles": roles
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
                )
                res.json({accessToken})
        }
    )
}

let getAllEmployees = async (req, res)=> {
    res.send(userDB.users)
}

module.exports = {refreshTokenHandler, getAllEmployees}