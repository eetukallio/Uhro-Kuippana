/**
 * Created by mickykyei on 9.3.2017.
 */
import React, { Component } from 'react';
import './Workers.css';
import DataTable from './DataTable';

class Workers extends Component {
    
    render() {
        return (
            <div  className="workers">
                <DataTable src="http://207.154.228.188:3000/users"/>
            </div>
        );
    }
}

export default Workers;