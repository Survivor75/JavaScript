import React, { Component } from 'react';
import Ninjas from './Ninjas'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Simple React App</h1>
      <p>Hello React :)</p>
      
      <Ninjas name="peace" age="23" belt="black"/>
      
      </div>
    );
  }
}

export default App;
