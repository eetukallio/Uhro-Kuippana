import React from 'react';
import { connect } from 'react-redux';
import {login, changeForm} from '../../actions/actionCreators';
import LoginForm from './form/LoginForm';
import './Login.css'

class Login extends React.Component {
    login(username, password) {
        this.props.login(username, password);
    }

    render() {
        const { formState, currentlySending } = this.props.data;
        return <LoginForm
            data={formState}                    onChange={this.props.changeForm}
            location={location}                 history={this.props.history}
            onSubmit={this.login.bind(this)}    btnText={"Login"}
            currentlySending={currentlySending} errorMessage={this.props.data.errorMessage}
        />
    }
}

function mapStateToProps(state) {
    return {
        data: state
    }
}

export default connect(mapStateToProps, {login, changeForm})(Login);