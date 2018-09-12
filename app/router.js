const express = require('express')
const fs = require('fs')

const logger = require('./logger.js')

module.exports = {
	public: (rootDir, publicDir) => {
		logger.info(`public('${rootDir}', '${publicDir}'`);
		return express.static(`${rootDir}/${publicDir}`)
	},
	api: (rootDir) => {
		let router  = express.Router()
		
		router.get('/', (req, res, next) => {
			res.send("hello")
			next()
		})
		
		return router;
	}
}
