import React from 'react';
import {browserHistory} from 'react-router';
import LoginForm from './form/LoginForm';
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: { message: ''},
            user: {
                username: '',
                password: ''
            },
            login: {
                username: 'root',
                password: 'root'
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const fieldName = event.target.name;
        console.log(fieldName);
        const user = this.state.user;
        user[fieldName] = event.target.value;

        this.setState({
            user
        });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.user.username === this.state.login.username
            && this.state.user.password === this.state.login.password) {
            browserHistory.push('/home');
        } else if (this.state.user.username !== this.state.login.username) {
            console.log("incorrect username");
            this.setState({
                errors: {message: "Incorrect username"}
            })
        } else if (this.state.user.username === this.state.login.username
            && this.state.user.password !== this.state.login.password) {
            this.setState({
                errors: {message: "Incorrect password"}
            })
        }
    }

    render() {
        return <LoginForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            user={this.state.user}
            errors={this.state.errors}
        />
    }
}

export default Login;