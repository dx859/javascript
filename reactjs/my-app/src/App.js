import React, { Component } from 'react';
import ListOfWords from './performance/ListOfWords'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
    };
    this.hanldeClick = this.hanldeClick.bind(this);
  }

  hanldeClick(e) {
    let value = this.refs.words
    console.log(value);
  }

  render() {
    return (
      <div className="App">
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

export default App;