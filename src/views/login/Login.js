import React from 'react';
import {browserHistory} from 'react-router';
import LoginForm from './form/LoginForm';
import './Login.css'

class Login extends React.Component {
    handleClick() {
        browserHistory.push('/home');
    }

    render() {
        return <LoginForm onClick={this.handleClick()}/>
    }
}

export default Login;