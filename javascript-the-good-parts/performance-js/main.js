/*
1.  在没有优化 JavaScript 引擎的浏览器中，最好尽可能使用局部变量。一个好的经验法则
是：用局部变量存储本地范围之外的变量值，如果它们在函数中的使用多于一次。
2.  在一个函数中，你绝不应该对一个对象成员进行超过一次搜索，除非该值可能改变。 
3.  IE 使用非本地 JavaScript 对象实现 DOM 对象，闭包可能导致内存泄露
 */


/*
function innerHTMLLoop() {
  for (var count = 0; count < 15000; count++) {
    document.getElementById('here').innerHTML += 'a';
  }
}

function innerHTMLLoop2() {
  var html = '';
  for (var i = 0; i < 15000; i++) {
    html += 'a';
  }
  document.getElementById('here').innerHTML = html
}

var date = new Date().getTime();
innerHTMLLoop2();
console.log(new Date().getTime() - date)
*/


function createDiv() {
  var oDiv = document.createElement('div'),
    fragment = document.createDocumentFragment(),
    tmp = null,
    i = 0;

  for (i = 0; i < 10000; i++) {
    tmp = oDiv.cloneNode(false);
    tmp.innerHTML = Math.random();
    fragment.appendChild(tmp);
  }

  document.getElementById('container').appendChild(fragment);
}

function createDiv2() {
  var html = '',
    i = 0;

  for (i = 0; i < 10000; i++) {
    html += '<div>' + Math.random() + '</div>'
  }

  document.getElementById('container').innerHTML = html;
}

function collectionGlobal() {
  var coll = document.getElementsByTagName('div'),
    len = coll.length,
    name = [],
    el = null,
    i = 0;

  for (i = 0; i < len; i++) {
    el = coll[i];
    name[i] = el.nodeName;
    name[i] += ' | ' + el.nodeType;
    name[i] += ' | ' + el.tagName;
  }
  return name;
}
