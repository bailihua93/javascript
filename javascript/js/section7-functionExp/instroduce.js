// 创建函数
//声明函数
function functionName(){

}


//浏览器支持一个name属性，返回函数名（声明时的名字）
var name =　functionName.name;


//函数声明提升：执行代码前会先执行函数声明
say();
function say(){}
//不会报错


//函数表达式多种
//匿名函数的函数表达式,function 后面没有跟着标识符就是匿名函数
var functionName = function(arg1,arg2,arg3){

};

// 函数表达式和普通的表达式一样，必须先赋值才调用，下面的会报错
/*say1();
var say1 = function(){};   */

//即使是命名函数表达式也是不行的
/*say2();
var say1 = function　say2(){};*/



//不允许使用条件来声明　函数；　想要不同的条件来创建函数，必须使用函数表达式，
// 下面代码无效，自动修复后保留了后面的声明
var condition;
　if(condition){
    function say1(){
        return "hello";
    }
}else{
    function say1(){
        return "ha";
    }
}

console.log(say1());

//把函数当做值来传递的话，都可以使用匿名函数


