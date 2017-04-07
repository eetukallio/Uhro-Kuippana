import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export const checkAuth = (ChildComponent) => {

    class Authenticate extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                console.log("Not authenticated");
                browserHistory.push("/login");
            }
        }

        componentWillUpdate() {
            if (!this.props.isAuthenticated) {
                console.log("Not authenticated");
                browserHistory.push("/login");
            }
        }

        render() {
            return (
                <ChildComponent {...this.props}/>
            )
        }
    }

    function mapStateToProps(state) {
        console.log(state.loggedIn);
        return { isAuthenticated: state.loggedIn }
    }

    return connect(mapStateToProps)(Authenticate);
};