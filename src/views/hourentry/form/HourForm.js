import React from 'react';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
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
    return (
        <FormControl name="quality" componentClass="select" onChange={this.changeForm.bind(this)}
                     value={this.props.data.quality}
                     placeholder="Valitse" required>
            <option value="valitse">Valitse</option>
            {objects.map(function(o) {
                return (
                    <option key={o.id} value={o.id}>{o.name}</option>
                )
            })}
            <option value="otherQuality">Muu</option>
        </FormControl>
    )}

    buildClients() {
        let objects = this.state.clients;
        return (
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
                                         value={this.props.data.duration}/>
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
                            {this.buildClients()}
                        </Col>
                    </FormGroup>
                    {this.props.otherClient ? <FormGroup controlId="addClientField">
                            <Col componentClass={ControlLabel} xs={3} sm={4}>

                            </Col>
                            <Col xs={8} sm={4}>
                                <FormControl name="addClient" type="text" onChange={this.changeForm.bind(this)}
                                             placeholder="Asiakkaan/asiakasyrityksen nimi"
                                             value={this.state.otherClientName}
                                             required/>
                            </Col>
                        </FormGroup> : null}
                    <FormGroup controlId="workTypeField">
                        <Col componentClass={ControlLabel} xs={3} sm={4}>
                            Työnkuva
                        </Col>
                        <Col xs={8} sm={4}>
                            {this.buildQualities()}
                        </Col>
                    </FormGroup>
                    {this.props.otherQuality ? <FormGroup controlId="addQualityField">
                            <Col componentClass={ControlLabel} xs={3} sm={4}>

                            </Col>
                            <Col xs={8} sm={4}>
                                <FormControl name="addQuality" type="text" onChange={this.changeForm.bind(this)}
                                             placeholder="Muu, mikä?"
                                             value={this.state.otherQualityName}
                                             required/>
                            </Col>
                        </FormGroup> : null}
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
        if (name === "quality") {
            if (e.target.value === "otherQuality") {
                this.props.onOtherQuality(true);
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
                this.setState({otherQualityName: e.target.value})
            } else if (this.props.otherClient === true && name === "addClient") {
                this.setState({otherClientName: e.target.value})
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