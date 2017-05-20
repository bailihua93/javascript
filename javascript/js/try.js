var a =[1,2,3,4,5];
var c = a.splice(2);  // 在原数组上改变，a [1,2]  c [3,4,5]
var c = a.splice(2,1);  // 在原数组上改变，a [1,2,4,5]  c [3]
var c = a.splice(2,1,6);  // 在原数组上改变，a [1,2,6,4,5]  c [3]
console.log(a);
console.log(c);