import React from 'react';
import { Col, Form, FormControl, ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';

class HourForm extends React.Component {
    render() {
        return (
            <Form horizontal>
                <FormGroup controlId="hoursField">
                    <Col componentClass={ControlLabel} sm={1}>
                        Tunnit
                    </Col>
                    <Col componentClass={ControlLabel} sm={10}>
                        <FormControl type="text" required/>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default HourForm;