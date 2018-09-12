module.exports = {
	_log: function(msg, type) {
		console.log(`[ ${type} ] : ${msg}`)
	}, 
	debug: function(msg) { this._log(msg, 'debug'); },
	info: function(msg) { this._log(msg, 'info'); }, 
	warning: function(msg) { this._log(msg, 'warning'); }, 
	error: function(msg) { this._log(msg, 'error'); }
}
