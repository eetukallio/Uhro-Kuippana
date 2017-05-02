/**
 * Created by Eetu Kallio on 2.5.2017.
 */

import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import './WorkerEntries.css';

class WorkerEntries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.setEntries = this.setEntries.bind(this);
        this.fetchEntries = this.fetchEntries.bind(this);
        this.setUpHeaders = this.setUpHeaders.bind(this);
        this.setUpTotalsHeaders = this.setUpTotalsHeaders.bind(this);
        this.setTotals = this.setTotals.bind(this);
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

    setUpTotalsHeaders() {
        return <tr>
            <th> </th>
            <th>Palkkajakso</th>
            <th>Tehdyt tunnit</th>
        </tr>
    }

    setTotals() {

        if (this.state.data === []) return null;

        const dateFormatTmp = this.state.data.map( obj => {
            const dateSplit = obj.date.split('-');
            const day = dateSplit[2].split('T')[0];
            const month = dateSplit[1];
            const year = dateSplit[0];
            obj.date = new Date(year, month-1, day);
            console.log(obj.date);
            return obj;
        });

        const date = new Date();
        let thisSegmentStr;
        let lastSegmentStr;

        let thisSegment = [];
        let lastSegment = [];

        if (date.getDate() <= 15 ) {
            thisSegmentStr = '1.' + (date.getMonth()+1) + '. - 15.' + (date.getMonth()+1);
            lastSegmentStr = '15.' + (date.getMonth()) + '. - '+ (new Date(date.getYear(), date.getMonth()+1, 0).getDate()-1) +'.' + (date.getMonth());

            console.log('before 15th');
            thisSegment = dateFormatTmp.filter(obj =>
                obj.date.getDate() <= 15 &&
                obj.date.getMonth() === date.getMonth() &&
                obj.date.getYear() === date.getYear()
            );
            lastSegment = dateFormatTmp.filter(obj =>
                obj.date.getDate() > 15 &&
                obj.date.getMonth() === date.getMonth()-1 &&
                obj.date.getYear() === date.getYear()
            );

        } else if (date.getDate() >= 15) {
            thisSegmentStr = '15.' + date.getMonth() + '. - '+ new Date(date.getYear(),date.getMonth()+1,0) +'.' + date.getMonth()+2 + '.';
            lastSegmentStr = '1.' + date.getMonth()+1 + '. - 15.' + date.getMonth()+1;

            console.log('after 15th');
            thisSegment = dateFormatTmp.filter(obj => {
                    console.log("This segment:");
                    console.log(
                        obj.date.getDate() > 15 &&
                        obj.date.getMonth() === date.getMonth() &&
                        obj.date.getYear() === date.getYear()
                    );
                    return obj.date.getDate() > 15 &&
                        obj.date.getMonth() === date.getMonth() &&
                        obj.date.getYear() === date.getYear()
                }

            );
            lastSegment = dateFormatTmp.filter(obj =>{
                    console.log("Last segment:")
                    console.log(obj.date.getDate() <= 15 &&
                        obj.date.getMonth() === date.getMonth() &&
                        obj.date.getYear() === date.getYear())

                    return obj.date.getDate() <= 15 &&
                        obj.date.getMonth() === date.getMonth() &&
                        obj.date.getYear() === date.getYear()
                }

            );
        }

        let key = 0;

        const tmp = [thisSegment, lastSegment];

        console.log(tmp);

        const renderedPaychecks = tmp
            .filter(obj => obj.length > 0)
            .map((obj, i) => {
                console.log(obj);
                let totalHours = 0;
                for(const entry of obj) {
                    totalHours += entry.duration;
                }
                key++;

                console.log(lastSegmentStr);

                if (i === 0) {
                    return <tr className="totals" key={i}>
                        <td>Total:</td>
                        <td>{thisSegmentStr}</td>
                        <td>{totalHours}</td>
                    </tr>;
                }

                if (i === 1) {
                    return <tr className="totals" key={i}>
                        <td>Total:</td>
                        <td>{lastSegmentStr}</td>
                        <td>{totalHours}</td>
                    </tr>;
                }



            });
        console.log(renderedPaychecks);
        return renderedPaychecks;
    }

    componentWillReceiveProps(){
        this.fetchEntries();
    }

    fetchEntries() {
        axios.get('/workorders')
            .then((res) => {
                const tmp = res.data.filter(obj =>
                obj.userId === this.props.worker.id);
                console.log("Work orders fetched");
                console.log(res.data);
                this.setState({data: tmp, loadedEntries: true});
            }).catch(err => console.log(err));
    }

    setEntries() {
        const tmp = this.state.data;

        return tmp.filter( function (obj) {
            console.log(obj.userId);
            console.log(this.props.worker.id);
            return obj.userId === this.props.worker.id;
            }, this
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
        <div>


            <Table striped bordered condensed hover>
                <thead>
                {this.setUpHeaders()}
                </thead>
                <tbody>
                {this.setEntries()}

                </tbody>
            </Table>
            <Table striped bordered condensed hover>
                <thead>
                {this.setUpTotalsHeaders()}
                </thead>
                <tbody>
                {this.setTotals()}

                </tbody>
            </Table>

        </div>
        )
    }
}
export default WorkerEntries;