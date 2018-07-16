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
          <a href="http://localhost:3000/link/google?access_token=9hQwaid09eF54Jwl7pDxNBoC9BEkJpxBI8z2Uf6CYxpfbaPzmqghN1cDGl1fLxtr">LINK GOOGLE</a>
        </p>
      </div>
    );
  }
}

export default App;
