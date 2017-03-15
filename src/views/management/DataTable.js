/**
 * Created by Micky on 13.3.2017.
 */

import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            headers: props.headers
        }
        this.setUpTable = this.setUpTable.bind(this);
        this.setUpHeaders = this.setUpHeaders.bind(this);
    }

    setUpHeaders() {

        let arr = this.state.headers.map(function (head) {
            return <th>{head}</th>;
        });
        return arr;
    }



    setUpTable() {
        console.log(this.state.data);
        const tmp = this.state.data;
        const arr = tmp.map(function (obj) {
            return <tr key={obj.id}>
                    <td key="name">{obj.lastName} {obj.firstName}</td>
                <td key="address">{obj.streetAddress}</td>
                <td key="city">{obj.city}</td>
                <td key="zip">{obj.zipCode}</td>
                <td key="tax">{obj.taxPercent}</td>
                <td key="wage">{obj.hourWage}</td>
                <td key="username">{obj.username}</td>
                     </tr>
        });

        return arr;
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    {this.setUpHeaders()}
                </tr>
                </thead>
                <tbody>
                    {this.setUpTable()}
                </tbody>
            </Table>
        )
    }
}
 export default DataTable;