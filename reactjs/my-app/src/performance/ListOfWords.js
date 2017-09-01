import React from 'react';
import {List} from 'immutable'

class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: List(['marklar'])
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This section is bad style and causes a bug
    // const words = this.state.words;
    // words.push('marklar');
    // this.setState({words})
    // this.setState(({words}) => ({words: words.push('hello')}));
    this.setState(prevState => ({words: prevState.words.push('hello')}))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>显示</button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

export default WordAdder;