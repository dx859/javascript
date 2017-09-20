import React from 'react';

/*
react合成事件的三种绑定方法
 */

export default class ReactEvent extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick3 = this.handleClick3.bind(this);
  }

  handleClick1(e, arg) {
    console.log(1, e, arg);
  }

  handleClick2 = (e) => {
    console.log(2, e);
  }

  handleClick3(e) {
    console.log(3, e)
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick1.bind(this, 'test')}>Test1</button>
        <button onClick={this.handleClick2}>Test2</button>
        <button onClick={this.handleClick3}>Test3</button>
      </div>
    );
  }
}