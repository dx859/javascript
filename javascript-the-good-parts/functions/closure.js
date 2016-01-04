var myObject = function() {
  var value = 0;

  return {
    increment: function(val) {
      value += typeof val === 'number' ? val : 1;
    },
    getValue: function() {
      return value;
    }
  }
}();

// 构造get方法来访问私有属性
// 该函数可以访问它被创建时所处的上下文环境。这被称为闭包
var quo = function (status) {
  return {
    get_status: function () {
      return status;
    }
  }
}
var myQuo = quo('hello');
console.log(myQuo.get_status());

// 定义一个函数，设置一个DOM节点为黄色，然后把他渐变为白色
var fade = function (node) {
  var level = 1;
  var step = function () {
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;

    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }; 
  }
  setTimeout(step, 100);
}
fade(document.querySelector('.fadeDiv'));

// 使用闭包来帮点事件构造函数循环时的索引
var aLi = document.querySelectorAll('li');
var add_the_handler = function (nodes) { 
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].onclick = function (i) {
      return function() {alert(i)}
    }(i)
  }
}
add_the_handler(aLi);

