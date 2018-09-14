const logger = require('./logger')

class DBProvider {
	constructor(db) {
		this.db = db 
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
				callback(res.map(x => x.currency));
			} 
		})
	}
	
	dates(callback) {
		this.db.all(`
		SELECT DISTINCT date as date FROM exchange 	
		`, function(err, res) {
			if (err) { logger.error(err); 
			} else {
				callback(res.map(x => x.date));
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


module.exports = DBProvider
