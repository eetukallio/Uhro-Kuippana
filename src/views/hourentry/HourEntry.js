import React from 'react';
import { connect } from 'react-redux';
import './HourEntry.css';
import HourForm from './form/HourForm';
import { addQuality, addClient, addBoth, otherClient, otherQuality, changeForm, submit} from '../../actions/hourform';

class HourEntry extends React.Component {
    submit(formData) {
        this.props.submit(formData);
    }

    addQuality(newQuality, formData) {
        this.props.addQuality(newQuality, formData);
    }

    addClient(newClient, formData) {
        this.props.addClient(newClient, formData);
    }

    addBoth(newClient, newQuality, formData) {
        this.props.addBoth(newClient, newQuality, formData);
    }

    otherClient(newState) {
        this.props.otherClient(newState);
    }

    otherQuality(newState) {
        this.props.otherQuality(newState);
    }

    render() {
        const { formState, isOtherClient, isOtherQuality, currentlySending } = this.props.data;
        return (
            <div  className="hourEntry">
                <HourForm onSubmit={this.submit.bind(this)}
                          onNewQuality={this.addQuality.bind(this)}
                          onNewClient={this.addClient.bind(this)}
                          onNewBoth={this.addBoth.bind(this)}
                          onChange={this.props.changeForm}
                          onOtherClient={this.otherClient.bind(this)}
                          onOtherQuality={this.otherQuality.bind(this)}
                          otherClient={isOtherClient} otherQuality={isOtherQuality}
                          data={formState} currentlySending={currentlySending}/>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        data: state.hours
    }
}

export default connect(mapStateToProps, {submit, addQuality, addClient, addBoth, otherClient, otherQuality, changeForm})(HourEntry);