import React from 'react';
import { Button, Col, Form, FormControl, Row, FormGroup, InputGroup, Grid } from 'react-bootstrap';
import LoadingButton from './LoadingButton';

class LoginForm extends React.Component {

    render() {
        return (
            <div className="login">
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <Grid>

                    <Row>
                        <Col>
                            <FormGroup controlId="userNameField">
                                <InputGroup>
                                    <InputGroup.Addon><span className="glyphicon glyphicon-user" /></InputGroup.Addon>
                                    <FormControl type="text" name="username" placeholder="Käyttäjätunnus" value={this.props.data.username} onChange={this.changeUsername.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                </InputGroup>
                            </FormGroup>
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                            <FormGroup controlId="passwordField">
                                <InputGroup>
                                    <InputGroup.Addon><span className="glyphicon glyphicon-lock" /></InputGroup.Addon>
                                    <FormControl type="password" name="password" placeholder="Salasana" value={this.props.data.password} onChange={this.changePassword.bind(this)} required />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>


                        <Row>
                            <FormGroup controlId="submitButton">
                                <div className="buttonWrapper">
                                    {this.props.currentlySending ? (
                                            <LoadingButton />
                                        ) : (
                                            <Button bsStyle="primary" type="submit">{this.props.btnText}</Button>
                                        )}
                                </div>
                            </FormGroup>
                        </Row>

                    </Grid>
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
    data: React.PropTypes.object.isRequired
};

export default LoginForm;