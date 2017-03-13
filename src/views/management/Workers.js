/**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './Workers.css';
import {Table} from 'react-bootstrap';

class Workers extends Component {
    
    render() {
        return (
            <div  className="workers">
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Osoite</th>
                        <th>Puhelinnumero</th>
                        <th>Veroprosentti</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Jani Pekkala</td>
                        <td>Toijalankuja 12</td>
                        <td>0400213543</td>
                        <td>12</td>
                    </tr>
                    </tbody>
                </Table>
                    
            </div>
        );
    }
}

export default Workers;