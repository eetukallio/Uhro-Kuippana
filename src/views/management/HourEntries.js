/**
 * Created by Micky on 29.3.2017.
 *//**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './HourEntries.css';
import DataTable from './DataTable';

class HourEntries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : props.entryData,
            headers: [
                "Asiakas",
                "Työntekijä",
                "Päivämäärä",
                "Kesto",
                "Työnlaatu",
            ]
        }

        console.log(this.state.data);
    }

    render() {
        return (
            <div  className="hourEntries">
                <DataTable type="entries" searchInput={this.props.searchInput} data={this.state.data} headers={this.state.headers}/>
            </div>
        );
    }
}

export default HourEntries;