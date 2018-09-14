const express = require('express')
const control = require('./app/router')
const logger  = require('./app/logger')
const storage = require('./app/storage')
const api = require('./app/api')

const portnum = process.argv[2] ? 
    parseInt(process.argv[2]) : 3000;
const rootDir = process.cwd()
const publicDir = 'public'
const dataDir = 'data'

storage.init(`${rootDir}/${dataDir}`)

logger.info(`Running on port ${portnum}`)

control.db = storage.db()
api.doimport(control.db);

express()
.use('/', control.public(rootDir, publicDir))
.use('/api', control.api(rootDir, control.db))
.listen(portnum, ()=> {
    logger.info(`Server is running...`)
})
