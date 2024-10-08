const {format} = require('date-fns')
const {v4: uuid} = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async(message, logName) => {
    const dateTime = `${format(new Date(), 'dd/MM/yyyy\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try{
        if(!fs.existsSync('../logs')){
            await fsPromises.mkdir('../logs')
        }
        await fsPromises.appendFile(path.join(__dirname,'..', 'logs', logName), logItem)
    } catch (err) {
        console.error(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\t${req.ip}`, 'reqLog.txt')
    next()
}

module.exports = {logger, logEvents}