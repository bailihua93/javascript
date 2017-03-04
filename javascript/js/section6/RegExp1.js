// test() 只显示是否有
var a = /恒企|新世界/g;
var text = "恒救援新世界";
console.log(a.test(text));

//
var text2 = 'dad mom and me';
var patt2 = /dad( mom (nd))/;
var patt3 = /dad( mom and)/;
console.log(patt2.test(text2));
console.log(patt3.test(text2));

var str="1 plus 2 equal 3"
console.log(str.match(/\d(?= p)+/g));


var text3 = 'cata bata sata fata';
var result = text3.replace(/(.at\w+)/g,"word");
console.log(result);

