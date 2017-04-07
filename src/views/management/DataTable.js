/**
 * Created by Micky on 13.3.2017.
 */

import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            type: this.props.type
        };

        this.setUpTable = this.setUpTable.bind(this);
        this.setUpHeaders = this.setUpHeaders.bind(this);
        this.setWorkers = this.setWorkers.bind(this);
        this.setEntries = this.setEntries.bind(this);
        this.setCustomers = this.setCustomers.bind(this);
    }

    setUpHeaders() {

        let arr = this.state.headers.map(function (head) {
            return <th key={head}>{head}</th>;
        });
        return arr;
    }

    setUpTable() {
        console.log(this.state.type);

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
        let tmp = this.props.data;
        const searchInput = this.props.searchInput;
        console.log("Customers data: " + this.state.data);

        return tmp.filter(function (obj) {
            console.log(obj.name);
            return obj.name.includes(searchInput);
        }).map(function (obj) {
            console.log(obj);
            return <tr key={obj.id}>
                <td key="name">{obj.name}</td>
                <td key="address">{obj.streetAddress}</td>
                <td key="city">{obj.city}</td>
                <td key="zip">{obj.zipCode}</td>
                <td key="ycode">{obj.yCode}</td>
            </tr>;
        });
    }

    setWorkers() {

        const tmp = this.props.data;
        const searchInput = this.props.searchInput;
        console.log("Workers data: ");

        console.log(tmp)

        return tmp.filter(function (obj) {
            console.log("filter")

            return obj.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                obj.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
                obj.streetAddress.toLowerCase().includes(searchInput.toLowerCase());
        }).map(function (obj) {
                console.log("map");
                 return <tr key={obj.id}>
                    <td key="name">{obj.lastName} {obj.firstName}</td>
                    <td key="address">{obj.streetAddress}</td>
                    <td key="city">{obj.city}</td>
                    <td key="zip">{obj.zipCode}</td>
                    <td key="tax">{obj.taxPercent}</td>
                    <td key="wage">{obj.hourWage}</td>
                    <td key="username">{obj.username}</td>
                </tr>;
        });

    }

    setEntries() {
        const tmp = this.props.data;
        const searchInput = this.props.searchInput;


        console.log("Entries data: ");
        console.log(this.props.data);
        return tmp.filter( function (obj) {
                return true;
            }
        ).map(function (obj) {
            return <tr key={obj.id}>
                <td key="user">{obj.clientName} </td>
                <td key="client">{obj.fullName}</td>
                <td key="date">{obj.date}</td>
                <td key="duration">{obj.duration}</td>
                <td key="quality">{obj.quality}</td>
            </tr>
        });
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