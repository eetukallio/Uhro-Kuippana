import React from 'react';
import { connect } from 'react-redux';
import './HourEntry.css';
import HourForm from './form/HourForm';
import { changeForm, submit} from '../../actions/hourform';

class HourEntry extends React.Component {
    submit(formData) {
        this.props.submit(formData);
    }

    render() {
        const { formState, currentlySending } = this.props.data;
        return (
            <div  className="hourEntry">
                <HourForm onSubmit={this.submit.bind(this)}
                onChange={this.props.changeForm}
                data={formState}
                currentlySending={currentlySending}/>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        data: state.hours
    }
}

export default connect(mapStateToProps, {submit, changeForm})(HourEntry);