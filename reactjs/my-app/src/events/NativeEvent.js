import React from 'react';

/*
在React 中使用DOM 原生事件时，一定要在组件卸载时手动移除，否则很
可能出现内存泄漏的问题。而使用合成事件系统时则不需要，因为React 内部已经帮你妥善地处
理了。
 */
export default class NativeEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.button.addEventListener('click', (e) => {
      this.handleClick(e);
    });
  }

  componentWillUnmount() {
    this.refs.button.removeEventListener('click');
  }

  handleClick(e) {
    console.log(e)
  }

  render() {
    return (
      <div>
        <button ref="button">Test</button>
      </div>
    );
  }
}
