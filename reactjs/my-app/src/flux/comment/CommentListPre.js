import React from 'react';

export default function CommentListPre({comments}) {
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