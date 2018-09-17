import React from "react";
import ReactDOM from "react-dom";
import ReactTable from "react-table";

import DataProvider from "./utils/dataprovider.js"

import "react-table/react-table.css";
import "./style/custom.css"

class App extends React.Component {
    
    constructor() {
        super()
    }
    
    componentDidMount() {
        let dp = new DataProvider("http://localhost:3000/api")
        let self = this;
        dp.get("", (r) => {
            self.setState({
                rows: r.data
            })
        })
    }
    
    componentWillUnount() {}
    
    render() {
        let _rows = this.state && this.state.rows ? this.state.rows : []
        const _columns = [
          { Header: "Date", accessor: "date" },
          { Header: "Currency", accessor: "currency" },
          { Header: 'Value in EUR', accessor: "value"}
        ];
        return (
            <div id="table-container">
                <ReactTable data={_rows} columns={_columns} className="-striped" />
            </div>
        );
    }
}

ReactDOM.render(<App  />, document.getElementById("react-app-container"));
