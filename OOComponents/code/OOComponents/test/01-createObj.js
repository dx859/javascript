// 创建对象的几种方式

// 1. 工厂模式

function createPerson(name, age) {
    var o = {}; // o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function() {
        console.log(this.name);
    };

    return o;
}

var zhangsan = createPerson('zhangsan', 24);
var lisi = createPerson('lisi', 28);
zhangsan.sayName();
lisi.sayName();

// 2. 构造函数模式
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        console.log(this.name);
    };
}
var zhangsan = new Person('zhangsan', 24);
var lisi = new Person('lisi', 28);
zhangsan.sayName();
lisi.sayName();

// 查看实例的构造函数
console.log(zhangsan.constructor == Person); // true
console.log(lisi.constructor == Person); // true

// 查看实例是否属于某个对象
console.log(zhangsan instanceof Person); // true
console.log(zhangsan instanceof Object); // true

// 注意，当构造函数不用new操作符号使用的时候，this的指向是window， 这是非常危险的
Person('wangwu', 44);
sayName(); // sayName变成全局函数
console.log(name);
console.log(age);

// 构造函数的缺点：每个方法都会在每个实例上重新创建一个
console.log(zhangsan.sayName === lisi.sayName); // false;

// 解决这个方法的方式是添加一个函数，然后方法的引用指向这个函数
function Person1(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = sayNameFn;
}

function sayNameFn() {
    console.log(this.name);
}
var zhangsan = new Person1('zhangsan', 24);
var lisi = new Person1('lisi', 28);
console.log(zhangsan.sayName === lisi.sayName); // false;