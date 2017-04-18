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
                console.log(res.data);
                this.setState({user: res.data});
            });

        const userId = this.state.userId.id;

        axios.get('/workorders')
            .then((res) => {
                console.log(res.data);
                console.log(userId)
                const tmp = res.data.filter(obj =>
                obj.userId === userId);
                this.setState({entries: tmp});
            })
            .then(() => {
                console.log(this.state.entries);
            });
    }

    componentDidMount() {
        this.fetchData();
    }


    render() {
        return (
            <div  className="paychecks">
                <Paycheck user = {this.state.user} entries = {this.state.entries} />
            </div>
        );
    }

}

export default Paychecks;
