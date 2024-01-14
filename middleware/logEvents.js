let {format} = require('date-fns')
let {v4: uuid} = require('uuid')

let fsPromises = require('fs').promises
let path = require('path')
const { existsSync } = require('fs')

let logEvents = async (message, logName) => {
    let dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    let logItem = `${dateTime}\t${uuid()} ${message}\n`
    console.log(logItem)
    try {
        // Here we are moving up one directroy level and then into the 'logs'
        // folder because we don't want to create the log event inside the middlewre
        //folder.
        if (!existsSync(path.join(__dirname, '..', 'logs'))){
            // create the log folder
            fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        //testing
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
        
    } catch (error) {
        console.log(error)
    }
}

let logger = (req, res, next)=> {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    next()
}

module.exports = {logEvents, logger}