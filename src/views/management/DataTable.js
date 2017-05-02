/**
 * Created by Micky on 13.3.2017.
 */

import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import WorkerEntries from './managementComponents/WorkerEntries';
import axios from 'axios';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            type: this.props.type,
            displayWorkerSpecific: false
        };

        this.setUpTable = this.setUpTable.bind(this);
        this.setUpHeaders = this.setUpHeaders.bind(this);
        this.setWorkers = this.setWorkers.bind(this);
        this.setEntries = this.setEntries.bind(this);
        this.setCustomers = this.setCustomers.bind(this);

        this.deleteSelected = this.deleteSelected.bind(this);
        this.showWorkerSpecific = this.showWorkerSpecific.bind(this);
    }

    showWorkerSpecific(worker) {
        this.setState({displayWorkerSpecific: true, displayedWorker: worker})
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
                <td key="delete"><a href="#" className="glyphicon glyphicon-remove" onClick={() => this.deleteSelected("clients", obj.id)} /></td>
            </tr>;
        }, this);
    }

    setWorkers() {

        const tmp = this.props.data;
        const searchInput = this.props.searchInput;
        console.log("Workers data: ");

        console.log(tmp);

        return tmp.filter(function (obj) {
            console.log("filter");

            return obj.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                obj.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
                obj.streetAddress.toLowerCase().includes(searchInput.toLowerCase());
        }).map(function (obj) {
                console.log("map");
                 return <tr key={obj.id} onClick={() => this.showWorkerSpecific(obj)}>
                    <td key="name">{obj.lastName} {obj.firstName}</td>
                    <td key="address">{obj.streetAddress}</td>
                    <td key="city">{obj.city}</td>
                    <td key="zip">{obj.zipCode}</td>
                    <td key="tax">{obj.taxPercent}</td>
                    <td key="wage">{obj.hourWage}</td>
                    <td key="username">{obj.username}</td>
                     <td key="delete"><a href="#" className="glyphicon glyphicon-remove" onClick={() => this.deleteSelected("users", obj.id)} /></td>
                </tr>;
        }, this);

    }

    setEntries() {
        const tmp = this.props.data;
        const searchInput = this.props.searchInput;

        console.log("Entries data: ");
        console.log(this.props.data);
        return tmp.filter( function (obj) {
                return obj.clientName.toLowerCase().includes(searchInput.toLowerCase()) ||
                    obj.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
                    obj.date.split('T')[0].toLowerCase().includes(searchInput.toLowerCase());
            }
        ).map(function (obj, i) {
            return <tr key={i}>
                <td key="user">{obj.clientName} </td>
                <td key="client">{obj.fullName}</td>
                <td key="date">{obj.date.split('T')[0]}</td>
                <td key="duration">{obj.duration}</td>
                <td key="quality">{obj.quality}</td>
                <td key="additionalInfo">{obj.additionalInfo} </td>
                <td key="delete"><a href="#" className="glyphicon glyphicon-remove" onClick={() => this.deleteSelected("workorders", obj.id)} /></td>
            </tr>
        }, this);
    }

    deleteSelected(tableName, id) {
        axios.delete("/" + tableName + "/" + id)
            .then((res) => {
                console.log("delete'd");
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                {this.state.displayWorkerSpecific === true ?
                    <div>
                        <WorkerEntries worker = {this.state.displayedWorker}/>
                    </div> : null}
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
            </div>
        )
    }
}
 export default DataTable;