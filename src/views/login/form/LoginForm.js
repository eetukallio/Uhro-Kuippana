import React from 'react';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

class LoginForm extends React.Component {

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
                            <Button type="submit" onClick={this.props.handleClick}>
                                Kirjaudu
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default LoginForm;