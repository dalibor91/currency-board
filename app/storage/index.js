const fs = require('fs')

const db = require('./database')
const log = require('../logger.js')

const mod = {
	_dir: null,
	db: () => {
		db._location = `${mod._dir}/db.db`
		return db.db()
	},
	_init: () => {
		db.init(`${mod._dir}/db.db`)
	},
	init: (dir) => {
		log.info(`Initialize storage inside ${dir}`)
		mod._dir = dir
		if (!fs.existsSync(mod._dir)) {
			log.info(`Create storage dir ${dir}`)
			fs.mkdirSync(mod._dir)
		}
		mod._init()
	}
}

module.exports = mod
