import React, { Component } from 'react';

/*
 React 合成事件系统的委托机制，在合成事件内部仅仅对最外层的容器进行了绑定，并且依赖事件的冒泡机制完成了委派。
 对于无法使用React 合成事件的场景，我们还需要使用原生事件来完成。
 */
class ReactNativeEvent extends Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default ReactNativeEvent;