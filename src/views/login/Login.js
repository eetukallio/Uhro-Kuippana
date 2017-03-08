import React from 'react';
import {browserHistory} from 'react-router';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import './Login.css'

class Login extends React.Component {
    handleClick() {
        browserHistory.push('/home');
    }

    render() {
        return (
            <div className="login">
                <Form horizontal>
                    <FormGroup controlId="userNameField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Tunnus
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl type="text" required />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="passwordField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Salasana
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl type="password" required />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="submitButton">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>

                        </Col>
                        <Col xs={1} sm={1}>
                            <Button type="submit" onClick={this.handleClick}>
                                Kirjaudu
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default Login;