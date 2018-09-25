import axios from "axios";


export default class DataProvider {
	
	constructor(url) {
		this.url = url || "http://localhost:3000/api"
	}
	
	get(path, callback) {
		let self = this
		axios.get(`${this.url}/${path}`).then((response => {
			self.response = response
			callback(self.response)
		}))
	}
	
}
