import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <a href="http://localhost:3000/link/google?access_token=qxAivCv8sxRYOa5C0aQ45LGi3hpd1F5aDKqMXXsr97DzvJRwZBI31A7iRH4uRxSU">LINK GOOGLE</a>
        </p>
      </div>
    );
  }
}

export default App;
