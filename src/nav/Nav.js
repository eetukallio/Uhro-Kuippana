import React, { Component } from 'react';
import logo from '../images/urho-logo.png';
import './Nav.css';
import {Link} from 'react-router';

class Nav extends Component {

    render() {
        return (
            <div className="Nav">
                <header className="header">
                    <img src={logo} className="App-logo" />
                    <h1 className="headline"> Kuippana</h1>
                    <ul className="header-subnav">
                        <li><Link to="/home">Tuntien syöttö </Link></li>
                        <li><Link to="/paychecks"> Palkkalaskelmat</Link> </li>
                        <li><Link to="/paychecks">Hallinta</Link></li>
                    </ul>
                </header>
            </div>

        );
    }


}

export default Nav;