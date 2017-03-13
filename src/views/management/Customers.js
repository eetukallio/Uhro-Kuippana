/**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './Customers.css';
import {Table} from 'react-bootstrap';

class Customers extends Component {

    render() {
        return (
            <div  className="customers">

                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Osoite</th>
                        <th>Puhelinnumero</th>
                        <th>Y-tunnus</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Janin Taksi</td>
                        <td>Toijalankuja 11</td>
                        <td>0400213555</td>
                        <td>07398583</td>
                    </tr>
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default Customers;