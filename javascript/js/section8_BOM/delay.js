/**
 *  超时调用
 */


// 延迟　第一个参数可以是字符串可以是函数，推荐函数
var timer = setTimeout(function() {
    console.log("延迟了１０秒");
}, 5000);

// 直接字符串也是可以的，在node中已经被屏蔽了，别用了
// setTimeout("console.log(‘自带ｅｖａｌ函数’)",1000);

// 在执行前调用清楚可以把他取消
// clearTimeout(timer);

/**
 * 间歇调用,在函数内部设置限制条件来结束循环
 */
var num = 0;
var timer1 = setInterval(function(){
     num++;
     console.log(num)
     if(num>10){
         clearInterval(timer1);
         console.log("down")
     }
},1000);

/**
 * 用超时模拟间歇,函数必须是有名字的了,并且不推荐直接使用间歇调用
 */
num = 0;
// var timer3 = setTimeout(function() {
//     console.log(num)

// }, 1000);
function interval(){
    num++;
    console.log(num);
    if(num<10){
        setTimeout(interval,1000);
    }else{
        console.log("满足的话继续循环")
    }
}
setTimeout(interval,1000);