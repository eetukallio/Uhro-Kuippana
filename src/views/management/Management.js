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
                        <Link activeClassName="active" to="/management/entries"><li>Merkinnät</li></Link>
                        <Link activeClassName="active" to="/management/customers"><li>Asiakkaat</li></Link>
                        <Link activeClassName="active" to="/management/workers"><li>Työntekijät</li></Link>
                        <Link activeClassName="active" to="/management/addworkers"><li>Lisää työntekijä</li></Link>
                    </ul>
                </div>
                <div className="searchBar">
                    <span className="glyphicon glyphicon-search"/>
                    <input className="inputField" onChange={this.handleSearchInput.bind(this)} />
                </div>
                <div className="content">
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}

export default Management;