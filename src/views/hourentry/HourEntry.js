import React, { Component } from 'react';
import './HourEntry.css';
import HourForm from './form/HourForm';

class HourEntry extends Component {

    render() {
        return (
            <div  className="hourEntry">
                <HourForm />
            </div>
        );
    }

}

export default HourEntry;