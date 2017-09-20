import React from 'react';

export default function CommentListPre({comments}) {
  return (
    <ul className="comment-box">
      {comments.map((entry, i) => (
        <li key={`reponse-${i}`} className="comment-item">
          <p className="comment-item-name">{entry.name}</p>
          <p className="comment-item-content">{entry.content}</p>
        </li>
      ))}
    </ul>
  )
}