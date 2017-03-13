/**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './Customers.css';
import DataTable from './DataTable';

class Customers extends Component {

    render() {
        return (
            <div  className="customers">
                <DataTable src="http://207.154.228.188:3000/users"/>
            </div>
        );
    }
}

export default Customers;