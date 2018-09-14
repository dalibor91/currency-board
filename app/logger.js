module.exports = {
	_log  : function(msg, type) { 
		if (typeof msg != 'string') {
			return console.log(msg)
		}
		return console[type](`[ ${(new Date).toISOString()} ] [ ${type} ]: ${msg}`) 
	},
	log   : function(msg) { return this._log(msg, 'log'); },
	debug : function(msg) { return this._log(msg, 'debug'); }, 
	info  : function(msg) { return this._log(msg, 'info'); }, 
	warning:function(msg) { return this._log(msg, 'debug'); }, 
	error : function(msg) { return this._log(msg, 'error'); }
}
