const express = require('express')
const fs = require('fs')

const logger = require('./logger.js')
const DBProv = require('./dbprovider.js')

module.exports = {
	public: (rootDir, publicDir) => {
		logger.info(`public('${rootDir}', '${publicDir}'`);
		return express.static(`${rootDir}/${publicDir}`)
	},
	api: (rootDir, db) => {
		let router  = express.Router()
		let provider= new DBProv(db)
		
		//add for debug
		router.get('*', (req, res, next) => {
			logger.info("GET *")
			res.setHeader('Access-Control-Allow-Origin', '*');
			next()
		})
		
		router.get('/', (req, res, next) => {
			logger.info("GET /api")
			provider.all((r) => { res.send(r) })
		}).get('/currency', (req, res, next) => {
			logger.info("GET /api/currency")
			provider.currencies((r) => { res.send(r) })
		}).get('/currency/:currency', (req, res, next) => {
			logger.info(`GET /api/currency/${req.params.currency}`)
			provider.currency(req.params.currency, (r) => { res.send(r) })
		}).get('/date', (req, res, next) => {
			logger.info("GET /api/date")
			provider.dates((r) => { res.send(r) })
		}).get('/date/:date', (req, res, next) => {
			logger.info(`GET /api/date/${req.params.date}`)
			provider.date(req.params.date, (r) => { res.send(r) })
		})
		
		return router;
	}
}
