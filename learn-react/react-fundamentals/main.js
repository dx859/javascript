import React from 'react';
import ReactDOM from 'react-dom';

/*
// 1. React Base
import App from './app/App-base';
ReactDOM.render(
  <App txt="this is the props text" name="Jerry" id={12} />, 
  document.getElementById('app'));
*/

/*
// 2. React owner-ownee relationship
import App from './app/App-owner-ownee';
ReactDOM.render(
  <App />, 
  document.getElementById('app'));
*/

/*import App from './app/App-refs';
ReactDOM.render(
  <App />, 
  document.getElementById('app'));*/

import App from './app/App-child-properties';
ReactDOM.render(
  <App />, 
  document.getElementById('app'));