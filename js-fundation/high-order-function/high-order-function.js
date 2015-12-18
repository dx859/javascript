/* 计算1到10的和两种方法 */
var total = 0,
  count = 1;

while(count <= 10) {
  total += count;
  count += 1;
}

console.log(total);
console.log(sum(range(1, 10))); // 第二种高阶函数的方法更好

function sum(arr) {
  var result = 0,
    i = 0;

  for(; i < arr.length; i++) {
    result += arr[i];
  }

  return result;
}

function range(m, n, step) {
  var arr = [],
    i = m;

  step = step || 1;

  for(; i <= n; i += step) {
    arr.push(i)
  }

  return arr;
}

/* loop log */
function forEach(array, action) {
  for(var i = 0; i < array.length; i++) {
    action(array[i]);
  }
}

forEach(range(2,18,3), function(value) {
  console.log(value);
});
