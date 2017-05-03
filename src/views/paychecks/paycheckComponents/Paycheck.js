/**
 * Created by eetukallio on 18.4.2017.
 */

import React, { Component } from 'react';
import './Paycheck.css';

class Paycheck extends Component {

    constructor(props) {

        super(props);

        this.setPaychecks = this.setPaychecks.bind(this);
    }

    setPaychecks() {

        console.log('setPaycheck states:');
        console.log(this.props.entries);
        console.log(this.props.user);

        const dateFormatTmp = this.props.entries.map( obj => {
            const dateSplit = obj.date.split('-');
            const day = dateSplit[2].split('T')[0];
            const month = dateSplit[1];
            const year = dateSplit[0];
            obj.date = new Date(year, month-1, day);
            console.log(obj.date);
            return obj;
        });

        const date = new Date();
        console.log(new Date(date.getYear(),date.getMonth()+1,0));
        console.log(new Date(date.getYear(), date.getMonth(), 15));
        console.log(date.getDate());

        let thisSegment = [];
        let lastSegment = [];
        let secondLastSegment = [];

        if (date.getDate() <= 15 ) {

            console.log('before 15th');
            thisSegment = dateFormatTmp.filter(obj =>
                obj.date.getDate() <= 15 &&
                obj.date.getMonth() === date.getMonth() &&
                obj.date.getYear() === date.getYear()
            )
            lastSegment = dateFormatTmp.filter(obj =>
                obj.date.getDate() > 15 &&
                obj.date.getMonth() === date.getMonth()-1 &&
                obj.date.getYear() === date.getYear()
            )
            secondLastSegment = dateFormatTmp.filter(obj =>
                obj.date.getDate() <= 15 &&
                obj.date.getMonth()-1 === date.getMonth() &&
                obj.date.getYear() === date.getYear()
            )

        } else if (date.getDate() >= 15) {

            console.log('after 15th');
            thisSegment = dateFormatTmp.filter(obj => {
                console.log("This segment:")
                console.log(
                    obj.date.getDate() > 15 &&
                    obj.date.getMonth() === date.getMonth() &&
                    obj.date.getYear() === date.getYear()
                )
                return obj.date.getDate() > 15 &&
                    obj.date.getMonth() === date.getMonth() &&
                    obj.date.getYear() === date.getYear()
            }

            )
            lastSegment = dateFormatTmp.filter(obj =>{
                console.log("Last segment:")
                console.log(obj.date.getDate() <= 15 &&
                    obj.date.getMonth() === date.getMonth() &&
                    obj.date.getYear() === date.getYear())

                return obj.date.getDate() <= 15 &&
                    obj.date.getMonth() === date.getMonth() &&
                    obj.date.getYear() === date.getYear()
            }

            )
            secondLastSegment = dateFormatTmp.filter(obj =>{
                console.log("Secons last segment:");
                console.log(obj.date.getDate() > 15 &&
                    obj.date.getMonth()-1 === date.getMonth() &&
                    obj.date.getYear() === date.getYear())

                return obj.date.getDate() > 15 &&
                    obj.date.getMonth()-1 === date.getMonth() &&
                    obj.date.getYear() === date.getYear()
            })
        }

        let key = 0;

        const tmp = [thisSegment, lastSegment, secondLastSegment];

        console.log(tmp)

        const renderedPaychecks = tmp
            .filter(obj => obj.length > 0)
            .map(obj => {
                console.log(obj)
                let totalHours = 0;
                for(const entry of obj) {
                    totalHours += entry.duration;
                }
                key++;
                return <div key={key} className="paycheckSheet">
                    <div className="personalInfo">
                        <span id="name">{this.props.user.firstName + " " + this.props.user.lastName}</span><br />
                        <span className="additionalInfo">{this.props.user.streetAddress}</span><br />
                        <span className="additionalInfo">{this.props.user.zipCode}</span><br />
                        <span className="additionalInfo">{this.props.user.city}</span>
                    </div>
                    <div className="paymentInfo">
                <span>
                    {'Tuntipalkka:'}
                </span>
                        <span className="values">
                    {this.props.user.hourWage}
                </span>
                        <br/>
                        <span>
                    {'Veroprosentti: '}
                </span>
                        <span className="values">
                    {this.props.user.taxPercent}
                </span>
                        <br/>
                        <span>
                    {'Tehdyt tunnit: '}
                </span>
                        <span className="values">
                    {totalHours}
                </span>
                        <br/>
                        <div className="estimatedPay">
                <span>
                    {'Arvioitu palkka: '}
                </span>
                            <span className="values">
                    {this.props.user.hourWage * totalHours * (1 -(this.props.user.taxPercent / 100))}
                </span>
                        </div>
                    </div>
                </div>;
            })
        console.log(renderedPaychecks)
        return renderedPaychecks;
    }

    render() {
        return (
            <div className="paycheck">
                {this.setPaychecks()}
            </div>
        );
    }
}

Paycheck.propTypes = {
    user: React.PropTypes.object.isRequired,
    entries: React.PropTypes.array.isRequired
};

export default Paycheck;