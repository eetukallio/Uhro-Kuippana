import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import {login, changeForm} from '../../actions/auth';
import LoginForm from './form/LoginForm';
import './Login.css'

class Login extends React.Component {
    login(username, password) {
        this.props.login(username, password);
    }

    render() {
        const { formState, currentlySending } = this.props.data;
        return <div className="loginContainer">
            <div className="loginHeader">
                <h3>Kirjaudu sisään</h3>
            </div>
                <LoginForm
                    data={formState}                    onChange={this.props.changeForm}
                    location={location}                 history={this.props.history}
                    onSubmit={this.login.bind(this)}    btnText={"Kirjaudu"}
                    currentlySending={currentlySending} errorMessage={this.props.data.errorMessage}
                />
            <div className="alertContainer">
                {this.props.data.errorMessage === '' ? null :
                    <Alert bsStyle="warning">
                        Käyttäjätunnus tai salasana on virheellinen
                    </Alert>}
            </div>

            </div>

    }
}

function mapStateToProps(state) {
    return {
        data: state.auth
    }
}

export default connect(mapStateToProps, {login, changeForm})(Login);