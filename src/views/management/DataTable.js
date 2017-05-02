/**
 * Created by Micky on 13.3.2017.
 */

import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import WorkerEntries from './managementComponents/WorkerEntries';
import axios from 'axios';
import {Collapse} from 'react-bootstrap';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            type: this.props.type,
            displayWorkerSpecific: false,
            editingCell: '',
            deleteRow: ''
        };

        this.setUpTable = this.setUpTable.bind(this);
        this.setUpHeaders = this.setUpHeaders.bind(this);
        this.setWorkers = this.setWorkers.bind(this);
        this.setEntries = this.setEntries.bind(this);
        this.setCustomers = this.setCustomers.bind(this);

        this.saveRow = this.saveRow.bind(this);
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
            return <tr className={"clients_row_"+obj.id} key={obj.id}>
                <td className="name" key="name">{obj.name}</td>
                <td className="streetAddress" key="address">{obj.streetAddress}</td>
                <td className="city" key="city">{obj.city}</td>
                <td className="zipCode" key="zip">{obj.zipCode}</td>
                <td className="yCode" key="ycode">{obj.yCode}</td>
                <td key="edit">
                    {this.state.editingCell === obj.id ?
                        <a href="#" className="glyphicon glyphicon-ok" style={{color: "green"}} onClick={() => this.saveRow("clients", obj.id)} />
                        : <a href="#" className="glyphicon glyphicon-ok" onClick={() => this.saveRow("clients", obj.id)} />}
                </td>
                <td key="delete">
                    {this.state.deleteRow === obj.id ?
                        <a href="#" style={{color: "red"}} className="confirm" onClick={() => this.deleteSelected("clients", obj.id)}>OK?</a>
                        : <a href="#" style={{color: "darkred"}} className="glyphicon glyphicon-remove" onClick={() => this.deleteSelected("clients", obj.id)} /> }
                </td>
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
                 return <tr className={"users_row_"+obj.id} key={obj.id}>
                    <td className="name" key="name" onClick={() => this.showWorkerSpecific(obj)}>{obj.lastName} {obj.firstName}</td>
                    <td className="streetAddress" key="address">{obj.streetAddress}</td>
                    <td className="city" key="city">{obj.city}</td>
                    <td className="zipCode" key="zip">{obj.zipCode}</td>
                    <td className="taxPercent" key="tax">{obj.taxPercent}</td>
                    <td className="hourWage" key="wage">{obj.hourWage}</td>
                    <td className="username" key="username">{obj.username}</td>
                     <td key="edit">
                         {this.state.editingCell === obj.id ? <a href="#" className="glyphicon glyphicon-ok" style={{color: "green"}} onClick={() => this.saveRow("users", obj.id)} />
                             : <a href="#" className="glyphicon glyphicon-ok" onClick={() => this.saveRow("users", obj.id)} />}
                     </td>
                     <td key="delete">
                         {this.state.deleteRow === obj.id ?
                             <a href="#" style={{color: "red"}} className="confirm" onClick={() => this.deleteSelected("users", obj.id)}>OK?</a>
                             : <a href="#" style={{color: "darkred"}} className="glyphicon glyphicon-remove" onClick={() => this.deleteSelected("users", obj.id)} /> }
                     </td>
                </tr>;
        }, this);
    }

    saveRow(tableName, id) {
        const cells = document.getElementsByClassName(tableName + "_row_" + id)[0].cells;
        if (this.state.editingCell === id) {
            this.setState({editingCell: ''});
            let data = {};
            for (let i = 0; i < cells.length-2; i++) {
                if (tableName === "users" && cells[i].className === "name") {
                    let names = cells[i].innerText.split(" ");
                    data = Object.assign(data, {firstName: names[1], lastName: names[0]});
                } else {
                    data = Object.assign(data, {[cells[i].className]: cells[i].innerText});
                    cells[i].contentEditable = "false";
                }
            }
            console.log(data);

            axios.put("/" + tableName+ "/" + id, data)
                .then( (res) => {
                    console.log("put'd");
                    console.log(res.data);
                    this.setState({data: res.data});
                });
        } else {
            this.setState({editingCell: id});
            console.log(cells);
            for (let i = 0; i < cells.length-1; i++) {
                cells[i].contentEditable = "true";
            }
        }
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
                <td key={"user_"+i}>{obj.clientName} </td>
                <td key={"client_"+i}>{obj.fullName}</td>
                <td key={"date_"+i}>{obj.date.split('T')[0]}</td>
                <td key={"duration_"+i}>{obj.duration}</td>
                <td key={"quality_"+i}>{obj.quality}</td>
                <td key={"additionalInfo_"+i}>{obj.additionalInfo} </td>
                <td key="delete">
                    <a href="#" className="glyphicon glyphicon-remove" onClick={() => this.deleteSelected("workorders", obj.id)} />
                </td>
            </tr>
        }, this);
    }

    deleteSelected(tableName, id) {
        if (this.state.deleteRow === id) {
            this.setState({deleteRow: ''});
            axios.delete("/" + tableName + "/" + id)
                .then((res) => {
                    console.log("delete'd");
                    console.log(res.data);
                })
                .catch(err => console.log(err));
        } else {
            this.setState({deleteRow: id});
            let that = this;
            setTimeout(function () {
                 that.setState({deleteRow: ''});
            }, 3000);
        }
    }

    render() {
        return (
            <div>
                {this.state.displayWorkerSpecific === true ?
                    <Collapse in={this.state.displayWorkerSpecific}>
                    <div>
                        <WorkerEntries worker = {this.state.displayedWorker}/>
                    </div>
                    </Collapse>: null}

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