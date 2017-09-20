/**
 * Created by daixi on 2017/9/20.
 */
import React, {Component} from 'react';
import CommentListContainer from './CommentListContainer';
import CommentForm from "./CommentForm";

export default class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: fetch('/data/comment.json'),
    };
  }

  handleSubmitComment(value) {
    // fetch('/api/submit.json', {method: 'POST', body: `value=${value}`})
    //   .then(response => response.json())
    //   .then(value => {
    //     if (value.success) {
    //       this.setState({comments: fetch('/data/comment.json')});
    //     }
    //   })
    console.log('hello')
  }

  render() {
    return (
      <div>
        <CommentListContainer comments={this.state.comments}/>
        <CommentForm onSubmitComment={this.handleSubmitComment.bind(this)} />
      </div>
    )
  }
}