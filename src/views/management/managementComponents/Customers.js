/**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './Customers.css';
import DataTable from '../DataTable';
import axios from 'axios';

class Customers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            headers: [
                "Nimi",
                "Osoite",
                "Kaupunki",
                "Postinumero",
                "Y-tunnus",
            ]
        };

        this.fetchData = this.fetchData.bind(this);

        console.log(this.state.data);
    }

    fetchData() {
        axios.get("/clients")
            .then( (res) => {
                console.log("fetch done");
                console.log(res.data);
                this.setState({data: res.data});
            });
    }

    componentDidMount() {

        this.fetchData();
    }

    render() {

        return (
            <div  className="customers">
                <DataTable type="customers" searchInput={this.props.searchInput} data={this.state.data} headers={this.state.headers}
                           refresh={this.fetchData.bind(this)}/>
            </div>
        );
    }
}

export default Customers;