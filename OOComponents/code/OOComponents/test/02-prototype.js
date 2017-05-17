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

console.log(person1.hasOwnProperty('name')); // true
console.log(person2.hasOwnProperty('name')); // false;
console.log(hasPrototypeProperty(person2, 'name')); //true

delete person1.name;
console.log(person1.name); // zhangsan


function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && name in object;
}