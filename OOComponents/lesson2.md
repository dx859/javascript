## 1. 理解原型对象

无论什么时候，只要创建了一个函数，就会根据一组特定的规则在该函数上创建一个原型对象。

在默认情况下，所有的原型对象就会自动获得一个 constructor （构造函数）属性，这个属性指一个 prototype 属性所在的函数指针。

当为对象添加一个属性的时候，这个属性会屏蔽原型对象的同名属性。换句话说，添加对象只会阻止我们访问原型中的那个属性，但是不会修改这个属性。

```js
function Person() {
}

Person.prototype.name = 'zhangsan';
Person.prototype.age = 23;
Person.prototype.sayName = function() {
    console.log(this.name);
};

person1 = new Person();
person1.name = 'lisi';
person2 = new Person();

console.log(person1.name); // lisi
console.log(person2.name); // zhangsan
delete person1.name;
console.log(person1.name); // zhangsan
```

更简单的原型语法

```js
function Person() {
}
Person.prototype = {
    constructor : Person, // 注意一定要改constructor的指向。
    name: "zhangsan",
    age : 24,
    sayName: function() {
        console.log(this.name);
    }
}
```

## 2. 原型对象的特有方法

- 使用 hasOwnProperty() 方法判断是一个属性是否存在实例中，还是原型中。这个方法是从Object类中继承而来。

```js
// 在上面代码 delete 前面加上两句
console.log(person1.hasOwnProperty('name')); // true
console.log(person2.hasOwnProperty('name')); // false;
```

- 原型与 in 操作符： 只要能够通过对象访问的属性，通过 in 就能访问。所以通过 hasOwnProperty 和 in 配合就能判断原型中是否有某个属性。

```js
function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && name in object;
}
```
- toString(): object上的方法，对于类型检查有特别大用处
系统下面的类都是自带的，自己写的对象都是继承原型链上Object的

```js
arr.toString == Object.prototype.toString // false
function Aaa() {};
var a = new Aaa();
a.toString == Object.prototype.toString // true
```
toString 能进行更加安全类型的检测

js 判断一个对象是哪种内型一共有3种方法，构造函数判断，instanceof判断，toString()判断

但是构造函数可以通过外界修改。
instanceof判断不了通过iframe创建的数组。

所以使用 toString()最准确

```js
function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]';
}

function isArrayForConstru(value) {
    return value.constructor == Array;
}

function isArrayForInstance(value) {
    return value instanceof Array;
}

window.onload = function() {
    var oF = document.createElement('iframe');
    document.body.appendChild(oF);

    var ifArray = window.frames[0].Array;
    var arr = new ifArray();
    alert( isArray(arr)); // true
    alert( isArrayForConstru(arr)); // false
    alert( isArrayForInstance(arr)); // false
};

var arr = [1,2,3];
// alert(isArray(arr)); //true
// alert(isArrayForConstru(arr)); //true
// alert(isArrayForInstance(arr)); //true
```


## 3. 原型的动态性

原型中查找值的过程是一次搜索，所以当我们修改原型对象的时候，能从实例中反映出来。

```js
function Person() {
}
var friend = new Person();
Person.prototype.sayHello = function() {
    console.log('hi!');
};
friend.sayHello(); // hi!
```

**注意：**当使用原型简写方式时会报错，因为简写方式是直接赋值。直接改了原型的指针。

```js
function Person() {
}
var friend = new Person();
Person.prototype = {
    constructor: Person,
    sayHello: function() {
        console.log("hi!");
    }
};

friend.sayHello();
```

## 组合使用原型和构造函数创建对象
```js
function Person(name, age) {
    this.name = name;
    this.age = age;

}
Person.prototype = {
    constructor: Person,
    sayName: function() {
        console.log("Hi: " + this.name);
    }
};
```

