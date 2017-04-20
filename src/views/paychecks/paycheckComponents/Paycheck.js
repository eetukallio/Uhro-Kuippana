/**
 * Created by eetukallio on 18.4.2017.
 */

import React, { Component } from 'react';

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

    render() {
        console.log(this.state.user);
        console.log(this.state.entries);
        return (
            <div className="paycheck">
                <h1>{this.state.firstName}</h1>
            </div>
        );
    }

}
export default Paycheck;