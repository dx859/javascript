import React, { Component } from 'react';
import NativeEvent from './form/FormDemo';
import './App.css';

class App extends Component {
  handleClick(e, arg) {
    console.log(e, arg);
  }

  render() {
    return (
      <div className="App">
        <NativeEvent/>
      </div>
    );
  }
}

export default App;