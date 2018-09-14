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
		const self = this;
		this.fetch((_xml) => {
			_xml.onParse((_xmlResult) => {
				for (var date in _xmlResult) {
					((date, rows) => {
						self.getDb().get(`SELECT count(*) as cnt FROM exchange WHERE date = ?`, [date], (err, row) => {
							
							if (err) { 
								logger.error(err); 
							}
							else {
								if (row.cnt == 0) {
									logger.info(`Insert for ${date} , ${rows.length} records`)
									rows.forEach((val) => {
										self.getDb().run(`
											INSERT INTO exchange (date, value, currency) VALUES (? , ?, ?)  
										`, [ date, val.rate, val.currency ], (err) => {
											if (err) { 
												logger.error(err) 
											}
										});
									})
								}
							}
						})
					})(date, _xmlResult[date])
				}
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
