import React, {Component} from 'react';
import CommentActions from '../actions/CommentActions';

export default class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.state = { value: '' };
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleAddComment() {
    CommentActions.addComment(this.state.value);
  }

  render() {
    return (
      <div>
        <textarea value={this.state.value} onChange={this.handleChange}/>
        <br/>
        <button
          className="comment-confirm-btn"
          onClick={this.handleAddComment}
        >评论</button>
      </div>
    )
  }
}