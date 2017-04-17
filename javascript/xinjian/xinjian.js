(function(){
var storage = window.localStorage;
var old = storage.getItem("the_length")||0;
old = parseInt(old);
console.log(old);
var lis = document.querySelector("#star-pagination>li:nth-of-type(5)").firstChild.firstChild.textContent;
var li = /\d+/.exec(lis);
current = parseInt(li);
console.log(current);
if(old < current ){
    alert("有新件，找一下吧"); 
}
storage.setItem("the_length",current);
})()
