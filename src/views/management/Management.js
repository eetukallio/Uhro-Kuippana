import React, { Component } from 'react';
import './Management.css';
import {Link} from 'react-router';

class Management extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerData: [],
            workerData: []
        }
    }


    componentDidMount() {
       this.fetchData();
    }

    fetchData() {
        fetch("http://207.154.228.188:3000/users")
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({workerData: json});
            });

        fetch("http://207.154.228.188:3000/clients")
            .then( (response) => {
                return response.json() })
            .then( (json) => {
                this.setState({customerData: json});
            });
    }


    renderChildren() {
        return React.Children.map(this.props.children, child => {

            return React.cloneElement(child, {
                data: this.state.workerData
            });

        });
    }

    render() {
        return (
            <div  className="management">
                <div className="management-nav">
                    <ul >
                        <Link to="/management/customers"><li>Asiakkaat</li></Link>
                        <Link to="/management/workers"><li>Työntekijät</li></Link>
                    </ul>
                </div>
                <div className="content">
                    {this.renderChildren()}
                </div>
            </div>
        );
    }

}

export default Management;