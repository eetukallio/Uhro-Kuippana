/**
 * Created by Micky on 29.3.2017.
 *//**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './HourEntries.css';
import DataTable from '../DataTable';
import axios from 'axios';

class HourEntries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            headers: [
                "Asiakas",
                "Työntekijä",
                "Päivämäärä",
                "Kesto",
                "Työnlaatu",
                "Huomioitavaa"
            ]
        }

        this.fetchData = this.fetchData.bind(this);

        console.log(this.state.data);
    }

    componentDidMount() {
        console.log("starting fetch");
        this.fetchData();
    }

    fetchData() {
        axios.get("/workorders")
            .then( (res) => {
                console.log("fetch done");
                console.log(res.data);
                this.setState({data: res.data});
            });
    }

    render() {

        return (
            <div  className="hourEntries">
                <DataTable type="entries" searchInput={this.props.searchInput}
                           data={this.state.data} headers={this.state.headers}
                           refresh={this.fetchData.bind(this)}/>
            </div>
        );
    }
}

export default HourEntries;