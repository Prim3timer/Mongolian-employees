// Cross Origin Resource Sharing
// the whiteList are list of domains that allowed access to the server
let whiteList = [
    'https://www.google.com', 
    'http://127.0.0.1:5500', 
    'http://127.0.0.1:5000'
]
let corsOptions = {
    origin: (origin, callback) => {
        // if domain is in the whiteList or if origin is undefined or false
        if(whiteList.indexOf(origin) !== -1 || !origin){
            // let it pass
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200

}

module.exports = {corsOptions, whiteList}