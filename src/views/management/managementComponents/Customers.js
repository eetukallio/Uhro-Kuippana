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
            data : props.clientData,
            headers: [
                "Nimi",
                "Osoite",
                "Kaupunki",
                "Postinumero",
                "Y-tunnus",
            ]
        };

        console.log(this.state.data);
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