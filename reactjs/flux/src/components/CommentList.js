import React, {Component} from 'react';
import CommentActions from '../actions/CommentActions';

export default class CommentList extends Component {
  componentDidMount() {
    CommentActions.loadComment();
  }

  render() {
    const comments = this.props.comments;
    return (
      <ul className="comment-box">
        {comments.map((entry, i) => (
          <li key={`reponse-${i}`} className="comment-item">
            <p className="comment-item-name" style={{color: 'red', fontWeight: 'bold'}}>{entry.name}</p>
            <p className="comment-item-content" style={{paddingLeft: 14}}>{entry.content}</p>
          </li>
        ))}
      </ul>
    )
  }
}
