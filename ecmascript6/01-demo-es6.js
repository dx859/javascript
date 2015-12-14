console.log([1,2,3].map(x => x*x));

var es5Code = 'let x = n => n + 1';
var es6Code = require('babel-core')
  .transform(es5Code, {presets: ['es2015']})
  .code;

console.log(es6Code);
/*
"use strict";

var x = function x(n) {
  return n + 1;
};
*/