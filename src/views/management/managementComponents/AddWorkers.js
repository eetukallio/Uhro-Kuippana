import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import {register, changeAddWorkerForm} from '../../../actions/auth';
import AddWorkersForm from './AddWorkersForm';

class AddWorkers extends React.Component {
    register(formData) {
        this.props.register(formData);
    }

    render() {
        const { formState, currentlySending } = this.props.data;
        return <div className="addWorker">
            <AddWorkersForm
                data={formState}                    onChange={this.props.changeAddWorkerForm}
                location={location}                 history={this.props.history}
                onSubmit={this.register.bind(this)} btnText={"Tallenna"}
                currentlySending={currentlySending} errorMessage={this.props.data.errorMessage} />
            {this.props.data.errorMessage === '' ? null :
                <Alert bsStyle="warning">
                    Virhe, tarkista tiedot uudelleen.
                </Alert>}
        </div>

    }
}

function mapStateToProps(state) {
    return {
        data: state.register
    }
}

export default connect(mapStateToProps, {register, changeAddWorkerForm})(AddWorkers);