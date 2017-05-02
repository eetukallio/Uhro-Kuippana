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
                    <div className="headerContent">
                    <h1 className="headline"> Kuippana</h1>
                    <ul className="header-subnav">
                        <li><Link to="/home" activeClassName="active">Tuntien syöttö </Link></li>
                        <li><Link to="/paychecks" activeClassName="active"> Palkkalaskelmat</Link> </li>
                        <li><Link to="/management" activeClassName="active">Hallinta</Link></li>
                        <div className="logInOut" >
                        {this.props.loggedIn ? (
                                <li style={{float: 'right'}}><a href="#" onClick={this.props.logout}>Kirjaudu ulos</a></li>
                            ) : (
                                <li style={{float: 'right'}}><Link to="/login">Kirjaudu sisään</Link></li>
                            )}
                        </div>
                    </ul>

                        {/*<span onClick={this.burgerClick.bind(this)} className="header-burgerIcon"><span className="glyphicon glyphicon-menu-hamburger" /></span>*/}

                        <div id="nav-icon3" onClick={this.openClick}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                    </div>

                </header>

                <ul className="header-burger" style={{top: '-200px'}}>
                    <li><Link to="/home" activeClassName="active">Tuntien syöttö </Link></li>
                    <li><Link to="/paychecks" activeClassName="active"> Palkkalaskelmat</Link> </li>
                    <li><Link to="/management" activeClassName="active">Hallinta</Link></li>
                    <div className="logInOut" ></div>
                    {this.props.loggedIn ? (
                            <li><a href="#" onClick={this.props.logout}>Kirjaudu ulos</a></li>
                        ) : (
                            <li><Link to="/login">Kirjaudu sisään</Link></li>
                        )}
                </ul>
            </div>

        );

    }

    openClick() {
        const burgerMenu = document.getElementsByClassName("header-burger");
        const icon = document.getElementById("nav-icon3");
        const content = document.getElementsByClassName("content");
        if (icon.className !== "open") {
            icon.className = "open";
            burgerMenu[0].style.top = '65px';
            content[0].style.top = '165px';
        } else if (icon.className === "open") {
            burgerMenu[0].style.top = '-200px';
            content[0].style.top = '0px';
            icon.className = "";
        }

    }

    burgerClick() {
        const burgerMenu = document.getElementsByClassName("header-burger");
        if (burgerMenu[0].style.top === '-200px') {
            burgerMenu[0].style.top = '65px';
        } else {
            burgerMenu[0].style.top = '-200px';
        }
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