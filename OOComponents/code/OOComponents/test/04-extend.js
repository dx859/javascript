// 1. 原型链继承
/*function SuperType() {
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

console.log(instance instanceof SubType);   // true
console.log(instance instanceof SuperType); // true
console.log(instance instanceof Object);    // true*/
/*function SuperType() {
    this.property = 'super';
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
};

function SubType() {
    this.subProperty = 'sub';
}

SubType.prototype = new SuperType();

SubType.prototype = {
    getSubValue: function() {
        return this.subProperty;
    }
};
*/

/*// 构造函数继承
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

*/

/*// 组合继承
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'green', 'blue'];
}
SuperType.prototype.sayName = function() {
    console.log(this.name);
};


function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

SubType.prototype = new SubType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
    console.log(this.age);
};
*/
/*
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
console.log(anotherPerson.friends);

var anotherPerson2 = Object.create(person, {
    name: {
        value: 'Gray'
    }
});

anotherPerson2.friends.push('dangdang');
console.log(anotherPerson2.name);
console.log(anotherPerson2.friends);*/

// 拷贝继承
function extend(newObj, oldObj) {
    for( var attr in oldObj) {
        newObj[attr] = oldObj[attr];
    }
}

function Person(name, sex) {
    this.name = name;
    this.sex = sex;
}
Person.prototype.showName = function() {
    console.log(this.name);
};

function Star(name, sex, job) {
    Person.call(this, name, sex);
    this.job = job;
}

extend(Star.prototype, Person.prototype);

