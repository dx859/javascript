var fibonacci = function(n) {
  count++;
  return n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1);
}
var count = 0
for (var i = 0; i <= 10; i++) {
  console.log(i + '=>', fibonacci(i))
}

console.log('count = %d', count) // count被调用了453次

// 可以使用一个数组把每次运算的结构储存，调用时候看看是否存储了结构，如果存在立即返回

var fibonacci2 = function() {
  var memo = [0, 1];
  var fib = function(n) {
    count++;
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  }
  return fib;
}();

var count = 0
for (var i = 0; i <= 10; i++) {
  console.log(i + '=>', fibonacci2(i))
}

console.log('count = %d', count) // count被调用了29次
