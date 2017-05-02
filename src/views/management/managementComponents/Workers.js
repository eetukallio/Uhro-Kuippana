/**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './Workers.css';
import DataTable from '../DataTable';
import axios from 'axios';

class Workers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            headers: [
                "Nimi",
                "Osoite",
                "Kaupunki",
                "Postinumero",
                "Veroprosentti",
                "Tuntipalkka",
                "Käyttäjätunnus"
            ]
        };

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        axios.get("/users")
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
        console.log("render workers data:");
        console.log(this.state.data);

        return (
        <div>
            <div className="workers">
                <DataTable type="workers" searchInput={this.props.searchInput}
                           data={this.state.data} headers={this.state.headers}/>
            </div>
        </div>
        );
    }
}

export default Workers;