
const xml2js = require('xml2js')
/*
class XMLResult {
	constructor(cube) {
		this.cube = cube
	}
	
	getCube() {
		return new XMLResult(this.cube['Cube'])
	}
	
	hasCube() {
		if (this.getResult())
			return true
		return false
	}
	
	getResult() {
		return this.cube['Cube']
	}
	
	getAttr(name) {
		return this.cube['$'][name]
	}
	
	hasAttr()
}
*/

class XML {
	constructor(data) {
		const self = this 
		this.parsed = false 
		this.callback = (res) => {}
		xml2js.parseString(data, (err, res) => {
			if (err) {
				console.error(err)
			} else {
				self.result = res
			}
			self.callback(self.getResults())
			self.parsed = true
		})
	}
	
	onParse(clb) {
		if (this.parsed) {
			clb(this.getResults())
		} else {
			this.callback = clb
		}
	}
	
	getResults() {
		let data = {}
		
		if (this.result['gesmes:Envelope']) {
			let first = this.result['gesmes:Envelope']
			if (first['Cube']) {
				let second = first['Cube']
				if (second[0] && second[0]['Cube']) {
					let final = second[0]['Cube']
					
					for (var i in final) {
						let tmpdt = final[i]['$'].time
						data[tmpdt] = []
						
						for (var j in final[i]['Cube']) {
							
							let cube = final[i]['Cube'][j]['$']
							
							data[tmpdt].push(cube)
						}
					}
					
				}
			}
		}
		return data
	}
}

module.exports = XML
