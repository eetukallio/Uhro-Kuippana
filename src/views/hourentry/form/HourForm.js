import React from 'react';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';


class HourForm extends React.Component {
    render() {
        return (
                <Form horizontal>
                    <FormGroup controlId="hoursField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Tunnit
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl type="number" required />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="workTypeField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Työnkuva
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl componentClass="select" placeholder="Valitse" required>
                                <option value="valitse">Valitse</option>
                                <option value="ikkunanpesu">Ikkunanpesu</option>
                                <option value="x">Mitä</option>
                                <option value="y">Näitä</option>
                                <option value="z">Nyt</option>
                                <option value="i">On</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="clientField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Asiakas
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl type="text" required/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="dateField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Päivämäärä
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl type="date" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="infoField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Huomioitavaa
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl componentClass="textArea" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="submitButton">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>

                        </Col>
                        <Col xs={1} sm={1}>
                            <Button type="submit">
                                Lähetä
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
        )
    }
}

export default HourForm;