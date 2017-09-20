import React, { Component } from 'react';
import './App.css';
import CommentBox from "./flux/comment/CommentBox";


class App extends Component {
  render() {
    return (
      <div className="App">
        <CommentBox/>
      </div>
    );
  }
}

export default App;