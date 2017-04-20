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
            city: "Kaupunki"
        }
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
                city: nextProps.user.city
            });
            console.log("Paycheck state:");
            console.log(this.state);
        }
    }

    setPaychecks() {

        return <div className="paycheckSheet">
            <div className="personalInfo">
                <span id="name">{this.state.firstName + " " + this.state.lastName}</span><br />
                <span className="additionalInfo">{this.state.streetAddress}</span><br />
                <span className="additionalInfo">{this.state.zipCode}</span><br />
                <span className="additionalInfo">{this.state.city}</span>
            </div>
            <div className="paymentInfo">
                <p>
                    {'Tuntipalkka: ' +this.state.hourWage}
                </p>
            </div>
        </div>;
    }

    render() {
        console.log(this.state.user);
        console.log(this.state.entries);
        return (
            <div className="paycheck">
                {this.setPaychecks()}
            </div>
        );
    }
}
export default Paycheck;