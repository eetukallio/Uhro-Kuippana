/**
 * Created by Micky on 29.3.2017.
 *//**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './HourEntries.css';
import DataTable from '../DataTable';

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
            ]
        }

        this.fetchData = this.fetchData.bind(this);

        console.log(this.state.data);
    }

    componentDidMount() {
        console.log("starting fetch")
        this.fetchData();
    }

    fetchData() {
        fetch("http://207.154.228.188:3000/workOrders")
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({data: json});
            });
    }

    render() {

        return (
            <div  className="hourEntries">
                <DataTable type="entries" searchInput={this.props.searchInput}
                           data={this.state.data} headers={this.state.headers}/>
            </div>
        );
    }
}

export default HourEntries;