var man = {
  _age: null,

  get age() {
    if (this._age == undefined) {
      return new Date().getFullYear() - 1989;
    } else {
      return this._age;
    }
  },

  set age(val) {
    val = +val;
    if (!isNaN(val) && val >0 && val <150) {
      this._age = +val;
    } else {
      throw new Error('年龄不合法');
    }
  }
}

console.log(man.age);
man.age = '100';
console.log(man.age);
// man.age = 'abc';

console.log('---------------');