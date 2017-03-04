// 私有变量　：　　函数中定义的变量都可以认为是私有变量，外部不可访问，包含函数的参数／局部变量／内部定义的其他函数
// 特权方法　：   闭包可以访问私有变量，有权访问私有变量和私有方法的方法成为特权方法
function Myobject(){
    //私有变量和私有方法
   var privateVariable = 10;
   function privateFunction(){

   }
   　
   //特权方法
   this.publicMethed = function(){
       privateVariable++;
       return privateFunction();
   }
}

//利用私有和特权成员，可以隐藏那些不应该被修改的数据
function Person(name){
    this.getName = function(){
        return name;
    };
    this.setName = function(value){
        name = value;
    }
}
// 　闭包可以访问形参，即使没有重新定义一个变量，也可以保存下来形参的
// 缺点:   必须使用构造函数模式来达到这个目的



// 静态私有变量,用表达式创建，并且所有的实例都是共享一个变量的
(function(){
//这里是私有作用域，　一旦执行后没有任何引用，只会销毁
var privateVariable = 10;
function privateFunction(){
    return false;
}
MyObject1 = function(){

};
MyObject1.prototype.publicMethed= function(){
    privateVariable++;
    return privateFunction();
};
})();

var o1 = Object();

// 模块模式：和静态的区别是直接返回了一个字面量对象
// 为单例创建私有变量和特权方法
// 单例：只有一个实例的对象






