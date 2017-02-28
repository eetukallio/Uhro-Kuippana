import React, { Component } from 'react';
import logo from './images/urho-logo.png';
import './App.css';
import Nav from './nav/Nav';

import { browserHistory, Router, Route, IndexRoute} from 'react-router'

class App extends Component {

  render() {
    return (
        <div>
          <Nav />
          <div  className="content">
            {this.props.children}
          </div>
        </div>  
    );
  }


}

export default App;
