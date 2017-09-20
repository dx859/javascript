import AppDispatcher from '../dispatcher/AppDispatcher';
import CommentConstans from '../constants/CommentConstants';
var comment = require('../data/comment');

const CommentActions = {
  loadComment() {
    AppDispatcher.dispatch({type: CommentConstans.LOAD_COMMENT});

    setTimeout(() => {
      let value = comment;
      AppDispatcher.dispatch({type: CommentConstans.LOAD_COMMENT_SUCCESS, payload: {comment: value}});
    }, 300);
  },

  addComment(text) {
    AppDispatcher.dispatch({type: CommentConstans.ADD_COMMENT});
    setTimeout(() => {
      let value = {ok: true}
      AppDispatcher.dispatch({type: CommentConstans.ADD_COMMENT_SUCCESS, payload: {comment: value}});
      comment.commentList.unshift({"name": "arcthur", "content": text, "publishTime": Date.now()});
      this.loadComment();
    }, 300)

  }
};

export default CommentActions;