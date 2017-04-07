import React, { Component } from 'react';
import './Management.css';
import {Link} from 'react-router';

class Management extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerData: [],
            workerData: [],
            entryData: [],
            searchInput:""
        }
    }

    componentWillMount() {
       this.fetchData();
    }

    fetchData() {
        fetch("http://207.154.228.188:3000/users")
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({workerData: json});
            });

        fetch("http://207.154.228.188:3000/clients")
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({customerData: json});
            });

        fetch("http://207.154.228.188:3000/workOrders")
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({entryData: json});
            });

    }

    handleSearchInput(e) {
        const searchInput = e.target.value;
        console.log(e.target.value);
        this.setState({
            searchInput
        })
    }

    renderChildren() {
        let wData = this.state.workerData;
        let cData = this.state.customerData;
        let eData = this.state.entryData;
        let searchInput = this.state.searchInput;

        return React.Children.map(this.props.children, child => {

            return React.cloneElement(child, {
                workerData: wData,
                clientData: cData,
                entryData: eData,
                searchInput: searchInput
            });
        });
    }

    render() {

        return (
            <div  className="management">
                <div className="management-nav">
                    <ul >
                        <Link to="/management/entries"><li>Merkinnät</li></Link>
                        <Link to="/management/customers"><li>Asiakkaat</li></Link>
                        <Link to="/management/workers"><li>Työntekijät</li></Link>
                    </ul>
                </div>
                <div className="searchBar">
                    <input onChange={this.handleSearchInput.bind(this)} />
                </div>
                <div className="content">
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}

export default Management;