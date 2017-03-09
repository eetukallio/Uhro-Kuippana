import React from 'react';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

class LoginForm extends React.Component {

    render() {
        return (
            <div className="login">
                <Form horizontal onSubmit={this.props.onSubmit}>
                    <FormGroup controlId="userNameField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Tunnus
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl name="username" onChange={this.props.onChange} required />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="passwordField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Salasana
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl type="password" name="password" onChange={this.props.onChange} required />
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
                    <p>{this.props.errors.message}</p>

                </Form>
            </div>
        )
    }
}

LoginForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
};


export default LoginForm;