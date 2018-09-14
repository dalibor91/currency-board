const fs = require('fs')
const db = require('sqlite3')
const logger = require('../logger')
const Promise = require('bluebird')

let _db = {
	_location: null,
	_db: null, 
	exists: () => {
		return fs.existsSync(_db._location)
	},
	db: () => {
		if (!_db._db || !_db._db.open) {
			_install = _db.exists()
			
			if (!_install) {
				logger.info("Create database")
				fs.closeSync(fs.openSync(_db._location, 'w'));
			}
			
			_db._db = new db.Database(_db._location, db.OPEN_READWRITE, (err) => {
				if (err) {
					console.error("There is been error connecting to database")
					console.error(_db._location)
					console.error(err)
					_db._db = null
				} 
			})
			
			if (!_install) {
				_db.recreate()
			}
		}
		
		return _db._db
	}, 
	recreate: () => {
		logger.info("Recreate tables")
		
		_db.db().run(`
			CREATE TABLE exchange (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				value DOUBLE NOT NULL,
				currency TEXT NOT NULL,
				date DATE NOT NULL,
				created DATETIME DEFAULT CURRENT_TIMESTAMP
			);
			CREATE UNIQUE INDEX files_idx ON exchange(currency, date);
		`, (err) => { if (err) { console.error(err) } })
		
		/*_db.db().run(`
			
		`, (err) => { if (err) { console.error(err) } })*/
	},
	init: (location) => {
		_db._location = location
		return _db.db()
	}
};


module.exports = _db
