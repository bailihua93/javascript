//字面量创建对象是最常用的方式
var person = {
  name : "weichuanzhang",
  age : 29,
  job :"software",
  sysName : function(){
    alert(this.name);
  }
}

es5中定义只有内部采用的特性时，描述了属性的各种特性。这些特性是为了实现js引擎用的，js中不能直接访问他，
为了表示特性是内部值，该规范吧他们放在了方括号中。

##ECMAScript有两种属性：数据属性和访问器属性
###数据属性
+ [Configurable]:能否delete属性 从而重新定义新的属性，能否把属性修改为访问器属性。（默认为true）
+ [Enumerable]:是否支持for-in, 默认为true
+ [Writable] 是否可以修改属性的值，默认为true；
+ [Value] 包含之歌属性的数据值，读写都是从这个位置来的，默认值为undefined;

+ 修改默认属性值的方法(ie8 之后才有的)
Object.defineProperty(object,"name",{
  configurable : boolean,//只能设置一次false，之后就不能修改属性了
  writable : boolean,
  enumerable : true,
  value : "hello"
  });
<!-- 这里也可以定义一个新的属性 -->
### 访问器属性
+ [Configurable]:能否delete属性 从而重新定义新的属性，能否把属性修改为访问器属性。（默认为true）
+ [Enumerable]:是否支持for-in, 默认为true
+ [get] 读取属性时调用，默认为undifined
+ [set] 写入属性时调用，默认 undifined

访问器属性不能直接定义，必须使用Object.defineProperty();
```js
// 访问器属性
var book = {
  _year : 2004, //下划线表示只能通过对象方法访问的属性,一种建议，但是可以直接访问的
  edition :1
};
Object.defineProperty(book,"year",{
  get : function(){
    return this._year;
  },
  set : function(newValue){
    if(newValue>2004){
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  }
})
book.year = 2005;
console.log(book.edition+"   "+book._year);//
```
+ 老版本的浏览器中
```js
book3._defineGetter_('year',function(){
  return this._year;
});
book3._defineSetter_("year",function(newValue){
  if(newValue>2004){
    this._year = newValue;
    this.edition += newValue - 2004;
  }
});
```
<!--定义多个属性的时候-->
```js

// 定义多个属性的时候
var book4 = {};
Object.defineProperties(book4,{
  _year:{
    writable : true,
    value:2004
  },
  edition:{
    writable : true,
    value:1
  },
  year:{
    get :function(){
      return this._year;
    },
    set:function(newValue){
      if(newValue>2004){
        this._year = newValue;
        this.edition+=newValue-2004;
      }
    }
  }
})
```




### history
　保存着用户的上网历史记录，窗口打开开始，窗口、标签／框架　都有自己的history对象与特定的windows关联，
开发人员无法获取浏览过的url。借用访问过得页面列表，也可以实现前进和后退
```js
history.go(-1); //向后退一页     
history.back();
history.go(-２);//向后退两页
history.go(1);// 向前进1页
history.forward();
// 传入字符串的话会调到包含该字符串最近的页面，没有的话就不会跳转
history.go("baidu");//　www.baidu.com

history.length //返回历史记录的数量，打开这个页面通过链接跳转后的次数
if(history.length == 0){
  //用户打开窗口后的第一个页面
}
```
##section9 客户端检测
兼容多种浏览器的方法
### 能力检测
#### 基本概念
1. 先检测达成目的最常用的方法
2. 测试用到的特性
if(object.propertyInQuestion){
  // 使用　object.propertyInQuestion;

}

例子：
```js
 function getElement(id) {
        if (document.getElementById) {
            return document.getElementById('id');
        } else if (document.all) {
            return document.all[id];
        }else{
          throw new Error("no way to retieve element");
        }
    }
```
#### 更可靠的能力检测
+ 检测属性
   function isSortable(object){
     return !!object.sort ;
     //只是显示是否含有这个属性
   }
+ 检测是否包含某个方法
function isSortable(object){
  return typeof object.sort == "function“；
}

+ 比较好的检测函数　
```js
//  不是最好的，需要修改可能                                                        
function isHostMethod(object,property){
  var t = typeof object[property];
    return t == 'function'||
  (!!(t == 'object'&&object[property]) )||t == 'unknown';
}
```
#### 注意一般要直接能力检测而不是要用浏览器检测
直接检测未知的浏览器是否支持某个功能
###怪癖检测
+ ie8 以及更早的版本中　　　如果某个实例属性与[[Enumerabal]] 标记为false的属性同名，那么该属性就不会
出现在for-in中
+ Safari3 中会枚举被隐藏的属性
###  　用户代理检测
+ navigator.userAgent  : 通过检测用户代理字符串来确定实际使用的浏览器
+  电子欺骗　： 浏览器通过在自己的用户代理字符串中加入一些错误或者误导的信息来达到欺骗服务器的目的

```js
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
```

## DOM
### 节点层次
+  文档节点 ：  document
+  文档元素 ： 文档最外层的元素，只能有一个     在 HTML 中为html ，在xml中可以是任何节点， 
#### Node类型
+ Node 接口： dom中的所有节点实现的，除ie外所有的浏览器都可以访问到这个类型
+ nodeType 属性： 表明节点的类型，考虑兼容性，用数字表示
     -  1 ： 元素
     - 
1.  nodeName 和 nodeValue
```js
    if(someNode.nodeType == 1){
        name = someNode.nodeName ; // 是**元素节点**的话，取出标签名
        value = someNode.nodeValue; // 元素节点的始终为 null
    }
```
2.  节点关系(只读的指针)
 + childNodes :此属性只想一个 Nodelist对象
 + Nodelist ： 类数组对象，可以通过位置访问，并且有length属性，不是数组，
 **基于DOM结构动态执行查询的结果,每次访问都是基于当时的快照， 不停变化的，**
```js
 var ul_node = document.createElement("ul");
     var childnode =ul_node.childNodes;          //传递的是对象的指针
     var len = ul_node.childNodes.length;        //只传递的是数值
     for (i =0;i<5;i++){
        console.log(len);                        //不会变       
        console.log(ul_node.childNodes.length);  // 动态访问会实时更新
        console.log(childnode);                  //会实时更新
        console.log(ul_node.childNodes);         //会实时更新
        ul_node.appendChild(document.createElement("li"));
     }
```
 - 判断是否有子节点的方法   node.hasChildNodes(); //等价于判断length

 **访问方法**: 可以通过方括号也可以通过item();
 ```js
 var firstChild = someNode.childNodes[0];
 var secondChild = someNode.childNodes.item(1);
 var len = someNode.childNodes.length; //这里指的是访问该类数组的那一刻的数量
 ```

 **转换成数组的方法**
 兼容ie8和其他的东西，用另外的一种怪癖检测形式
 ```js
 function convertToArrey(args){
         var arr = null ;
         try{
             arr = Arrey.prototype.slice.call(args,0);//针对非ie8浏览器
         }catch(err){
             arr = new Array();
             for (var i =0; i<arg.length;i++){
                 arr.push(arg[i]);
             }
         }
         return arr;
     }
```

+ parentNode  指向父节点
+ previousSibling   前面的兄弟节点 ，没有的话返回null
+ nextSibling       后面的兄弟节点， 没有的话返回null
+ firstChild  lastChild 第一个和最后一个子节点 ，没有返回null
+ ownerDocument 文档节点，唯一，直接回溯到顶端

3. 节点操作
+  document.createElement("tagName");创建元素节点
    - 对于<=ie7 
```js
if(client.browser.ie&&client.browser.ie<=7){
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
```
   
+ **任何节点不能同时出现在文档的多个位置上**
+ appendChild(node); childNodes末尾处添加节点，并且返回该节点
```js
var returnNode = someNode.appendChild(newNode);
alert(returnNode == newNode);                 //true
alert(someNode.lastChild == newNode);         //true
```
*若调用appendChild();传入的是父节点的首子节点，那么该节点就会变成父节点的尾节点，因此可以调整过位置*

+ insertBefore(Node,indexNode); childNodes特定的节点前上插入子节点，并返回此节点
     - someNode.insertBefore(node,null);直接插入到最后的节点
     - someNode.insertBefore(node,someNode.firstChild); 插入到最前面
     - someNode.insertBefore(node,someNode.lastChild); 插到倒数第二位置
+ replaceChild(node,repacedNode);  返回被替换掉的节点，dom中没有，但是还存在
+ removeChild(node);返回被移除的节点

**上面的方法需要先取得父节点，并且在不支持子节点的节点上调用这些方法将会导致错误（text）**


+ node.cloneNode(boolean); true 克隆子节点、特性不会而空js属性;false父标签的特性和标签本身,不会克隆子节点的

*bug：ie中会复制事件处理程序，复制前最好先移除事件*

+ normalize();  使用后，删除该节点的子节点中的空文本节点，病合并相邻的两个文本节点
#### Document类型（表示文档的类型）
+ document对象是HTMLDocment(继承Document)的实力，表示整个html页面，并且是windows对象的一个属性，因此可以全局访问
   - nodeType 9    
   - nodeName  "#document"
   - nodeValue   parentNode    ownerDocument: null   
   - 子节点可能是一个DocumentType、Element、ProcessingInstruction或者Comment
  
  所有的版本浏览器都可以访问HTMLDocument 但是ie可能无法访问Document
1. 文档的子节点
  + document .documentElement  指向html的整个页面
  + document.firstChild == document.childNodes[0] == <Doctype>
  + document.body    <body>标签
  + document.head    <head>标签
  + document.doctype 用处有限不值得记住

  + <html>外的注释
   ie8、chrome、safari把第一条作为节点
    ie9及以上  每一条都是一个节点
     firefox 忽略
2. 文档信息
   + var title = document.title;  //获取title
   + document.title = “new page";

   + http相关的
      - var referrer = document.referrer ; // 链接到本页面的的那个页面
      - var url = document.URL; //获取URL
      - var domain =  document.domain;   //域名
      -  这三个属性中只有domain可以设置，只能设置成url中包含的域，假设 url "www.baidu.com";
      document.domain = "baidu.com"; //对的
      document.domain = "php.baidu.com"; //错的
      一旦用了短的，就不能再设置回长的
      页面中有其他子域的框架或者内嵌框架的时候，不同框架间不能跨域访问，此时都改成相同的document.domain就可以相互访问了
3. 查找元素
   + (someNode||document)getElementById("str") ;  大小写一致且没有的话返回null ，ie7不区分;并且ie7会把name当id用，且返回的是第一个元素
   + (someNode||document)getElementsByTagName("str") ;  大小写一致且没有的话返回null； 返回的HTMLCollection对象，是一个**动态合集** ,

```js
     var ul_node = document.createElement("ul");
     var childnode =ul_node.getElementsByTagName("li");          //传递的是对象的指针
     var len = childnode.length;        //只传递的是数值
     var allElement = document.getElementsByTagName("*");  //获取全部标签
     for (i =0;i<5;i++){
         //访问方法  item 或者[]
        childnode.item(1);
        childnode[1];
           //有name属性的话
        childnode.namedItem("image");
        childnode["image"];

        //动态性
        console.log(len);                        //不会变       
        console.log(childnode.length);  // 动态访问会实时更新
        console.log(childnode);                  //会实时更新
        console.log(ul_node.getElementsByTagName("li"));         //会实时更新
        ul_node.appendChild(document.createElement("li"));
     }
```
   + getElementsByName(); 获取相同name的元素，单选等

4. 特殊集合（HTMLCollection）
   + document.anchors   所有带name属性的<a> 元素，锚点
   + document.forms      document.getElementsByTagName("form");
   + document.images     document.getElementsByTagNames("img");
   + document.links     所有带href的<a>

5. DOM一致性检测
  判断浏览器实现了DOM的那些部分
  > var hasXmlDom = document.implementation.hasFeature("HTML","5.0");
  最好和能力检测一起用
6. 文档写入
 +  document.write(); document.writeln(); 向页面写入内容，一个
```html
    <script>
        document.write("<strong>"+(new Date()).toString()+"</strong>");
        document.write("<script src = \"demo.js\">"+"<\/script>");
        //   注意后面必须将 <\/script>
    </script>
```
  注意： 1.  写的内容会直接在这个script标签下面开始写
        2.  当页面onload 之后在写的话就会重写整个页面

 +  open();close();用于打开和关闭网页的输入流
 #### Element
+  nodeType   ==    1
+  nodeValue     null
+  nodeName   ==   tagName
注意： 返回的tagName都是大写的 比较的话需要加上 toLowerCase();

1. HTML元素
多数由HTMLElement来实现的，包含的特性，**可以直接读写**
- id
- className
- title
- lang
- dir
**标签对应的类型，  P264** 
2.   getAttribute / node.attr  取得特性
 +  getAttribute(string)  
 > element.getAttribute("id");  
 > element.getAttribute("class"); //获取class特性的时候是用className，而是直接用class

- 特性名是不区分大小写的 “ID” 和“id”相同的
- 在h5中规范，自定义属性需要加上data- 前缀以便验证
- style 直接属性访问的话返回一个对象， getAttribute访问的话返回一个字符串
- onclick 属性访问时返回一个函数，getAttribute访问的时候返回一个相应字符串的

由于上面的特性，操作DOM的时候通常只使用对象的属性，自定义属性的时候才会用getAttribute()

3.  设置特性
+ setAttribute(keystr,valuestr); // 特性有的话会覆盖，没有的话就创建,并且属性默认转化为小写

 直接通过属性来设置自定义属性不会有效果，除了那些特性，
 > div.id = "hello";  //ok
 > div.color = "red"; //null
+ div.removeAttribute("str");删除属性和特性  ie6不支持

4. attributes 属性
+ 本质是一个NamedNodeMap，“动态” 集合，元素的每个特性都由一个Attr节点表示，每个节点都保存在NamedNodeMap中。方法
   - element.attributes.getNamedItem("id").nodeValue;
   - element.attributes["id"].nodeValue; // 和上面的相同  访问id属性
   - element.attributes["id"].nodeValue = “someID” ； 赋值
   - element.attributes.removeNamedItem("id"); 移除属性
   - element.attributes.setNamedItem(newAttr); 添加属性
**上面的没什么用**， **遍历属性的时候才用的到**
   - 遍历成字符串形式的函数 
```js
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
        if(element.attrbutes[i].specified){
            pairs.push(attrName + " = " + "\"" + attrValue + "\"");
        }
        
    }
    return pairs.join(" ");
}
```

5. 元素的子节点
+ 空白符处理
   
   在一般浏览器的中元素中的空白符也是一个text节点；则遍历一个元素的所有节点的时候，至少要先有判断下nodeType 是否为 1；
```js
for(var i =0,len=element.childNodes.length;i<len;i++){
    if(element.childNodes[i].nodeType == 1){

    }
}
```
+ 访问元素
     - 通过关系访问
     - 通过选择器访问

#### Text类型
+ 文本节点由Text类型表示，包含可以按照字面解释的纯文本内容，可以包含转转义后的HTML字符，不能包含HTML代码特性
     - nodeType                  1
     - nodeName                 "#text"
     - nodeValue                自身包含的文本，也可以通过data访问
     - parentNode               一份element
     - 不支持子节点
     - appendData(text);        将






  


 


