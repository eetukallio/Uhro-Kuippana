import React from 'react';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup, Grid, Row } from 'react-bootstrap';
import axios from 'axios';


class HourForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // otherQuality: false,
            otherQualityName: '',
            // otherClient: false,
            otherClientName: '',
            qualities: [],
            clients: []
        }
    }
    getQualityOptions() {
        axios.get('http://207.154.228.188:3000/qualities',
            {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                console.log(res.data);
                this.setState({qualities: res.data});
                this.buildQualities();
            }).catch(err => console.log(err));
    }

    getClients() {
        axios.get('http://207.154.228.188:3000/clients',
            {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                console.log(res.data);
                this.setState({clients: res.data});
                this.buildClients();
            }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.getQualityOptions();
        this.getClients();
    }

    buildQualities() {
        let objects = this.state.qualities;
        return ( <div className="qualities">
                <FormControl name="quality" componentClass="select" onChange={this.changeForm.bind(this)}
                             value={this.props.data.quality}
                             placeholder="Valitse"
                             required>
                    <option value="valitse">Valitse</option>
                    {objects.map(function(o) {
                        return (
                            <option key={o.id} value={o.id}>{o.name}</option>
                        )
                    })}
                    <option value="otherQuality">Muu</option>
                </FormControl>
                <FormControl.Feedback />
            </div>

        )}

    buildClients() {
        let objects = this.state.clients;
        return (
            <div className="clients">
                <FormControl name="client" componentClass="select" onChange={this.changeForm.bind(this)}
                             value={this.props.data.client}
                             placeholder="Valitse" required>
                    <option value="valitse">Valitse</option>
                    {objects.map(function(o) {
                        return (
                            <option key={o.id} value={o.id}>{o.name}</option>
                        )
                    })}
                    <option value="otherClient">Muu</option>
                </FormControl>
                <FormControl.Feedback />
            </div>

        )
    }

    render() {
        return (
            <Form className="hourForm" onSubmit={this.onSubmit.bind(this)}>
                <Grid>
                    <Row>
                        <Col xs={12} sm={12}>
                            <FormGroup controlId="dateField" validationState={this.getDateValidationState()}>
                                <ControlLabel>
                                    Päivämäärä*
                                </ControlLabel>
                                <FormControl name="date" type="date" placeholder="dd.mm.yyyy" value={this.props.data.date} onChange={this.changeForm.bind(this)} required/>
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} sm={12}>
                            <FormGroup controlId="hoursField" validationState={this.getDurationValidationState()}>
                                <ControlLabel>
                                    Työaika
                                </ControlLabel>
                                <FormControl name="duration" type="number" step="0.25" min="0" onChange={this.changeForm.bind(this)}
                                             placeholder="Ilmoita työaika tunteina, desimaalein. (esim. 6,75h = 6h 45min)"
                                             value={this.props.data.duration}/>
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} sm={12}>
                            <FormGroup controlId="distanceField" validationState={this.getDistanceValidationState()}>
                                <ControlLabel>
                                    Kilometrit
                                </ControlLabel>
                                <FormControl name="distance" type="number" min="0" onChange={this.changeForm.bind(this)}
                                             placeholder="Kilometrit työpaikalle omalla autolla"
                                             value={this.props.data.distance}/>
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} sm={12}>
                            <FormGroup controlId="clientField" validationState={this.getClientValidationState()}>
                                <ControlLabel>
                                    Asiakas
                                </ControlLabel>

                                {this.buildClients()}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        {this.props.otherClient ?
                            <Col xs={12} sm={12}>
                                <FormGroup controlId="addClientField" validationState={this.getOtherClientValidationState()}>
                                    <FormControl name="addClient" type="text" onChange={this.changeForm.bind(this)}
                                                 placeholder="Asiakkaan/asiakasyrityksen nimi"
                                                 value={this.state.otherClientName}
                                                 required/>
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            : null}
                    </Row>

                    <Row>
                        <Col xs={12} sm={12}>
                            <FormGroup controlId="workTypeField" validationState={this.getQualityValidationState()}>
                                <ControlLabel>
                                    Työnkuva*
                                </ControlLabel>
                                {this.buildQualities()}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        {this.props.otherQuality ?
                            <Col xs={12} sm={12}>
                                <FormGroup controlId="addQualityField" validationState={this.getOtherQualityValidationState()}>
                                    <FormControl name="addQuality" type="text" onChange={this.changeForm.bind(this)}
                                                 placeholder="Muu, mikä?"
                                                 value={this.state.otherQualityName}
                                                 required/>
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            : null}
                    </Row>

                    <Row>
                        <Col xs={12} sm={12}>
                            <FormGroup controlId="infoField">
                                <ControlLabel>
                                    Huomioitavaa
                                </ControlLabel>

                                <FormControl name="additionalInfo" componentClass="textArea" onChange={this.changeForm.bind(this)}
                                             value={this.props.data.additionalInfo}/>
                            </FormGroup>
                        </Col>
                    </Row>



                    <Row>
                        <Col xs={12} sm={12}>
                            <FormGroup controlId="submitButton">
                                <Button bsStyle="primary" type="submit" disabled={this.submitState()}>
                                    Ilmoita
                                </Button>
                            </FormGroup>
                        </Col>
                    </Row>


                </Grid>
            </Form>
        )
    }

    submitState() {
        if (((this.state.otherQualityName !== '') || this.props.data.quality !== '') && this.props.data.date !== '') {
            return false;
        } else {
            return true;
        }
    }


    changeForm(e) {
        const name = e.target.name;
        console.log(name);
        if (name === "quality") {
            if (e.target.value === "otherQuality") {
                this.props.onOtherQuality(true);
                const newState = this.mergeWithCurrentState({
                    [name]: ''
                });
                this.emitChange(newState);
            } else {
                this.props.onOtherQuality(false);
                const newState = this.mergeWithCurrentState({
                    [name]: e.target.value
                });
                this.emitChange(newState);
            }
        } else if (name === "client") {
            if (e.target.value === "otherClient") {
                this.props.onOtherClient(true);
                const newState = this.mergeWithCurrentState({
                    [name]: ''
                });
                this.emitChange(newState);
            } else {
                this.props.onOtherClient(false);
                const newState = this.mergeWithCurrentState({
                    [name]: e.target.value
                });
                this.emitChange(newState);
            }
        } else if (e.target.value === "otherClient") {
            this.props.onOtherClient(true);
        } else {
            if (this.props.otherQuality === true && name === "addQuality") {
                this.setState({otherQualityName: e.target.value});
            } else if (this.props.otherClient === true && name === "addClient") {
                this.setState({otherClientName: e.target.value});
            } else {
                const newState = this.mergeWithCurrentState({
                    [name]: e.target.value
                });
                this.emitChange(newState);
            }
        }
    }

    mergeWithCurrentState(change) {
        return Object.assign(this.props.data, change);
    }

    emitChange(newState) {
        this.props.onChange(newState);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.props.otherQuality && this.props.otherClient) {
            this.props.onNewBoth(this.state.otherClientName, this.state.otherQualityName, this.props.data);
        } else if (this.props.otherClient) {
            this.props.onNewClient(this.state.otherClientName, this.props.data);
        } else if (this.props.otherQuality) {
            this.props.onNewQuality(this.state.otherQualityName, this.props.data);
        } else {
            this.props.onSubmit(this.props.data);
        }
        console.log(this.props.data);
    }

    getDateValidationState() {
        if (this.props.data.date.length > 0) {
            return 'success';
        }
    }

    getDurationValidationState() {
        if (this.props.data.duration.length > 0 && !isNaN(this.props.data.duration)) {
            return 'success';
        } else if (isNaN(this.props.data.duration)) {
            return 'error';
        }
    }

    getDistanceValidationState() {
        if (this.props.data.distance.length > 0 && !isNaN(this.props.data.distance)) {
            return 'success';
        } else if (isNaN(this.props.data.distance)) {
            return 'error';
        }
    }

    getClientValidationState() {
        if (this.props.data.client.length > 0 && this.props.otherClient === false) {
            return 'success';
        }
    }

    getQualityValidationState() {
        if (this.props.data.quality.length > 0 && this.props.otherQuality === false) {
            return 'success';
        }
    }

    getOtherClientValidationState() {
        if (this.state.otherClientName.length > 0) {
            return 'success';
        }
    }

    getOtherQualityValidationState() {
        if (this.state.otherQualityName.length > 0) {
            return 'success';
        }
    }


}

HourForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onNewQuality: React.PropTypes.func.isRequired,
    onNewClient: React.PropTypes.func.isRequired,
    onNewBoth: React.PropTypes.func.isRequired,
    onOtherClient: React.PropTypes.func.isRequired,
    onOtherQuality: React.PropTypes.func.isRequired,
    errorMessage: React.PropTypes.string,
    data: React.PropTypes.object.isRequired
};


export default HourForm;