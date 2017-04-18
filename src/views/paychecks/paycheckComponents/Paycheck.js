/**
 * Created by eetukallio on 18.4.2017.
 */

import React, { Component } from 'react';
class Paycheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            type: this.props.type
        };
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
export default Paycheck;
