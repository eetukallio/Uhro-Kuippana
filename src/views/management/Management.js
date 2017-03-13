import React, { Component } from 'react';
import './Management.css';
import {Link} from 'react-router';

class Management extends Component {

    render() {
        return (
            <div  className="management">
                <div className="management-nav">
                    <ul >
                        <Link to="/management/customers"><li>Asiakkaat</li></Link>
                        <Link to="/management/workers"><li>Työntekijät</li></Link>
                    </ul>
                </div>
                <div className="content">          
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export default Management;