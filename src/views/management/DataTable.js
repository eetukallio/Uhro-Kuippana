/**
 * Created by Micky on 13.3.2017.
 */

import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        console.log("Datatable");
        this.state = {
            data: "",
            src: props.src
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        console.log("fetchData()");
        const request = new XMLHttpRequest();
        request.open("GET", this.state.src, false);
        request.send(null);
        const returnValue = request.responseText;
        let mydata = JSON.parse(returnValue);
        let rows = [];

        mydata.forEach(function (user) {

            rows.push(
                <tr>
                    <td>{user.lastName} {user.firstName}</td>
                    <td>{user.streetAddress}</td>
                    <td>{user.city}</td>
                    <td>{user.zipCode}</td>
                    <td>{user.taxPercent}</td>
                    <td>{user.hourWage}</td>
                    <td>{user.username}</td>
                </tr>
            )
        });
        this.setState({
            data: rows
        })
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Nimi</th>
                    <th>Osoite</th>
                    <th>Kaupunki</th>
                    <th>Postinumero</th>
                    <th>Veroprosentti</th>
                    <th>Tuntipalkka</th>
                    <th>Käyttäjätunnus</th>
                </tr>
                </thead>
                <tbody>
                    {this.fetchData}
                </tbody>
            </Table>
        )
    }
}
 export default DataTable;