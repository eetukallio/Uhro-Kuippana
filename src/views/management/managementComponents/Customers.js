/**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './Customers.css';
import DataTable from '../DataTable';

class Customers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            headers: [
                "Nimi",
                "Osoite",
                "Kaupunki",
                "Postinumero",
                "Y-tunnus",
            ]
        };

        this.fetchData = this.fetchData.bind(this);

        console.log(this.state.data);
    }

    fetchData() {
        fetch("http://207.154.228.188:3000/clients")
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({data: json});
            });
    }

    componentDidMount() {

        this.fetchData();
    }

    render() {

        return (
            <div  className="customers">
                <DataTable type="customers" searchInput={this.props.searchInput} data={this.state.data} headers={this.state.headers}/>
            </div>
        );
    }
}

export default Customers;