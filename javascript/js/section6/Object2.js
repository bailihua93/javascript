 function First() {
     this.property = 1;
 }
　First.prototype.getProperty = function () {
     return this.property;
 }

 function Second() {
     this.property = 2;
 }
 Second.prototype = new First();
 Second.prototype.constructor = Second;
 //  Object.defineProperty(he.prototype,"constructor",{
 //  enumerable : false,
 //  value : he
 //  });
 var second = new Second();

function Third(){
    Second.apply(this);
}
var third = new Third();
console.log(third instanceof First);


//  格式化代码　beauty file


//寄生式继承


//直接抽取父级原型改成自己的原型，sub为子构造函数，sup为父构造函数
function inheritPrototype(subType,supperType){
    var prototype = supperType.protoType;
    prototype.constructor = subType ;
    subType.prototype = prototype ;
}

//定义　父级构造函数
function SupperType(){

}
Supper.prototype ={}


//定义　　自己构造函数
function SubType(arg){
    SuperType.apply(this);
    //添加别的属性也在这里并且可以自定义属性也
}
inheritPrototype(SubType,SupperType);
// 自定义子类的原型方法
Subtype.protoType.name_function = function(){

}