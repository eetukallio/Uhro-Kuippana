import React, { Component } from 'react';
import './Management.css';
import {Link} from 'react-router';

class Management extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerData: [],
            workerData: [],
            entryData: [],
            searchInput:""
        }
    }

    handleSearchInput(e) {
        const searchInput = e.target.value;
        console.log(e.target.value);
        this.setState({
            searchInput
        })
    }

    renderChildren() {
        let searchInput = this.state.searchInput;

        return React.Children.map(this.props.children, child => {

            console.log("Management state searchInput: " + this.state.searchInput);

            return React.cloneElement(child, {
                searchInput: searchInput
            });
        });
    }

    render() {
        return (
            <div  className="management">
                <div className="management-nav">
                    <ul >
                        <Link to="/management/entries"><li>Merkinnät</li></Link>
                        <Link to="/management/customers"><li>Asiakkaat</li></Link>
                        <Link to="/management/workers"><li>Työntekijät</li></Link>
                    </ul>
                </div>
                <div className="searchBar">
                    <input onChange={this.handleSearchInput.bind(this)} />
                </div>
                <div className="content">
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}

export default Management;