/**
 * Created by eetukallio on 18.4.2017.
 */

import React, { Component } from 'react';
import './Paycheck.css';

class Paycheck extends Component {

    constructor(props) {

        super(props);
        this.state = {
            user: {},
            firstName: "nimi",
            entries: [],
            lastName: "sukunimi",
            hourWage: 0,
            streetAddress: "-",
            taxPercent: "%",
            zipCode: 11111,
            city: "Kaupunki",
            receivedProps: false
        };

        this.setPaychecks = this.setPaychecks.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (this.props !== nextProps) {

            console.log(nextProps);

            this.setState({
                user: nextProps.user,
                entries: nextProps.entries,
                firstName: nextProps.user.firstName,
                lastName: nextProps.user.lastName,
                hourWage: nextProps.user.hourWage,
                streetAddress: nextProps.user.streetAddress,
                taxPercent: nextProps.user.taxPercent,
                zipCode: nextProps.user.zipCode,
                city: nextProps.user.city,
                receivedProps: true
            });
            console.log("Paycheck state:");
            console.log(this.state);
        }
    }

    setPaychecks() {

        console.log('setPaycheck states:');
        console.log(this.state.entries);
        console.log(this.state.user);

        const tmp = this.state.entries.map( obj => {
            const dateSplit = obj.date.split('-');
            const day = dateSplit[2].split('T')[0];
            const month = dateSplit[1];
            const year = dateSplit[0];
            obj.date = new Date(year, month-1, day);
            console.log(obj.date);
            return obj;
        });

        const date = new Date();
        console.log(date);
        console.log(new Date(date.getYear(),date.getMonth()+1,0));
        console.log(new Date(date.getYear(), date.getMonth(), 15));

        if (date.getTime() <= new Date(date.getYear(), date.getMonth(), 15)) {
            console.log(date)
        } else if (date.getTime() <= new Date(date.getYear(),date.getMonth()+1,0)) {
            console.log('Last day of month:');
        }

        return <div className="paycheckSheet">
            <div className="personalInfo">
                <span id="name">{this.state.firstName + " " + this.state.lastName}</span><br />
                <span className="additionalInfo">{this.state.streetAddress}</span><br />
                <span className="additionalInfo">{this.state.zipCode}</span><br />
                <span className="additionalInfo">{this.state.city}</span>
            </div>
            <div className="paymentInfo">
                <span>
                    {'Tuntipalkka:'}
                </span>
                <span className="values">
                    {this.state.hourWage}
                </span>
                <br/>
                <span>
                    {'Veroprosentti: '}
                </span>
                <span className="values">
                    {this.state.taxPercent}
                </span>
                <br/>
                <div className="estimatedPay">
                <span>
                    {'Arvioitu palkka: '}
                </span>
                <span className="values">
                    {this.state.hourWage}
                </span>
                </div>
            </div>
        </div>;
    }

    render() {
        console.log(this.state.user);
        console.log(this.state.entries);
        if (this.state.receivedProps) {
            return (
                <div className="paycheck">
                    {this.setPaychecks()}
                </div>
            );
        } else {
            return <p>Loading</p>;
        }
    }
}

export default Paycheck;