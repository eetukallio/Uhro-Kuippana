import React from 'react';
import { Button, Col, Grid, Row, Form, FormControl, ControlLabel, FormGroup, Checkbox } from 'react-bootstrap';

class AddWorkersForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmedPassword: ''
        };
    }

    render() {
        return (
            <div className="register">
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <Grid>
                        <Row>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="firstNameField" validationState={this.getFirstNameValidationState()}>
                                    <ControlLabel>Etunimi</ControlLabel>
                                    <FormControl type="text" name="firstName" value={this.props.data.firstName} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="lastNameField" validationState={this.getLastNameValidationState()}>
                                    <ControlLabel>Sukunimi</ControlLabel>
                                    <FormControl type="text" name="lastName" value={this.props.data.lastName} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={8}>
                                <FormGroup controlId="streetAddressField" validationState={this.getStreetAddressValidationState()}>
                                    <ControlLabel>Katuosoite</ControlLabel>
                                    <FormControl type="text" name="streetAddress" value={this.props.data.streetAddress} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="cityField" validationState={this.getCityValidationState()}>
                                    <ControlLabel>Kaupunki</ControlLabel>
                                    <FormControl type="text" name="city" value={this.props.data.city} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="zipCodeField" validationState={this.getZipCodeValidationState()}>
                                    <ControlLabel>Postinumero</ControlLabel>
                                    <FormControl type="text" name="zipCode" value={this.props.data.zipCode} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={8}>
                                <FormGroup controlId="birthdayField" validationState={this.getBirthdayValidationState()}>
                                    <ControlLabel>Syntymäaika</ControlLabel>
                                    <FormControl type="date" name="birthday" placeholder="dd.mm.yyyy" value={this.props.data.birthday} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={8}>
                                <FormGroup controlId="userNameField" validationState={this.getUsernameValidationState()}>
                                   <ControlLabel> Käyttäjänimi</ControlLabel>
                                    <FormControl type="text" name="username" placeholder="Tullaan käyttämään järjestelmään kirjautuessa" value={this.props.data.username} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="passwordField" validationState={this.getPasswordValidationState()}>
                                    <ControlLabel>Salasana</ControlLabel>
                                    <FormControl type="password" name="password" value={this.props.data.password} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="confirmPasswordField" validationState={this.getConfirmPasswordValidationState()}>
                                    <ControlLabel>Vahvista salasana</ControlLabel>
                                    <FormControl type="password" name="confirmPassword" value={this.state.confirmedPassword} onChange={this.changeConfirmPassword.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="taxPercentField" validationState={this.getTaxPercentValidationState()}>
                                    <ControlLabel>Veroprosentti</ControlLabel>
                                    <FormControl type="text" name="taxPercent" placeholder="Numerona, ilman prosenttimerkkiä" value={this.props.data.taxPercent} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />

                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={4}>
                                <FormGroup controlId="hourWageField" validationState={this.getHourWageValidationState()}>
                                    <ControlLabel>Tuntipalkka</ControlLabel>
                                    <FormControl type="text" name="hourWage" value={this.props.data.hourWage} onChange={this.changeForm.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={8}>
                                <FormGroup controlId="isEmployerField">
                                    <Checkbox id="checkbox" bsClass="employerCheckbox" type="text" name="isEmployer" checked={this.props.data.isEmployer} onChange={this.changeForm.bind(this)}>
                                        <b> Työnantajan oikeudet</b>
                                    </Checkbox>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup controlId="submitButton">
                                        <div className="submitButtonDiv">
                                            <Button bsStyle="primary" type="submit">{this.props.btnText}</Button>
                                        </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </div>
        )
    }


    changeForm(e) {
        const name = e.target.name;

        if (name === 'isEmployer') {
            const newState = this.mergeWithCurrentState({
                [name]: e.target.checked
            });
            this.emitChange(newState);
        } else {
            console.log(name);
            const newState = this.mergeWithCurrentState({
                [name]: e.target.value
            });
            this.emitChange(newState);
        }

    }

    changeConfirmPassword(e) {
        this.setState({
            confirmedPassword: e.target.value
        });
    }

    mergeWithCurrentState(change) {
        return Object.assign(this.props.data, change);
    }

    emitChange(newState) {
        this.props.onChange(newState);
    }

    onSubmit(e) {
        e.preventDefault();

        const sendData = Object.assign(this.props.data, {isEmployer: this.props.data.isEmployer ? "1" : "0"});

        this.props.onSubmit(sendData);

        this.setState({confirmedPassword: ''});
    }

    getFirstNameValidationState() {
        if (this.props.data.firstName.length > 0 && !isNaN(this.props.data.firstName)) {
            return 'error';
        } else if (this.props.data.firstName.length > 0) {
            return 'success';
        }
    }

    getLastNameValidationState() {
        if (this.props.data.lastName.length > 0) {
            return 'success';
        }
    }

    getStreetAddressValidationState() {
        if (this.props.data.streetAddress.length > 0) {
            return 'success';
        }
    }

    getCityValidationState() {
        if (this.props.data.city.length > 0) {
            return 'success';
        }
    }

    getZipCodeValidationState() {
        if (this.props.data.zipCode.length > 4 && !isNaN(this.props.data.zipCode)) {
            return 'success';
        } else if (this.props.data.zipCode.length > 0)  {
            return 'warning';
        }
    }

    getBirthdayValidationState() {
        if (this.props.data.birthday.length > 1) {
            return 'success';
        }
    }

    getPasswordValidationState() {
        if (this.props.data.password.length > 1) {
            return 'success';
        }
    }

    getConfirmPasswordValidationState() {
        if (this.state.confirmedPassword.length > 0 && this.props.data.password === this.state.confirmedPassword) {
            return 'success';
        }
    }

    getTaxPercentValidationState() {
        if (this.props.data.taxPercent.length > 1) {
            return 'success';
        }
    }

    getHourWageValidationState() {
        if (this.props.data.hourWage.length > 1) {
            return 'success';
        }
    }

    getUsernameValidationState() {
        if (this.props.data.username.length > 1) {
            return 'success';
        }
    }
}

AddWorkersForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    btnText: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired
};

export default AddWorkersForm;