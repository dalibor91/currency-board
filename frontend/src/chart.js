import React from "react";
import ReactDOM from "react-dom";
import { LineChart, PieChart } from 'react-chartkick'
import DataProvider from "./utils/dataprovider.js"


export default class CurChart extends React.Component {
	constructor() {
        super()
    }
	
	componentDidMount() {
        let dp = new DataProvider()
        
        let self = this;        
        dp.get("/currency?arr=1&filter[]=USD&filter[]=CAD&filter[]=GBP&filter[]=DKK", (r) => {
            self.setState({
                currencyData: r.data
            })
        })
    }
	
	render () {
		let cd = this.state && this.state.currencyData ? this.state.currencyData : null
		if (cd) 
			return <LineChart data={cd} />
		return ""
	}
}
