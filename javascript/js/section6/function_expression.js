// 函数声明提升
// say();
function say(){
    console.log("hi");
}
var name = say.name;//非标准的属性　返回函数名
//函数表达式
// １．匿名形式的
var functionName = function(arg){

}
//2.命名形式的函数表达式
var functionName2 =  function   f1(arg){

}

/*var factorial = function(num){
    if(num<1){
        return 1;
    }else{
        return arguments.callee(num-1)*num;
    }
}*/
// console.log(factorial(5));  

var factorial = function f1(num){
    if(num<1){
        return 1;
    }else{
        return f1(num-1)*num;
    }
}

console.log(factorial(5)); 
console.log(factorial.name); 