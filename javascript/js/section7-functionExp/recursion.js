//  定义阶乘
function factorial(num){
    if(num<1){
        return 1;
    }else{
        return factorial(num-1)*num;
    }
}
// 直接用可以，但是赋值给别的变量后接不能用了
/*var f2 =factorial;
factorial =null;
f2(5);*/  //这种会报错的

// 　递归就得解开耦合

//非严格模式下
function factorial1(num){
    if(num<1){
        return 1;
    }else{
        return arguments.callee(num-1);
    }
}

// 严格模式下　callee 这种会报错，需要用命名函数表达式来改变

var factorial2 = function f2(num){
    if(num<1){
        return 1;
    }else{
        return num*f2(num-1);
    }
}