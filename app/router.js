const express = require('express')
const fs = require('fs')

const logger = require('./logger.js')
const ctrl   = require('./controllers.js')

module.exports = {
	public: (rootDir, publicDir) => {
		logger.info(`public('${rootDir}', '${publicDir}'`);
		return express.static(`${rootDir}/${publicDir}`)
	},
	api: (rootDir, db) => {
		let router  = express.Router()
		let _ctrl  	= new ctrl(db)
		
		router.get('/', (req, res, next) => {
			logger.info("GET /api")
			_ctrl.all((r) => { res.send(r) })
		})
		
		router.get('/currency', (req, res, next) => {
			logger.info("GET /api/currency")
			_ctrl.currencies((r) => { res.send(r) })
		})
		
		router.get('/currency/:currency', (req, res, next) => {
			logger.info(`GET /api/currency/${req.params.currency}`)
			_ctrl.currency(req.params.currency, (r) => { res.send(r) })
		})
		
		router.get('/date', (req, res, next) => {
			logger.info("GET /api/date")
			_ctrl.dates((r) => { res.send(r) })
		})
		
		router.get('/date/:date', (req, res, next) => {
			logger.info(`GET /api/date/${req.params.date}`)
			_ctrl.date(req.params.date, (r) => { res.send(r) })
		})
		
		return router;
	}
}
