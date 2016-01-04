String.prototype.deentityify = function() {

  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  }

  return function() {
    return this.replace(/&([^&;]+);/g, function(a, b) {
      var r = entity[b];
      return typeof r === 'string' ? r : a;
    })
  }
}(); // 我们用()运算法立刻调用我们刚刚构造出来的函数，这个调用所返回的是函数才是deentityify的方法

// 模块利用函数作用域和闭包来创建绑定对象与私有成员关联。

// console.log('&lt;div&gt; hello &lt;/div&gt;'.deentityify());

// 模块也可以用来产生安全的对象
// 构造一个用来产生序列号的对象
var serial_maker = function() {
  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function(p) {
      prefix = String(p);
    },
    set_seq: function(s) {
      seq = s;
    },
    gensym: function() {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  }
}

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
console.log(seqer.gensym())
// 如果我们把seqer.gensym作为一个值传递给第三方，哪这个函数就能用它产生唯一一个字符串
