import React from 'react';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

class LoginForm extends React.Component {

    render() {
        return (
            <div className="login">
                <Form horizontal onSubmit={this.onSubmit.bind(this)}>
                    <FormGroup controlId="userNameField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Tunnus
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl type="text" name="username" value={this.props.data.username} onChange={this.changeUsername.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="passwordField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Salasana
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl type="password" name="password" value={this.props.data.password} onChange={this.changePassword.bind(this)} required />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="submitButton">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>

                        </Col>
                        <Col xs={1} sm={1}>
                            <Button type="submit">
                                Kirjaudu
                            </Button>
                        </Col>
                    </FormGroup>
                    <p style={{color: "red"}}>{this.props.errorMessage}</p>

                </Form>
            </div>
        )
    }

    changeUsername(e) {
        var newState = this.mergeWithCurrentState({
            username: e.target.value
        });

        this.emitChange(newState);
    }

    changePassword(e) {
        var newState = this.mergeWithCurrentState({
            password: e.target.value
        });

        this.emitChange(newState);
    }

    mergeWithCurrentState(change) {
        return Object.assign(this.props.data, change);
    }

    emitChange(newState) {
        this.props.onChange(newState);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.props.data.username, this.props.data.password);
    }
}

LoginForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    btnText: React.PropTypes.string.isRequired,
    errorMessage: React.PropTypes.string,
    data: React.PropTypes.object.isRequired
};

export default LoginForm;