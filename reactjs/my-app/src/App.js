import React, { Component } from 'react';
import './App.css';
import CommentListContainer from "./flux/comment/CommentListContainer";


class App extends Component {
  render() {
    return (
      <div className="App">
        <CommentListContainer/>
      </div>
    );
  }
}

export default App;