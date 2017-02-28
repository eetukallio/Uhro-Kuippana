import React, { Component } from 'react';
import logo from '../images/urho-logo.png';
import './Nav.css';

class Nav extends Component {

    render() {
        return (
            <div className="Nav">
                <header className="header">
                    <img src={logo} className="App-logo" />
                    <h1 className="headline"> Kuippana</h1>
                    <ul className="header-subnav">
                        <li><a href="#">Tuntien syöttö</a></li>
                        <li><a href="#" className="is-active">Palkkalaskelmat</a></li>
                        <li><a href="#">Hallinta</a></li>
                    </ul>
                </header>
            </div>

        );
    }


}

export default Nav;