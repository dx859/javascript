## 拷贝继承

属性的继承： 调用父类的构造函数 call
方法的继承： for in 拷贝

通过call直接调用父类函数，通过改变this指向，实现欺诈继承
由于函数只能从新赋值，不能改变的特性，可以通过原型浅拷贝来实现继承

```js
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
```

