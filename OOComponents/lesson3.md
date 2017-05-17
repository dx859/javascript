## 1. 原型链继承

```js
function SuperType() {
    this.property = 'super';
}
SuperType.prototype.getSuperValue = function() {
    return this.property;
};
function SubType() {
    this.subProperty = 'sub';
}
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
    return this.subProperty;
};
var instance = new SubType();
console.log(instance.getSuperValue());
console.log(instance.getSubValue());
```

原型与实例的关系

```js
console.log(instance instanceof SubType);   // true
console.log(instance instanceof SuperType); // true
console.log(instance instanceof Object);    // true
```

**注意：**不同通过对象字面量的方法创造原型方法，因为这样会重写原型链。

```js
SubType.prototype = {
    getSubValue: function() {
        return this.subProperty;
    }
};
```

## 2. 借用构造函数继承

因为包含引用类型的原型属性会被所有实例所共享。所以一般不直接使用原型链继承

```js
// 构造函数继承
function SuperType() {
    this.colors = ['red', 'green', 'blue'];
}

function SubType() {
    // 通过改变this指向继承了SuperType
    SuperType.call(this);
}

var instance1 = new SuperType();
instance1.colors.push('gray');
console.log(instance1.colors);

var instance2 = new SubType();
console.log(instance2.colors);
```

**问题：**方法只能在构造函数中定义。函数的复用无从谈起。

## 3. 组合继承

```js
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'green', 'blue'];
}
SuperType.prototype.sayName = function() {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name); // 继承属性
    this.age = age; // 定义自己的属性
}
SubType.prototype = new SubType(); // 继承方法
SubType.prototype.constructor = SubType; // 改变构造函数
SubType.prototype.sayAge = function() { // 定义自己的方法
    console.log(this.age);
};
```

## 4. 原型试继承

首先看一个函数

```js
function object(o) {
    function F() {} // 创建一个构造函数
    F.prototype = o; // 把对象实例赋值给构造函数的原型
    return F; // 返回这个构造函数
}
```

这种继承方式要求你必须有一个对象作为另一个对象的基础。如果有这个对象的话，可以把它传递给 object 函数，然后更具需求对得到的对象进行修改即可。

在ECMA5中新增加了Object.create()方法规范了原型式继承。这个方法接受两个参数。一个用作新对象原型的对象和一个为新对象定义额外属性的对象（可选）。在一个参数情况下，Object.create()与object()方法相同。

```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

var person = {
    name : 'zhangsan',
    friends : ['lisi', 'wangwu', 'zouliu']
};

var anotherPerson = object(person);

anotherPerson.name = 'liyi';
anotherPerson.friends.push('dingdiang');
console.log(anotherPerson.friends);// [ 'lisi', 'wangwu', 'zouliu', 'dingdiang' ]

var anotherPerson2 = Object.create(person, {
    name: {
        value: 'Gray'
    }
});
anotherPerson2.friends.push('dangdang');
console.log(anotherPerson2.friends); //[ 'lisi', 'wangwu', 'zouliu', 'dingdiang', 'dangdang' ]
```

**问题：**如果属性是引用类型就会出现所有实例共享对象。