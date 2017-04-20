import React, { Component } from 'react';
import './Paychecks.css';
import cookie from 'react-cookie';
import axios from 'axios';
import Paycheck from './paycheckComponents/Paycheck';

class Paychecks extends Component {

    constructor (props) {
        super(props);
        this.state = {
            userId: cookie.load('user'),
            user: {},
            entries:[],
            loadedUsers: false,
            loadedEntries: false
        };

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        axios.get('/users/' + this.state.userId.id)
            .then((res) => {
                console.log("Users fetched");
                this.setState({user: res.data[0], loadedUsers: true});
            }).catch(err => console.log(err));
        const userId = this.state.userId.id;

        axios.get('/workorders')
            .then((res) => {
                const tmp = res.data.filter(obj =>
                obj.userId === userId);
                console.log("Work orders fetched");
                this.setState({entries: tmp, loadedEntries: true});
            }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div  className="paychecks">
                {this.state.loadedUsers && this.state.loadedEntries ? <Paycheck user = {this.state.user} entries = {this.state.entries} /> : null}

            </div>
        );
    }
}

export default Paychecks;
