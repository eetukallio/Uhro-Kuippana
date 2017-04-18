import React, { Component } from 'react';
import './Paychecks.css';
import cookie from 'react-cookie';
import axios from 'axios';
import Paycheck from './paycheckComponents/Paycheck';

class Paychecks extends Component {

    constructor (props) {
        super(props);
        this.state = {
            userId: cookie.load('user')
        }

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {

        axios.get('/users/' + this.state.userId.id)
            .then((res) => {
                console.log("fetch done");
                this.setState({user: res.data});
            });

        const userId = this.state.userId.id;

        axios.get('/workorders')
            .then((res) => {
                const tmp = res.data.filter(obj =>
                obj.userId === userId);
                this.setState({entries: tmp});
            });
    }

    componentDidMount() {
        this.fetchData();
    }


    render() {

        console.log(this.state.user);
        console.log(this.state.entries);

        return (
            <div  className="paychecks">
                <Paycheck user = {this.state.user} entries = {this.state.entries} />
            </div>
        );
    }

}

export default Paychecks;
