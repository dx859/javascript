import React, {Component} from 'react';

export default class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      value: null,
    };
  }

  componentDidMount() {
    fetch('/data/comment.json')
      .then(response => response.json())
      .then(value => this.setState({loading: false, value}))
      .catch(error => this.setState({loading: false, error}));
  }

  render() {
    if (this.state.loading) {
      return <span>Loading...</span>
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>
    } else {
      const list = this.state.value.commentList;
      return (
        <ul className="comment-box">
          {
            list.map((entry, i) => (
              <li key={`reponse-${i}`} className="comment-item">
                <p className="comment-item-name">{entry.name}</p>
                <p className="comment-item-content">{entry.content}</p>
              </li>
            ))
          }
        </ul>
      )
    }

  }
}