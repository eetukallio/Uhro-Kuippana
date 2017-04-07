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

    componentWillReceiveProps(nextProps) {
        this.setState({
            data : nextProps.workerData
        });
    }

    render() {
        console.log("Workers data: "+this.state.data);
        return (
            <div  className="workers">
                <DataTable type="workers" searchInput={this.props.searchInput}
                           data={this.state.data} headers={this.state.headers}/>
            </div>
        );
    }
}

export default Workers;