/**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './Workers.css';
import DataTable from '../DataTable';

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
        }

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        fetch("http://207.154.228.188:3000/users")
            .then( (response) => {
                console.log("fetching...")
                return response.json() })
            .then( (json) => {
                console.log("fetch done");
                console.log(json)
                this.setState({data: [...json]});
                console.log(this.state.data);
            });
    }

    componentDidMount() {

        console.log("ComponentDidMount Workers")

        this.fetchData();
    }

    render() {
        console.log("Workers searchinput: "+this.props.searchInput);

        console.log(this.state.data);

        return (
            <DataTable type="workers" searchInput={this.props.searchInput}
                       data={this.state.data} headers={this.state.headers}/>
        );
    }
}

export default Workers;