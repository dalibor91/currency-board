import React from "react";
import ReactDOM from "react-dom";
import ReactTable from "react-table";

import DataProvider from "./utils/dataprovider.js"
import CurChart from "./chart.js"


import "react-table/react-table.css";
import "./style/custom.css"

class App extends React.Component {
    
    constructor() {
        super()
    }
    
    componentDidMount() {
        let dp = new DataProvider()
        
        let self = this;
        dp.get("", (r) => {
            self.setState({
                allData: r.data
            })
        })
    }
    
    
    componentWillUnount() {}
    
    render() {
        let _mainData = this.state && this.state.allData ? this.state.allData : []
        
        return (
            <div id="table-container">
                <div className="table-col">
                    <ReactTable 
                        filterable
                        data={_mainData} 
                        resolveData={data => data.map(row => row)} 
                        columns={[
                          { Header: "Date", accessor: "date" },
                          { Header: "Currency", accessor: "currency" },
                          { Header: 'Value in EUR', accessor: "value"}
                        ]} 
                        className="-striped" 
                        showPageSizeOptions={false}
                    />
                </div>
                <div className="table-col">
                    <ReactTable 
                    filterable
                        data={_mainData} 
                        pivotBy={["currency"]}
                        columns={[
                          { accessor: "currency" },
                          { Header: "Date" , accessor: "date" },
                          { Header: "Currency", accessor: "currency" },
                          { Header: 'Value in EUR', accessor: "value"}
                        ]} 
                        className="-striped" 
                        showPageSizeOptions={false}
                    />
                </div>
                <div className="table-col chart">
                    <CurChart />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App  />, document.getElementById("react-app-container"));
