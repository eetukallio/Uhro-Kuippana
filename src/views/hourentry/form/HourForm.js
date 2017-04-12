import React from 'react';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import axios from 'axios';


class HourForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }
    getQualityOptions() {
        axios.get('http://207.154.228.188:3000/qualities',
            {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
            console.log(res.data);
            this.setState({data: res.data});
            this.buildQualities();
            }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.getQualityOptions();
    }
    
    buildQualities() {
        let objects = this.state.data;
        return (
            <FormControl name="quality" componentClass="select" onChange={this.changeForm.bind(this)}
                         placeholder="Valitse" required>
                <option value="valitse">Valitse</option>
                {objects.map(function(o) {
                    return (
                        <option key={o.id} value={o.id}>{o.name}</option>
                    )
                })}
            </FormControl>
        )
    }

    render() {
        return (
                <Form horizontal onSubmit={this.onSubmit.bind(this)}>
                    <FormGroup controlId="dateField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Päivämäärä
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl name="date" type="date" value={this.props.data.date} onChange={this.changeForm.bind(this)} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="hoursField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Työaika
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl name="duration" type="number" step="0.25" min="0" onChange={this.changeForm.bind(this)}
                                         placeholder="Ilmoita työaika tunteina, desimaalein. (esim. 6,75h = 6h 45min)"
                                         value={this.props.data.hours}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="distanceField">
                        <Col componentClass={ControlLabel}
                             xs={3} sm={4}>
                            Kilometrit
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl name="distance" type="number" min="0" onChange={this.changeForm.bind(this)}
                                         placeholder="Kilometrit työpaikalle omalla autolla"
                                         value={this.props.data.distance}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="clientField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Asiakas
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl name="client" type="text" onChange={this.changeForm.bind(this)}
                                         placeholder="Asiakkaan/asiakasyrityksen nimi"
                                         value={this.props.data.client}
                                         required/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="workTypeField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Työnkuva
                        </Col>
                        <Col xs={8} sm={4}>
                            {this.buildQualities()}
                            {/*<FormControl name="quality" componentClass="select" onChange={this.changeForm.bind(this)}*/}
                                         {/*placeholder="Valitse" required>*/}
                                {/*<option value="valitse">Valitse</option>*/}
                                {/*<option value="ikkunanpesu">Ikkunanpesu</option>*/}
                                {/*<option value="x">Mitä</option>*/}
                                {/*<option value="y">Näitä</option>*/}
                                {/*<option value="z">Nyt</option>*/}
                                {/*<option value="i">On</option>*/}
                                {/*value={this.props.data.quality}*/}
                            {/*</FormControl>*/}
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="infoField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Huomioitavaa
                        </Col>
                        <Col xs={8} sm={4}>
                            <FormControl name="additionalInfo" componentClass="textArea" onChange={this.changeForm.bind(this)}
                                         value={this.props.data.additionalInfo}/>
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

    changeForm(e) {
        const name = e.target.name;
        console.log(name);
        var newState = this.mergeWithCurrentState({
            [name]: e.target.value
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
        console.log(this.props.data);
        this.props.onSubmit(this.props.data);
    }
}

HourForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    errorMessage: React.PropTypes.string,
    data: React.PropTypes.object.isRequired
};


export default HourForm;