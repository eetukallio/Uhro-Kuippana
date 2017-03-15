import React from 'react';
import {hashHistory} from 'react-router';
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

        const form = new FormData();
        form.append("username", this.state.user.username);
        form.append("password", this.state.user.password);

        const sendData = {username: this.state.user.username, password: this.state.user.password};

        console.log("ELI FORMISSA ON " + form.get("username") + form.get("password"));

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        fetch("http://localhost:8080/login", {
            method: 'post',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(sendData),
        }).then((res) => res.json()).then(data => {
            if (data.loggedIn === true) {
                hashHistory.push("/home");
            }
        }).catch(err => console.log(err))
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