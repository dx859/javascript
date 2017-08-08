var _ = require('./index')
var __ = require('../undescores')

console.log(_({hello: 'wrold'}))

_.each({a:'aaa', b: 'bbb'}, function (item, index, obj) {
  console.log(item, index, obj)
})


var arrlike = {
  a : 'aaa',
  b : 'bbb',
  length: 2
}

__.each(arrlike, function (item, index, obj) {
  console.log(item, index, obj)
})