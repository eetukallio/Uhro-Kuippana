/**
 * Created by Micky on 13.3.2017.
 */

import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            headers: props.headers,
            type: props.type
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

        let rows = [];

        if(this.state.type === "workers") {
            rows = this.setWorkers();
        } else if(this.state.type === "customers") {
            rows = this.setCustomers();
        } else if(this.state.type === "entries") {
            rows = this.setEntries();
        }
        return rows;
    }

    setCustomers() {
        const tmp = this.state.data;
        const arr = tmp.map(function (obj) {
            return <tr key={obj.id}>
                <td key="name">{obj.name}</td>
                <td key="address">{obj.streetAddress}</td>
                <td key="city">{obj.city}</td>
                <td key="zip">{obj.zipCode}</td>
                <td key="ycode">{obj.yCode}</td>
            </tr>
        });

        return arr;
    }

    setWorkers() {
        const tmp = this.state.data;
        const searchInput = this.props.searchInput;
        console.log(this.props.searchInput);
        console.log("DataTable search: " + this.props.searchInput);

        return tmp.filter(function (obj) {
            return obj.firstName.includes(searchInput) || obj.lastName.includes(searchInput);
        }).map(function (obj) {
                return (<tr key={obj.id}>
                    <td key="name">{obj.lastName} {obj.firstName}</td>
                    <td key="address">{obj.streetAddress}</td>
                    <td key="city">{obj.city}</td>
                    <td key="zip">{obj.zipCode}</td>
                    <td key="tax">{obj.taxPercent}</td>
                    <td key="wage">{obj.hourWage}</td>
                    <td key="username">{obj.username}</td>
                </tr>);
        });

    }

    setEntries() {
        const tmp = this.state.data;
        const arr = tmp.map(function (obj) {
            return <tr key={obj.id}>
                <td key="user">{obj.user} </td>
                <td key="client">{obj.client}</td>
                <td key="date">{obj.date}</td>
                <td key="duration">{obj.duration}</td>
                <td key="quality">{obj.quality}</td>
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