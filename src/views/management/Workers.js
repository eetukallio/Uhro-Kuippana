/**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './Workers.css';
import DataTable from './DataTable';

class Workers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : props.workerData,
            workerData: [],
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
    }

    componentDidMount(){

    }

    render() {
        console.log("Workers searchinput: "+this.props.searchInput);
        return (
            <div  className="workers">
                <DataTable type="workers" searchInput={this.props.searchInput}
                           data={this.state.data} headers={this.state.headers}/>
            </div>
        );
    }
}

export default Workers;