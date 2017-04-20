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

        if (this.state.entries !== [] && this.state.entries !== {}) {
            const tmp = this.state.entries.map( obj => {
                const dateSplit = obj.date.split('-');
                const day = dateSplit[2].split('T')[0];
                const month = dateSplit[1];
                const year = dateSplit[0];
                obj.date = new Date(year, month-1, day);
                console.log(obj.date);
                return obj;
            });

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
                    <p>
                        {'Veroprosentti: ' +this.state.taxPercent}
                    </p>
                    <p>
                        {'Arvioitu palkka: ' +this.state.hourWage}
                    </p>
                </div>
            </div>;
        } else return <p>Loading</p>;
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