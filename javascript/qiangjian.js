window.onload = function () {
    console.log("进入脚本");
    // var table = document.getElementsByTagName("table")[0];
   var checkbox = document.querySelectorAll("input.auditor");
    // console.log(checkbox[0].tagName);
    var sub = document.getElementById("btnaudit");
    var i,
        count = 0,
        len;

    var hengqi = /恒企/;
    var xinshijie = /新世界/;
    var yuanrun = /远润/;
    var jingying = /精英英语/;
    var feicui = /翡翠/;
    var tianyuan = /天源/;
    for (i = 0, len = checkbox.length; i < len; i++) {
        var name = checkbox[i].parentNode.parentNode.children[4].innerHTML;
        if (hengqi.test(name) || xinshijie.test(name) || yuanrun.test(name) || jingying.test(name) || feicui.test(name) || tianyuan.test(name)) {
            checkbox[i].checked = true;
            // console.log(name);
            count++;
        }
    }
    if(count){
        sub.click();
    }
}