import React, {Component} from 'react';
import CommentListPre from "./CommentListPre";

const Promised = (Wrapped) => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      value: null,
    }
  }

  render() {
    if (this.state.loading) {
      return <span>Loading</span>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;

    } else {
      return <Wrapped {...this.props} {...this.state.value}/>;
    }
  }

  componentDidMount() {
    fetch('/data/comment.json')
      .then(response => response.json())
      .then(value => this.setState({loading: false, value}))
      .catch(error => this.setState({loading: false, error}))
  }

};

class CommentListContainer extends Component {
  render() {
    return <CommentListPre data={data}/>
  }
}

export default Promised(CommentListContainer);


// export default class CommentListContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true,
//       error: null,
//       value: null,
//     }
//   }
//
//   componentDidMount() {
//     fetch('/data/comment.json')
//       .then(response => response.json())
//       .then(value => this.setState({loading: false, value}))
//       .catch(error => this.setState({loading: false, error}))
//   }
//
//   render() {
//     if (this.state.loading)
//       return <span>Loading</span>;
//     else if (this.state.error !== null)
//       return <span>Error: {this.state.error.message}</span>;
//     else
//       return <CommentListPre comments={this.state.value.commentList}/>;
//
//   }
// }
