import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Jerry'
    };
  }

  update(e) {
    console.log(this.state);
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <Widget update={this.update} name={this.state.name}></Widget>
      </div>
    );
  }
}

class Widget extends React.Component {
  render() {
    console.log(this.props.name);
    return (
      <div>
        <input type="text" onChange={this.props.update.bind(this)}/>
        <p>Your name: {this.props.name}</p>
      </div>
    );
  }
}

export default App;
