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

function serialize(form) {
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
function addQueryStringArg(url, name, value) {
    if (url.indexOf("?") == -1) {
        url += "?";
    } else {
        url += "&";
    }
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
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