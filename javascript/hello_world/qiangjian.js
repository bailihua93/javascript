(function () {
    console.log("进入脚本");
    // var table = document.getElementsByTagName("table")[0];
    var checkbox = document.querySelectorAll("input.auditor");
    // console.log(checkbox[0].tagName);
    var sub = document.getElementById("btnaudit");
    console.log(sub);
    var i,
        count = 0,
        len,
        href = null;

    var hengqi = /恒企/;
    var xinshijie = /新世界/;
    var xinbei = /新贝/;
    var yuanrun = /远润/;
    var jingying = /精英/;
    // var feicui = /翡翠/;
    var yingyu = /英语/;
    var mage = /马哥/;
    var xinbei = /新贝/;
    // var liren = /东方丽人/;
    var kuaiji = /会计/;
    var kelaite = /科莱特/;
    var weibo = /韦博/;


    for (i = 0, len = checkbox.length; i < len; i++) {
        var name = checkbox[i].parentNode.parentNode.children[4].innerHTML;
        if (weibo.test(name) || kelaite.test(name) || xinbei.test(name) || kuaiji.test(name) || mage.test(name) 
        || xinbei.test(name) || yingyu.test(name) || hengqi.test(name) || xinshijie.test(name) || yuanrun.test(name) 
        || jingying.test(name)) {
            checkbox[i].checked = true;
            href = checkbox[i].parentNode.parentNode.children[1].children[0].href;
            count++;
            break;
        }
    }
    if (count) {
        sub.click();
        window.open(href);
    }

})();