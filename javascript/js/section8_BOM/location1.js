// 'use strict';
/**
 * location    window.location == document.location, 保存当前文档信息并且将URL解析为独立的片段 
 */


/**
 * 解析url中的queryString   , location.search
 */

function getQueryStringArgs() {                                             
 //获取没有没有问号的字符串
 var qs = (location.search.length > 0) ? location.search.substring(1) : "",
//  var qs ="q=hello&g=10",
     //保存数据的对象，这是个全局的变量　　？？？？
     args = {},
     //取得每一项
     items = qs.length ? qs.split("&") : [],
     item = null,
     name = null,
     value = null,
     // 循环用
     i = 0,
     len = items.length;
     // 取出每一项
     for(i =0;i<len;i++){
         item =items[i].split("=");
         name =decodeURIComponent(item[0]);
         value = decodeURIComponent(item[1]);
         if(name.length){
            args[name] = value;
         }
     }
     return args;
 }



// console.log(getQueryStringArgs());
setTimeout(function() {
  location.assign("http://www.baidu.com");  
}, 5000);

//  不是最好的，需要修改可能                                                         
function isHostMethod(object,property){
  var t = typeof object[property];
    return t == 'function'||
  (!!(t == 'object'&&object[property]) )||t == 'unknown';
}