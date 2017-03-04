//字面量创建对象是最常用的方式
var person1 = {
  name: "weichuanzhang",
  age: 29,
  job: "software",
  sysName: function () {
    alert(this.name);
  }
};

//数据属性
var person = {
  name: "hello wang"
};
Object.defineProperty(person, "name", {
  writable: false,
  value: "hi"
});
person.name = "haha";
// console.log(person.name);



// 访问器属性
var book = {
  _year: 2004,
  edition: 1
};
Object.defineProperty(book, "year", {
  get: function () {
    return this._year;
  },
  set: function (newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  }
})
book.year = 2005;
// console.log(book.edition+"   "+book._year);
// 以前的方法
var book3 = {
  _year: 2004,
  edition: 1
};
// book3._defineGetter_('year',function(){
//   return this._year;
// });
// book3._defineSetter_("year",function(newValue){
//   if(newValue>2004){
//     this._year = newValue;
//     this.edition += newValue - 2004;
//   }
// });

// 定义多个属性的时候
var book4 = {};
Object.defineProperties(book4, {
  _year: {
    writable: true,
    value: 2004
  },
  edition: {
    writable: true,
    value: 1
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
});

//获取属性的特性
book4.year = 2006;
var description = Object.getOwnPropertyDescriptor(book4, "year");
// console.log(description);
// console.log(book4.edition);

function Person() {

}
Person.prototype.name = 'bai';
Person.prototype.age = 18;
Person.prototype.sayHello = function () {
  console.log(this.name + " " + this.age);
};
var p1 = new Person();
var p2 = new Person();
p1.sayHello();
p2.sayHello();
//node 不支持_proto_
p2.constructor.prototype.name = "hello";
p1.sayHello();
p2.sayHello();

//判断原型对象是不是某对象的原型函数
// console.log(Person.prototype.isPrototypeOf(p1));
// console.log(Person.prototype.isPrototypeOf(p2));

//获取实例的原型对象　ES5才有的
// console.log(Object.getPrototypeOf(p1));

//constructor 作为最初的原型对象中的属性也被实例继承，可以通过实例来访问构造函数
// console.log(p1.constructor);
Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false,
  value: Person
});


//动态原型模式

function Pig(name, age) {
  // console.log(this);

  this.name = name;
  this.ager = age;
  if (typeof this.sayName != "function") {
    console.log(this);
    Pig.prototype.sayName = function () {
      console.log(this.name);
    }
  }
}

var pig1 = new Pig("bai", 1);
var pig2 = new Pig("hei", 2);

function say() {
  console.log(this);
}
say();
new say();
console.log(say);