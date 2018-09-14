import React from "react";
import ReactDOM from "react-dom";
import "./style/custom.css"

class App extends React.Component {
    
    constructor() {
        super()
    }
    
    componentDidMount() {
        //console.log("componentDidMount")
    }
    
    componentWillUnount() {
        //console.log("componentWillUnount")
    }
    
    style() {
        return {
            margin: 0
        }
    }
    
    render() {
        return (
            <div id="app-container" style={this.style()}>
                ...
            </div>
        );
    }
}

ReactDOM.render(<App  />, document.getElementById("react-app-container"));
