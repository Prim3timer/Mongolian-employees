const corsOptions = require('../config/corsOptions')

let credentials = (req, res, next)=> {
    const origin = req.headers.origin
    if (corsOptions.whiteList.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}


module.exports = credentials