import {combineReducers, createStore} from 'redux';

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      });
    default:
      return state
  }
}

let reducer = combineReducers({visibilityFilter, todos});
let store = createStore(reducer);
store.dispatch({
  type: 'ADD_TODO',
  text: 'hello'
});
store.dispatch({
  type: 'ADD_TODO',
  text: 'word'
});
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
});
console.log(store.getState())
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
console.log(store.getState())