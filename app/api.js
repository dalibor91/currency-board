const http = require('https')
const logger = require('./logger')
const xml = require('./xml')

class Api {
	constructor(db) {
		this.db = db
	}
	
	getDb() { return this.db }
	
	fetch(callback) {
		http.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml", (res) => {
			let body = ""
			res.on('data', (data) => { body += data; })
			res.on('end', (data) => { 
				callback(new xml(body)) 
			})
		})
	}
	
	fetchAndInsert() {
		this.fetch((_xml) => {
			_xml.onParse((_xmlResult) => {
				console.log(_xmlResult)
			})
		})
	} 
}

const doimport = (db, deley) => {
	deley = deley || 600000
	
	logger.info(`start import delay ${deley}`) 
	let _import = () => {
		logger.info("do currency reimport...")
		
		new Api(db).fetchAndInsert()
	}
	
	_import()
	
	//run on 10 min
	return setInterval(_import, deley)
}

module.exports = {
	doimport: doimport, 
	Api: Api
}
