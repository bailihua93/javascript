// 检测对象是否有某个方法 不是最好的，需要修改可能                                                          
function isHostMethod(object, property) {
    var t = typeof object[property];
    return t == 'function' ||
        (!!(t == 'object' && object[property])) || t == 'unknown';
}

//  不是最好的，需要修改可能                                                         
function isHostMethod(object, property) {
    var t = typeof object[property];
    return t == 'function' ||
        (!!(t == 'object' && object[property])) || t == 'unknown';
}







/**
 * 浏览器检测对象
 */
var client = function () {

    //呈现引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //完整的版本号
        ver: null
    };


    //浏览器
    var browser = {
        //主要浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        //具体的版本号
        ver: null
    };


    //平台,设备的操作系统
    var system = {
        win: false,
        mac: false,
        xll: false,
        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        //游戏系统
        will: false,
        ps: false
    };

    //检测呈现引擎和浏览器
    var ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp.$1;
        engine.webkit = parseFloat(engine.ver);
        //确定是chrome还是Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp.$1;
            browser.chrome = parseFloat(browser.ver);
        } else {
            //近似地确定版本号
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }
            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp.$1;
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp.$1;
        engine.gecko = parseFloat(engine.ver);
        //确定是不是firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp.$1;
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp.$1;
        engine.ie = browser.ie = parseFloat(engine.ver);
    }
    //检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.xll = (p == "Xll") || (p.indexOf("Linux") == 0);

    //检测Windows操作系统
    if (system.win) {
        if (/Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {

            if (RegExp.$1 == "NT") {
                switch (RegExp.$2) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;
                }
            } else if (RegExp.$1 == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp.$1;
            }
        }
    }

    //移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;
    //windos mobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+. \d)/.test(ua)) {
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp.$1);
        }
    }
    //检测iOS 版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2; //不能真正检测出来,所以只能猜测
        }
    }
    //检测Android版本
    if (/Android (\d+\. \d+)/.test(ua)) {
        system.android = parseFloat(RegExp.$1);
    }
    //游戏系统
    system.will = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);
    //返回这些对象
    return {
        engine: engine,
        browser: browser,
        system: system
    };

}();



/**
 * 类数组转化为数组的方法
 * @param {*} args 
 */
function convertToArrey(args) {
    var arr = null;
    try {
        arr = Arrey.prototype.slice.call(args, 0); //针对非ie8浏览器
    } catch (err) {
        arr = new Array();
        for (var i = 0; i < arg.length; i++) {
            arr.push(arg[i]);
        }
    }
    return arr;
}


/**
 * outputAttributes(element)，遍历属性
 */
function outputAttributes(element) {
    var pairs = new Arrey(),
        attrName,
        attrValue,
        i,
        len;
    for (i = 0, len = element.attributes.length; i < len; i++) {
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        //ie7会返回大量的没有定义的东西，定义后的话该属性的specified 为true
        if (element.attrbutes[i].specified) {
            pairs.push(attrName + " = " + "\"" + attrValue + "\"");
        }

    }
    return pairs.join(" ");
}


if (client.browser.ie && client.browser.ie <= 7) {
    //必须用下面的方法创建对应的元素
    //创建含有name属性的iframe
    var iframe = document.createElement("<iframe name=\"maframe\"></iframe>");

    // 通过表单的reset（）方法重构的input元素
    var input = document.createElement("<input type =\"checkbox\">");

    //可以renset的按钮
    var button = document.createElement("<input type = \"reset\"></button>");

    //单选框
    var radio1 = document.createElement("<input type=\"radio\" name=\"choice\" value=\"1\">");
    var radio2 = document.createElement("<input type=\"radio\" name=\"choice\" value=\"2\">");
}


/**
 * 获取元素内容
 * @param {*} element 
 */
function getInnerText(element) {
    return (typeof element.textContent == "string") ? element.textContent : element.innerText;
}

/**
 * 设置元素的文本内容
 * @param {*} element 
 * @param {*} text 
 */
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}


function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current != null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current != null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}



/**
 * getViewport  获取视口
 */
function getViewport() {
    if (document.compatMode == "BackCompat") {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}
/**
 * 获取元素相对视口的位置
 * @param {*} element 
 */
function getBoundingClientRect(element) {
    if (typeof arguments.callee.offset != "number") {
        var scrollTop = document.documentElement.scrollTop;
        var temp = document.createElement("div");
        temp.style.cssText = "position:absolute;left:0;top:0;";
        doucemnt
    }
}

/**
 * 取得元素的styleSheet
 * @param {*} element 
 */
function getStyleSheet(element) {
    return element.sheet || element.styleSheet;
}
/**
 * 取得文档的大小
 */
function docHeight() {
    if (document.documentElement) {
        return Math.max(document.documentElement.scrollHeight,
            document.documentElement.clientHeight);
    } else {
        return Math.max(document.body.scrollHeight,
            document.body.clientHeight)
    }
}

function docWidth() {
    if (document.documentElement) {
        return Math.max(document.documentElement.scrollWidth,
            document.documentElement.clientWidth);
    } else {
        return Math.max(document.body.scrollWidth,
            document.body.clientWidth)
    }
}

/**
 * 确定元素的大小,也就是距离视口各边的距离
 */
function getBoundingClientRect(element) {

    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;

    if (element.getBoundingClientRect) {
        if (typeof arguments.callee.offset.offset != "number") {
            var temp = document.createElement("div");
            temp.style.cssText = "position:absolute;left:0;top:0";
            document.body.appendChild(temp);
            argument.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
            document.body.removeChild(temp);
            temp = null;
        }
        var rect = element.getBoundingClientRect();
        var offset = argument.callee.offset;
        return {
            left: rect.left + offset,
            right: rect.right + offset,
            top: rect.top + offset,
            bottom: rect.botton + offset
        };
    } else {
        var actualLeft = getElementLeft(element);
        var actualTop = getElementTop(element);
        return {
            left: actualLeft - scrollLeft,
            right: actualLeft + element.offsetWidth - scrollLeft,
            top: actualTop - scrollTop,
            bottom: actualTop + element.offsetHeight - scrollTop
        }
    }
}

/**
 * 事件处理程序对象
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) { //dom 2
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler); //ie8
        } else { //dom0
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler); //ie8
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target ? event.target : event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    getRelateTarget: function (event) {
        if (event.relateTarget) {
            return event.relateTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromeElement;
        } else {
            return null;
        }
    },
    // 获取鼠标的是按下哪个键
    getButton: function (event) {
        if (document.implementation.hasFeature('MouseEvents', "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    getWheelDelta: function (event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    getCharCode: function (event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }

    },
    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return cllipboardData.getData(event);
    },
    setClipboardText: function (event, value) {
        if (event.clipboardData) {
            return event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData("text", value);
        }
    }
}
//获取选择的文本
function getSelectedText(textbox) {
    if (typeof textbox.selectionStart == "number") {
        return textBox.value.substring(textbox.selectionStart, textbox.selectionEnd);
    } else if (document.selection) {
        //ie8
        return document.selection.createRange().text;
    }
}
//选择文本（开发人员用）
function selectText(textbox, startIndex, stopIndex) {
    if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if (textbox.createTextRange) {
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character", startIndex);
        range.moveEnd("character", stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
}

//序列化表单

function serializeForm(form) {
    var parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;

    for (i = 0, len = form.elememts.length; i < len; i++) {
        field = form.elements[i];
        switch (field.type) {
            case "select-one":
            case "select-multiple":

                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ? option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                        }

                    }
                }
                break;
            case undefined: //字段集
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;
            case "radio":
            case "checkbox":
                if (!field.checked) {
                    break;
                }
            default:
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}

//将查询语句添加到url中
function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent("value");
    return url;
}

//创建IE解析xml的方法  

function createDocument() {
    if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"],
            i, len;
        for (i = 0, len = version.length; i < len; i++) {
            try {
                new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                break;
            } catch (error) {
                //跳过，不做处理
            }
        }
    }
    return new ActiveXObject(arguments.callee.activeXString);
}

//解析xml通用版，需要和createDocument使用
function parseXml(xml) {
    var xmldom = null;

    if (typeof DOMParser != "undefind") {
        xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
        var errors = xmldom.getElementsByTagName("parsererrror");
        if (errors.length != 0) {
            throw new Error("XML parse error" + errors[0].textContent);
        }
    } else if (typeof ActiveXObject != "undefined") {
        xmldom = createDocument();
        xmldom.loadXML(xml);
        if (xmldom.parseError != 0) {
            throw new Errror("XML parse error" + xmldom.parseError.reason);
        }
    } else {
        throw new Error("NO XML parser available");
    }
    return xmldom;
}
//序列化xml
function serializeXML(xmldom) {
    if (typeof XMLSerializer != "undefined") {
        return (new XMLSerializer()).serializeToString(xmldom);
    } else if (typeof xmldom.xml != "undefined") {
        return xmldom.xml;
    } else {
        throw new Error("NO serializer available");
    }
}


/**
 * XPath跨浏览器使用，定义了两个函数，selectSingleNode()和selectNodes()
 * 接收的参数：context 、expression 、namespace
 * 其中namespace采用字面量对象即可
 */
function selectSingleNode(context, expression, namespace) {
    var doc = ((context.nodeTyepe != 9) ? context.ownerDocument : context);
    if (typeof doc.evaluate != "undefined") {
        var nsresolver = null;
        if (namespace instanceof Object) {
            nsresolver = function (prefix) {
                return namespace[prefix];
            };
        };
        var result = doc.evaluate(expression, context, nsresoler, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return (result !== null ? result.singleNodeValue : null);
    } else if (typeof context.selectSingleNode != "undefined") {
        if (namespace instanceof Object) {
            var ns = "";
            for (var prefix in namespace) {
                if (namespace.hasOwnProperty(prefix)) {
                    ns += "xmln:" + prefix + "='" + namespace[prefix] + "'";
                }
            }
            doc.setProperty("SelectionNamespace", ns);
        }
        return context.selectSingleNode(expression);

    } else {
        throw new Error("No XPath engine found");
    }
}


function selectNodes(context, expression, namespace) {
    var doc = ((context.nodeTyepe != 9) ? context.ownerDocument : context);
    if (typeof doc.evaluate != "undefined") {
        var nsresolver = null;
        if (namespace instanceof Object) {
            nsresolver = function (prefix) {
                return namespace[prefix];
            };
        };
        var result = doc.evaluate(expression, context, nsresoler, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var nodes = new Array();
        if (result !== null) {
            for (var i = 0, len = result.snapshotLength; i < len; i++) {
                nodes.push(result.snapshotItem(i));
            }
        }
        return nodes;
    } else if (typeof context.selectNodes != "undefined") {
        if (namespace instanceof Object) {
            var ns = "";
            for (var prefix in namespace) {
                if (namespace.hasOwnProperty(prefix)) {
                    ns += "xmln:" + prefix + "='" + namespace[prefix] + "'";
                }
            }
            doc.setProperty("SelectionNamespace", ns);
        }
        var result = context.selectNodes(expression);
        var nodes = new Array();
        for (var i = 0, len = result.length; i < len; i++) {
            nodes.push(result[i]);
        }
        return nodes;


    } else {
        throw new Error("No XPath engine found");
    }
}


/**
 * 原生ajax封装
 */
function ajax(data) {
    //data={data:"",dataType:"xml/json",type:"get/post"，url:"",asyn:"true/false",success:function(){},failure:function(){}}
    //data:{username:123,password:456}
    //data = 'username=123&password=456';
    //第一步：创建xhr对象
    var xhr = null;
    if (window.XMLHttpRequest) { //标准的浏览器
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //第二步：准备发送前的一些配置参数
    var type = data.type == 'get' ? 'get' : 'post';
    var url = '';
    if (data.url) {
        url = data.url;
        if (type == 'get') {
            //       分装原装的ajax，get需要加上不同的数据来清理缓存，或者是通过不同的请求来重新向客户端发送
            url += "?" + data.data + "&_t=" + new Date().getTime();
        }
    }


    //第四步：指定回调函数
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (typeof data.success == 'function') {
                    var d = data.dataType == 'xml' ? xhr.responseXML : xhr.responseText;
                    data.success(d);
                }
            } else {
                if (typeof data.failure == 'function') {
                    data.failure();
                }
            }
        }
    }
    var flag = data.asyn == 'true' ? 'true' : 'false';
    xhr.open(type, url, flag);

    //第三步：执行发送的动作
    if (type == 'get') {
        xhr.send(null);
    } else if (type == 'post') {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data.data);
    }



}

//跨浏览器的CORS  
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}
/*var request = createCORSRequest("get","baidu");
if(request){
    request.onload = function{
        request.responseText;
    };
    request.send(null);
}*/


// JQuery中的JSONP
$(function () {
    $.ajax({
        type: "get",
        url: "bai.com",
        async: "false",
        dataType: "jsonp",
        success: function (data) {

        },
        error: function () {

        }
    })
});


//commet中的流  函数创建方法  
function createStreamClient(url, processFunction, finishFunction) {
    var xhr = new XMLHttpRequest();
    received = 0;
    xhr.onreadystatechange = function () {
        var result;
        if (xhr.readyState == 3) {
            result = xhr.responseText.substring(received);
            received += result.length;
            processFunction(result);
        } else if (xhr.readyState == 4) {
            finishFunction(xhr.responseText);
        }
    }

    xhr.open("get", url, true);
    xhr.send(null);
    return xhr;
}
// var client = createStreamClient() ;使用的时候直接创建就行


//惰性加载XHR
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        //第一个调用的时候重写函数体
        createXHR = function () {
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject != "undefined") {
        createXHR = function () {
            if (typeof arguments.callee.activeXString != "string") {
                var version = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP"],
                    i, len;

                for (i = 0, len = version.length; i < len; i++) {
                    try {
                        new ActiveXObject(version[i]);
                        arguments.callee.activeXString = version[i];
                        break;
                    } catch (e) {

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
    } else {
        createXHR = function () {
            //erro
        }
    }
    return createXHR();
}

// 惰性加载createXHR的时候每次if语句都会覆盖原函数，
// 最后一步调用新的函数（第一次调用必须要调用一次新返回的函数的），下次调用的时候直接调用的是新的函数

var createXHR1 = (function () {
    if (typeof XMLHttpRequest != "undefined") {
        //第一个调用的时候重写函数体
        return function () {
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject != "undefined") {
        return function () {
            if (typeof arguments.callee.activeXString != "string") {
                var version = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP"],
                    i, len;

                for (i = 0, len = version.length; i < len; i++) {
                    try {
                        new ActiveXObject(version[i]);
                        arguments.callee.activeXString = version[i];
                        break;
                    } catch (e) {

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
    } else {
        return function () {
            //erro
        }
    }
})();


//函数绑定
function bind(fn, context) {
    return function () {
        return fn.apply(context, arguments);
    }
}

//函数柯理化

function curry(fn) {
    var fn = Array.prototype.slice.call(arguments)[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    }

}

/*function add(num1,num2){
    return num1+num2;
}
var curriedAdd = curry(add,5);
console.log(curriedAdd(4));*/

//利用柯理化构造更加复杂的bind 
function bind(fn, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(context, finalArgs);
    }
}

//链式setTimeout  
setTimeout(function () {
    //do something

    if (boolean) {
        setTimeout(arguments.callee, 1000);
    }
}, 1000);


/**
 * 当一个数组循环需要很多时间并且不是很着急一次性加载玩，可以使用数组分块技术，   
 * 使用的时候  array.concat()可以返回原数组的克隆体
 * @param {*要循环的数组} array 
 * @param {*处理每一项的函数} process 
 * @param {*这个函数的运行环境} context 
 */
function chunk(array, process, context) {
    setTimeout(function () {
        var item = array.shift();
        process.call(context, item);
        if (array.length > 0) {
            setTimeout(arguments.callee, 100);
        }
    }, 100)
}
// chunk(data.concat(),proccess,null)


/**
 * 函数节流，节流函数  
 * @param {*实际执行函数} method 
 * @param {*执行函数的环境} context 
 */
function throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    }, 100);
}




/**
 * 自定义事件的构造函数
 */
function EventTarget() {
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function (type, handler) {
        if (typeof this.handlers[type] == "undefined") {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i](event);
            }
        }
    },
    removeHandler: function (type, handler) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
}




/*直接使用这个事件 
var target = new EventTarget();
function fn(){};
target.addHandler("hi",fn);
target.fire({type:"hi",other:"other"});
target.removeHandler("hi",fn);  



因为这种行为被封装在单独的类里面，所以，可以通过继承来获得该行为  

function Perspon (name,age){
    EventTarget.call(this);
    this.name = name;
    this.age = age;
}
inhertPrototype(Person,EventTarget);
Person.protoType.say = function(message){
    this.fire({type:"hello",massage:message})
}

调用fire通常是不公开调用的  

function fn2(event){};
var person = new Person();
person.addHandler("hello",fn2);
person.say("message");*/




/**
 * 滚动事件，自定义时间的应用  
 */
var DragDrop = function () {
    var dragdrop = new EventTarget(),
        dragging = null,
        diffX = 0,
        diffY = 0;

    function handleEvent(event) {

        //获取对象
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        //确定事件类型  

        switch (event.type) {
            case "mousedown":
                if (target.className.indexOf("draggable") > -1) {
                    dragging = target;
                    diffX = event.clientX - event.offsetLeft;
                    diffY = event.clientY - event.offsetTop;
                    dragdrop.fire({
                        type: "dragstart",
                        target: dragging,
                        x: clientX,
                        y: clientY
                    });

                }
                break;
            case "mousemove":
                if (dragging != null) {
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                    dragdrop.fire({
                        type: "drag",
                        target: dragging,
                        x: event.clientX,
                        y: event.clientY
                    });

                }
                break;
            case "mouseup":
                dragdrop.fire({
                    type: "dragend",
                    target: dragging,
                    x: event.clientX,
                    y: event.clientY
                });
                break;
        }
    };
    //公共接口  
    dragdrop.enable = function () {
        EventUtil.addHandler(document, "mousedown", handleEvent);
        EventUtil.addHandler(document, "mousemove", handleEvent);
        EventUtil.addHandler(document, "mouseup", handleEvent);
    }
    dragdrop.disable = function () {
        EventUtil.removeHandler(document, "mousedown", handleEvent);
        EventUtil.removeHandler(document, "mousemove", handleEvent);
        EventUtil.removeHandler(document, "mouseup", handleEvent);
    }
}();

//事件的触发还是依赖与原始的事件根据不同的条件来触发的，
//触发函数中的type名字是自己定义的，目的是在触发滚动的同时，可以添加其他的额外代码，进行不同的协作用的  
// var c = function(){return y}()  ==var c = (funcition(){})();最终c是函数的返回值


/**
 * cookie函数的读取、写入和删除   
 */
var CookieUtil = {
    //只能返回value不会返回设置信息
    get: function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
    },
    /**
     * secure 最好传入布尔值
     */
    set: function (name, value, expires, domain, path, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += ";expires=" + expires.toGMTString();
        }
        if (domain) {
            cookieText += ";domain=" + domain;
        }
        if (path) {
            cookieText += ";path=" + path;
        }
        if (secure) {
            cookie += ";secure";
        }
        document.cookie = cookieText;
    },
    /**
     * 没有直接删除已有cookie 的方法，所以需要相同路径 域 安全选项 再次重置cookie并讲value致空/data设置为过去的时间 
     */
    remove: function (name, domain, path, secure) {
        this.set(name, "", new Date(0), path, secure);
    }
}



//子cookie的方法 
var SubCookieUtil = {
    //name是一串的名字，subname是一串中的一个名字 
    get: function (name, subName) {
        var subCookies = this.getAll(name);
        if (subCookies) {
            return subCookies[subName]
        } else {
            return null;
        }
    },
    //返回的就是那一串东西解析后的对象了，属性作为键
    getAll: function (name) {
        var cookieName = encodeURIComponent(name) + "=";
        var cookieStart = document.cookie.indexOf(cookieName),
            cookieValue,
            cookieEnd,
            subCookies,
            i,
            len,
            parts,
            result;
        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            if (cookieValue.length > 0) {
                var subCookies = cookieValue.split("&");
                for (i = 0, len = subCookies.length; i < len; i++) {
                    parts = subcookies[i].split("=");
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                return result;
            }
        }
        return null;
    },
    set: function (name, subName, value, expires, domain, path, secure) {
        var subcookies = getAll(name) || {};
        subcookies[subName] = value;
        setAll(name, subcookies, expires, domain, path, secure);
    },
    setAll: function (name, subcookies, expires, domain, path, secure) {
        var cookieText = encodeURIComponent(name) + "=",
            var subCookiesArray = new Array(),
                subName;
        for (subName in subcookies) {
            if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {
                subCookiesArray.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subCookies[subName]));
            }
        }
        if (subCookiesArray.length > 0) {
            cookieText += subCookiesArray.join["&"];
            if (expires instanceof Date) {
                cookieText += ";expires=" + expires.toGMTString();
            }
            if (path) {
                cookieText += ";path=" + path;
            }
            if (domain) {
                cookieText += ";domain=" + domain;
            }
            if (secure) {
                cookie += ";secure";
            }
        } else {
            cookieText += ";expires=" + (new Date(0)).toGMTString();
        }
        document.cookie = cookieText;
    },
    remove: function (name, subName, domain, path, secure) {
        var subCookies = this.getAll(name);
        if (subCookies) {
            delete subCookies[subName]; //删除对象的某个属性可以这么干？？
            this.setAll(name, subCookies, null, domain, path, secure);
            //上面可能影响了部分cookie的寿命，我也不知道怎么解决
        }
    },
    removeAll: function (name, domain, path, secure) {
        this.setAll(name, null, new Date(0), domain, path, secure);
    }
}

//indexedDB

/*var indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB; //新的浏览器已经支持第一个

// 打开数据库
var request, database;
request = indexDB.open("DBName");
request.onerror = function (event) {
    console.log(event.target.errorCode);
}
request.onsuccess = function (event) {
    database = event.target.result;
    //所有的event.Target都指向request
}
//设置版本
var dbVersion;
if (database.version != "1.0") {
    request = database.setVersion("1.0");
    request.onerror = function (event) {
        console.log(event.target.errorCode);
    };
    request.onsuccess = function (event) {
        dbversion = database.version;
    }
} else {
    dbversion = database.version;
};




//对象
var user1 = {
    username: "001",
    firstName: "lihua",
    lastName: "bai",
    password: "foo"
}
var user2 = {
    username: "002",
    firstName: "lihua",
    lastName: "bai",
    password: "foo"
}
//创建表,这里传入的第一个参数是表名，存储空间名，第二个参数指定了猪键
var store = database.createObjectStore("users", {
    keyPath: "username"
});

//添加或者减少
var users = [user1,user2];

var i = 0,
    len = users.length,
    requests =[];
while(i<len){
    request = store.add(users[i]);
    request.onerror = function(event){
        console.log(request.errorCode);
    }
    request.onsuccess = function(){

    }
    requests.push(request);
}


//通过transaction指定在哪些库中查找，只在一个库的话，直接传入字符串就行了，之后的模式，需要传入指定的值
var IDBTransaction = window.IDBTransaction||window.webkitIDBTransaction;
var transaction = database.transaction(["users","anthorestore"],IDBTransaction.READ_WRITE);
//一个事务可以完成多个请求 ，同时事务本身也有事件处理程序 

transaction.onerror = function(){

}
transaction.onsuccess = function(event){
    //每次操作也会产生的东西
}
transaction.oncomplete = function(event){
    //整个事务完成了，不能取得具体值
}



//取得事物事务的索引后，使用 objectStore()并传入存储空间的名字，就可以访问特定的存储空间 
var store = transaction.objsectStore("users"); 

//使用 add  put   get（key）  delete（key）来操作对象  
request = store.get("007");
request.onerror = function(){

}
request.onsuccess = function(event){
    var result = event.target.result;
}

//键范围
var IDBKeyRange = window.IDBKeyRange||window.webkitIDBKeyRang;

var lowerRange = IDBKeyRange.lowerBound("key");//从键key开始，然后可以移动到最后
//var lowerRange = IDBKeyRange.lowerBound("key"，true);//从键key的下一项开始，然后可以移动到最后
//var upperRange = IDBKeyRange.upperBound("key"[,true]);//从头开始，到（前一项）key为止 
//var boundRange = IDBKeyRange.bound(key1,key2[,true[,true]); 范围
// 使用游标
// request = store.openCursor(range);


// 使用游标
request = store.openCursor();
request.onerror = function(){

};
request.onsuccess = function(event){
    var cursor = event.target.result,
    value,updateRequest;

    //这里的cursor就是索引成功后返回的IDBCursor实例，
    if(cursor){
       if(cursor.key == "1"){
           value = cursor.value;
           value.password = "hah";

           updateRequest = cursor.update(value);
          // updateRequest = cursor.delete();
          
           updateRequest.onerror = function(){

           };
           updateRequest.onsuccess = function(){

           }
       }
       cursor.continue();//移动到下一项可以传入一个key
       //cursor.addvance();可以传入一个index 移动到前一（n）项
    }

};*/


//大数据集的迭代使用DUFF装置迭代要快很多

function Duff(values, fn) {
    if (values.length > 0) {
        var iterations = Math.ceil(values.length / 8);
        var startAt = values.length % 8;
        var i = 0;
        do {
            switch (startAt) {
                case 0:
                    fn(values[i++]);
                case 7:
                    fn(values[i++]);
                case 6:
                    fn(values[i++]);
                case 5:
                    fn(values[i++]);
                case 4:
                    fn(values[i++]);
                case 3:
                    fn(values[i++]);
                case 2:
                    fn(values[i++]);
                case 1:
                    fn(values[i++]);
            }
            startAt = 0;
        } while (--iterations > 0)
    }

}


//加强版 Speed Up Your site中提出的  
function ABKDUFF(values, fn) {
    var iterations = Math.floor(value.length / 8);
    var leftover = values.length % 8;
    var i = 0;
    if (leftover > 0) {
        do {
            fn(values[i++]);
        } while (--leftover > 0);
    }
    do {
        fn(values[i++]);
        fn(values[i++]);
        fn(values[i++]);
        fn(values[i++]);
        fn(values[i++]);
        fn(values[i++]);
        fn(values[i++]);
        fn(values[i++]);
    } while (--iterations > 0);
}