import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'Jerry'
    };
    this.update = this.update.bind(this);
  }


  update(e) {
    this.setState({
      txt: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Widget update={this.update} txt={this.state.txt}></Widget>
      </div>
    );
  }
}

// class Widget extends React.Component {
//   render() {
//     return (
//       <div> 
//         <input type="text" onChange={this.props.update}/>
//         <p>Your name: {this.props.txt}</p>
//       </div>
//     );
//   }
// }

const Widget = (props) => {
  return (
    <div>
      <input type="text" onChange={props.update} />
      <p>Your name: <span style={{color: 'red'}}>{props.txt}</span></p>
    </div>

  );
}

export default App
