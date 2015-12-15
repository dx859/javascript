import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      red: 0,
      green: 0,
      blue: 0,
      name: 'Jerry'
    }
    this.update = this.update.bind(this);
  }


  update(e) {
    console.log(this.refs.red)
    this.setState({
      red: this.refs.red.refs.inp.value,
      green: this.refs.green.refs.inp.value,
      blue: this.refs.blue.refs.inp.value
    });
  }

  render() {
    return (
      <div>
        <br/>
        <Slide ref="red" update={this.update}></Slide><label>{this.state.red}</label>
        <br/>
        <Slide ref="green" update={this.update}></Slide><label>{this.state.green}</label>
        <br/>
        <Slide ref="blue" update={this.update}></Slide><label>{this.state.blue}</label>
      </div>
    );
  }
}

class Slide extends React.Component {
  render() {
    return (
      <input ref="inp" type="range" min="0" max="255" onChange={this.props.update} />
    );
  }
}

export default App
