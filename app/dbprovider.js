const logger = require('./logger')
const moment = require('moment')


let processDate = (date, format) => {
	let fmt = format || 'YYYY-MM-DD'
	let dt = moment(date, fmt)
	
	return {
		day: dt.day(), 
		month: dt.month(), 
		year: dt.year(), 
		hour: dt.hour(), 
		minute: dt.minute(), 
		second: dt.second(), 
		_raw: date
	}
}


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
		this.all((res) => {
			let data = {};
			for (var i in res) {
				if (!data[res[i].currency]) {
					data[res[i].currency] = [];
				}
				data[res[i].currency].push({
					value: res[i].value, 
					date: res[i].date
				})
			}
			
			callback(data)
		})
	}
	
	currenciesArr(callback, filter) {
		this.currencies((res) => {
			let data = [];
			for (var i in res) {
				let tmp = {};
				
				res[i].forEach((elem) => {
					tmp[elem.date] = elem.value
				})
				
				if (typeof filter == 'object') {
					if (filter.indexOf(i) >= 0) {
						data.push({
							name: i, 
							data: tmp
						})
					}
				} else {				
					data.push({
						name: i, 
						data: tmp
					})
				}
			}
			
			callback(data)
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
