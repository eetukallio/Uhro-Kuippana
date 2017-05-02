/**
 * Created by Eetu Kallio on 2.5.2017.
 */

import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';

class WorkerEntries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.setEntries = this.setEntries.bind(this);
        this.fetchEntries = this.fetchEntries.bind(this);
        this.setUpHeaders = this.setUpHeaders.bind(this);
    }

    setUpHeaders() {
        return <tr>
            <th>Asiakas</th>
            <th>Työntekijä</th>
            <th>Päivämäärä</th>
            <th>Kesto</th>
            <th>Työnlaatu</th>
            <th>Huomioitavaa</th>
        </tr>
    }

    componentDidMount(){
        this.fetchEntries();
    }

    fetchEntries() {
        axios.get("/workorders")
            .then( (res) => {
                console.log("fetch done");
                console.log(res.data);
                this.setState({data: res.data});
            });
    }

    setEntries() {
        const tmp = this.state.data;

        return tmp.filter( function (obj) {
            obj.userID === this.props.worker.id
            }
        ).map(function (obj, i) {
            return <tr key={i}>
                <td key="user">{obj.clientName} </td>
                <td key="client">{obj.fullName}</td>
                <td key="date">{obj.date.split('T')[0]}</td>
                <td key="duration">{obj.duration}</td>
                <td key="quality">{obj.quality}</td>
                <td key="additionalInfo">{obj.additionalInfo} </td>
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
                {this.setEntries()}
                </tbody>
            </Table>
        )
    }
}
export default WorkerEntries;