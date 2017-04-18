/**
 * Created by eetukallio on 18.4.2017.
 */

import React, { Component } from 'react';

class Paycheck extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.user !== undefined) {
            return (
                <div className="paycheck">
                    <h1>{this.props.user.username}</h1>
                </div>
            );
        } else {
            return <p>Nothing here</p>
        }
    }
}
export default Paycheck;
