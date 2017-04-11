import React, { Component } from 'react';
import './Nav.css';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
// import logo from '../images/urho-logo.png';

class Nav extends Component {

    render() {
        return (
            <div className="Nav">
                <header className="header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <h1 className="headline"> Kuippana</h1>
                    <ul className="header-subnav">
                        <li><Link to="/home">Tuntien syöttö </Link></li>
                        <li><Link to="/paychecks"> Palkkalaskelmat</Link> </li>
                        <li><Link to="/management">Hallinta</Link></li>
                        {this.props.loggedIn ? (
                                <li><a href="#" onClick={this.props.logout}>Kirjaudu ulos</a></li>
                            ) : (
                                <li><Link to="/login">Kirjaudu sisään</Link></li>
                            )}
                    </ul>
                </header>
            </div>

        );
    }
}

// Which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        loggedIn: state.auth.loggedIn
    }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, { logout })(Nav);