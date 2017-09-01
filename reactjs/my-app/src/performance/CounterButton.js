import React from 'react';

export default class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { count: 1 }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.color !== nextProps.color)
  //     return true;
  //   if (this.state.count !== nextState.count)
  //     return true;
  //   return false;
  // }

  render() {
    let style = {
      backgroundColor: this.props.color
    }
    return (
      <button style={style} onClick={()=>this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}