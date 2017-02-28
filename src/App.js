import React, { Component } from 'react';
import './App.css';
import Nav from './nav/Nav';

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
