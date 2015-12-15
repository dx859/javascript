import React from 'react';

// 1. jsx
// class App extends React.Component {
//   render() {
//     return <div>hello</div>
//   }
// }
// // 2. js
// class App extends React.Component {
//   render() {
//     return React.createElement('h1', null, 'hello guys')
//   }
// }
// 3. es2015
// const App = () => <h1>hello eggheads</h1>


// The Render Method
// The Render Method only return one element outside:
// <h1>Hello World</h1> <b>Bold</b> => React.createElement('h1', null, 'Hello World') React.createElement('b', null, 'Bold')

// if we want create more elements, we can do this:

class App extends React.Component {
  constructor() {
    super();
    this.state = { txt: 'this is the state txt'};
  }

  update(e) {
    this.setState({txt: e.target.value})
  }

  render() {
    let name = this.props.name;
    let id = this.props.id
    return (
      <div>
        <h1>{this.props.txt}</h1>
        <b>{id}: {name}</b>
        <br/>
        <input type="text" onChange={this.update.bind(this)}/>
        <p>{this.state.txt}</p>
      </div>
    );
  }
}

App.defaultProps = {
  txt: 'this is the default txt'
}

App.propTypes = {
  txt: React.PropTypes.string,
  id: React.PropTypes.number,
  name: React.PropTypes.string

}

export default App
