import React, { Component } from 'react';
import './Paychecks.css';
import cookie from 'react-cookie';
import axios from 'axios';
import Paycheck from './paycheckComponents/Paycheck';

class Paychecks extends Component {

    constructor () {
        super.constructor();
        this.state = {
            user: cookie.load('user')
        }

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {

        axios.get('/users')
            .then((res) => {
                console.log("fetch done");
                console.log(res.data);
                this.setState({data: res.data});
            });
    }

    componentDidMount() {
        this.fetchData();
    }


    render() {
        return (
            <div  className="paychecks">
                <Paycheck user = {this.state.user} />
            </div>
        );
    }

}

export default Paychecks;
