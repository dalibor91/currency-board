const logger = require('./logger')

class Controller {
	constructor(db) {
		this.db = db 
	}
	
	getDB() {
		return this.db
	}

	all(callback)  {
		this.db.all(`
			SELECT value, currency, date FROM exchange WHERE date > date('now','-31 day') 	
		`, function(err, res) {
			if (err) { logger.error(err); 
			} else {
				callback(res);
			} 
		})
	}

	currencies(callback) {
		this.db.all(`
		SELECT DISTINCT currency as currency FROM exchange 	
		`, function(err, res) {
			if (err) { logger.error(err); 
			} else {
				callback(res);
			} 
		})
	}
	
	dates(callback) {
		this.db.all(`
		SELECT DISTINCT date as date FROM exchange 	
		`, function(err, res) {
			if (err) { logger.error(err); 
			} else {
				callback(res);
			} 
		})
	}
	
	date(date, callback) {
		this.db.all(`
			SELECT value, currency, date FROM exchange WHERE date = ?
		`, [ date ], function(err, res) {
			if (err) { logger.error(err); 
			} else {
				callback(res);
			} 
		})
	}
	
	currency(cur, callback) {
		this.db.all(`
			SELECT value, currency, date FROM exchange WHERE currency = ? AND date > date('now','-31 day')
		`, [ cur ], function(err, res) {
			if (err) { logger.error(err); 
			} else {
				callback(res);
			} 
		})
	}
}


module.exports = Controller
