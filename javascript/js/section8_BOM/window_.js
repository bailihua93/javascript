 window.onload = function () {
     //screantop　和　screen left 虽然如此还是无法跨浏览器的条件下取得窗口左边和上边的距离，并且这个必须写在里面或者局部环境里面
     var left = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
     var top = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
    /* document.write(left + " " + top);
     console.log(top);*/
　　　
　  // 窗口大小无法确认，只能确认页面的视口大小
　　　var pageWidth = window.innerWidth;
     var pageHeight = window.innerHeight;
     /*针对ie8  以下的部分*/
     if(typeof pageWidth != "number"){
        //  标准模式
         if(document.compatMode == "CSS1Compat"){
             pageWidth = document.documentElement.clientWidth;
             pageHeight = document.documentElement.clientHeight;
         }else{
            pageWidth = document.body.clientWidth;
            pageHeight =document.body.clientHeight;
         }
     }
   
      //   在移动设备中
　　　　/*　window.innerWidth window.innerHeight ; 保存着可视视口
　　　　　document.documentElement.clientHeight ;保存着渲染视口
　　　　　document.body.clientHeight ;winphone 的渲染视口*/

    //  导航和打开新窗口
    var bt_open =  document.getElementById("hello");

    bt_open.onclick = function(){
        window.open("http://www.huxiu.com","_top");
    }
  
  　　正确的打开方式
    var block = false;
    try{
        var wrixWin = window.open("http://www.baidu.com","_blank",
        "height=400,width=400,top=10,left=10,resizable",false);
        if(wrixWin == null){
            blocked = true;
        }
    }catch(ex){
        blocked = true;
    }
    if(blocked){
       document.write("新窗口被屏蔽了！");
    }

 }