function curry(fn){
    var fn = Array.prototype.slice.call(arguments)[0];
    var args  =Array.prototype.slice.call(arguments,1);
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null,finalArgs);
    }

}

function add(num1,num2){
    return num1+num2;
}
var curriedAdd = curry(add,5);
console.log(curriedAdd(4));