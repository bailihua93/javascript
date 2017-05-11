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
  + document .documentElement  指向html的整个页面  根节点，xml中的最外层节点
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
     - length                  节点中字符的数目，nodeValue.length  data.length
     - 不支持子节点
     - appendData(text);        将text添加到节点的末尾
     - deleteData(offset,count); 从offset开始删除count个字符
     - insertData(offset,text); 在offset指定的位置插入text
     - replaceData(offset,count,text);
     - splitText(offset);  从offset开始将当前文本节点分成两个文本节点
     - substringData(offset,count); 提取offset到offset+count之间字符串
     
     var text = div.firstChild;//获取文本节点引用

     text.nodeValue = "some other message";
     
     如果文档存在于文档树种，修改文本节点的结果就会立即反应。  设置的的文本节点后，会自动经过HTMl编码，  大于号小于号引号会转义,?????????这里并没有这样过，chrome证实的

1. 创建文本节点,可以接受一个参数-要插入节点中的文本，和设置文本节点的值一样；
> document.createTextNode(str)；

一般情况下，每个元素只有一个文本子节点，添加的原因变成两个之后，文本就会链接起来，并且不会有空白符

2. 规范化文本节点
parentNode.normalize(); 自动合并

3. 分割文本节点

parentNode.splitText(5); 从第5个位置开始分，原来节点包含0~5的文本， 返回新的节点包含 5~ 末尾。 并且dom中还是有这两个文本的


#### Comment  类型（注释）
  - nodeType            8
  - nodeName            #commemt
  - nodeValue           注释的内容
  - 不支持子节点

  Coment和text继承相同的基类，除splitText（）外所有的字符串操作方法。也可以通过nodeValue或data属性来获取

#### CDATASection（xml文档有用)
- NodeType 值为4
- nodeName    #cdata- section
- nodeValue    cdata 去榆中的内容
- 不支持子节点

和comment继承相同的基类，没有splite ， document.createCDataSesction();

#### DocumentType  类型
   -  nodeType的值为10
   -  nodeName 为doctype的名称
   -  没有子节点
经常被搞成注释，ie8不支持
#### documentFragment 类型
    - nodeType   11


#### Attr类型
元素特性在dom中医Attr类型来表示
   - nodeType     11
   - nodeName   特性的名字
   - nodeValue   特性的值
   - parentNode   null
   - 没有子节点

+ Attr对象有3个属性，name（nodeName相同）、value（nodeValue相同）、specified（布尔值，区别代码中指定的还是默认的）
+ document.createAttribute()  传入特性名字
```js
var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);
```

**优先使用 getAttribute()  setAttribute()   removeAttriute()**

### DOM 操作

#### 动态脚本
+ 加载  <script type = "text/javascript" src= "client.js"></script>

  ```js
  function loadScript(url){
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src =url;
      document.body.appendChild(script);
  }
```
+ 行内元素
```html
<script type = "text/javascript">
function sayHi(){
    alert("hi");
}
</script>
```
js函数
```js
function loadScriptString(code){
    var script = document.creatElement("script");
    script.type = "text/javascript";
    try{
        script.appendChild(document.createTextNode(code));
    }catch(err){
        script.text = code;
    }
    document.body.appendChild(script);
}
```

#### 动态样式
+ <link rel = "stylesheet" type = "text/css" href = "styles.css">

```js
function loadStyles(url){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}
```
+ 行内样式
```css
<style type = "text/css">
body{
    background-color : red;
}
</style>
```
函数
```js
fucntion() loadStyleString(css){
    var style = doccunment.createTextNode("style");
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));
    }catch(err){
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}
   
```


##DOM 扩展
###  选择符Api
querySelector()/ querySelectorAll(),兼容ie8+，调用者可以是document和Element元素，不支持的话会抛出错误
#### querySelector()
+ 支持css选择器，返回该模式匹配的第一个元素，没有的话返回 null。
```js
document.querySelector("em");
document.querySelector("#myDiv");
document.querySelector("img.button");
```
####querySelectorAll()
+ 返回的是NodeList实例，底层实现是类似于数组的快照，而非不断对文档进行搜索的动态查询。没有找到元素的话，会返回一个空的NodeList对象。 静态的类数组
#### matchesSelector(str)
ie9+，在去的某个元素引用的情况下，用这个方法，可以方便的检测他是否被querySelector()或者querySelectorAll()返回

```js
function matchesSelector(element,selector){
    if(elelment.matchseSelector){
        return element.matchesSelector(selector);
    }else if(element,msMatchesSelector){
        return element.msMatchesSelector(selector);
    }else if(element.mozMachesSelector){
        return element.msMatchesSelector(selector);
    }else if(element.webkitMatchesSelector){
        return element.webkitM
    }
}

```
### 元素遍历

+ 对于元素间的空格，ie9以前不会返回文本节点。为了弥补childNodes和firstChild在不同浏览器之间的差异，Element Travarsal定义了一些新的特性，支持的浏览器有ie9+
  - childElementCount： 返回子元素（不包含文本节点和注释）的个数
  - firstElementChild : 第一个子元素
  - lastElementChild
  - previousElementSibling
  - nextElementSibling
### HTML5
#### 与类相关的扩充
h4导致class属性用的越来越多，**class一方面可以通过他为元素添加样式，另一方面可以表示元素的语义**。h5增加了很多api
1. getElementsByClassName()
返回的是一个动态NodeList，可以传入的参数是“class1 class2 ”这种的

2. classList属性

+ 传统的操作类名的方法。通过对className属性的字符串操作
>  <div class ="bd user disable"></div> 删除

```js
function deleteClass(element,classname){
    var className = element.className;
    var classArr = className.splite(/\s+/);
    var pos = -1,
        i,
        len;
   for(i=0,len=classArr.length;i<len;i++){
       if(classArr[i] == className){
           pos = i;
           break;
       }
   }
   classArr = classArr.splice(i,1);
   element.className = classArr.join(" ");
}
```
+ h5添加了操作类名的方式，为所有元素添加classList属性，此属性是 DOMTokenList的实例，动态属性？？，并且定义了一些新的方法 操作类名的方法，chrome
   - add(value)
   - contains(value)
   - remove(value)
   - toggle(value)   存在的话删除，不存在的话添加
#### 焦点管理（ie4）
+ document.activeElement;  获取目前页面获得焦点的元素
+ document.hasFocus();   判断当前页面是否获得了焦点
#### HTMLDocument的变化
1. document.readyState; 有两个值 "loading/complete" 检查文档是否加载完毕，ie4

2. ie6开始区分页面的模式是标准的还是混杂的，检测页面的兼容性，
   
   + document.compatMode    compat 兼容
      - CSS1Compat 标准模式
      - BackCompat 混在模式
3. doucment.head  chrome
  > var head = document.head||document.getElementsByTagName("head")[0];
#### 字符集属性
+ document.charset 可读写的属性
+ document.defaultCharset  根据系统和浏览器确认的话该是哪种字符集，只读的

#### 自定义数据属性
html5 规定可以给元素添加非标准属性，但是要加上data-；为元素提供与渲染无关的信息，或者提供语义信息，如 <div id="myId" data-appId = "12345" data-myname= "nicholas"></div>,然后可以通过元素的 **datalist** 属性来访问自定义属性值，属性值是DOMStringMap的一个实例，可读写的
>div.dataset.appId = "3"
> div.dataset.myname = "bai"


+ **给元素添加一些不可见的数据以便进行其他处理的，那就需要用到自定义数据属性**
+ **在跟踪链接或者混搭应用中。自定义属性可方便的知道点击来自页面的哪个部分**

#### 插入标记
1. innerHTML 属性

+ 读模式下，返回调用元素的所有子节点对用的HTML标记；ie和opera会大写标签，其他浏览器原原本本的返回

+ 写模式下，根据指定的值创建新的DOM树，然后这个DOM树完全替换元素原来的所有子节点；一定会序列化，所以在设置的时候要转义


+ **限制**

在多数浏览器中innerHTML插入<script></script> 元素并不会执行其中的脚本。 IE8及更早的版本是唯一能在这种情况下执行脚本的浏览器。但需要满足一定的条件才行： 一是必须指定defer属性，二是必须位于（微软所谓的）“有作用域的元素”之后。script style comment 属于无作用域元素。

+ 优先使用过的方法：
```js
 div.innerHTML = "<input type = \"hidden\"><script defer>alert('hi');<\/script>";
```

+ 其他的方法就需要之后删除这个元素
```js
 div.innerHTML = "_<script defer>alert('hi');<\/script>";
 div.innerHTML = "<div>&nbsp;</div><script defer>alert('hi')<\/script>";
 div.removeChild(div.firstCHlid);
```

+ ie8之前 style没有作用域的元素，需要上免得方法来尽心
```html
 <col>/<fragemet>/<head>/<html>/<table>/<thead>/<tbdy>/<tr> 都不支持innerHTML
```
+ 插入innerHTML前，最好先用东西检测下是否有害

2.  outerHTML
```js
 div.outerHTML = "<p> this is p </p>";
```
新建p元素代替div的所有

3. insertAdjacentHTML()  相邻的

```js
    var div2 = document.getElementById("div2");
    div2.insertAdjacentHTML("beforebegin","<p>beforebegin</p>");  //前面的同辈元素
    div2.insertAdjacentHTML("afterbegin","<p>afterbegin</p>");    //第一个子元素
    div2.insertAdjacentHTML("beforeend","<p>beforeEnd</p>");      //最后一子元素
    div2.insertAdjacentHTML("afterend","<p>afterEnd</p>");        //后一个同辈元素
```

4. 内存与性能问题
   - 内存 ：替换子节点可能会导致浏览器内存占用问题，尤其在ie中，删除带有事件处理程序或者应用该其他JS对象子树的时候，可能会导致内存占用。 最好先手动删除要替换元素的所有事件处理程序和js 对象属性
   - 性能：innerHTML和outerHTML的html解析器是浏览器级别的代码（通常c++编写的）的基础上运行，远远高于JS运行； 但是最好减少使用次数，调用也是需要时间的
#### scrollIntoView()

element.scrollIntoView(); 将元素滚动到可见的页面

### 转有扩展
#### 文档模式
+ 专属于ie 后面的ie = 数值是按照什么标准渲染的
```html
<meta http-equiv="X-UA-Compatible" content="ie=edge">
```
   - Edge 最新版本，浏览器的版本
   - EmulateIE9   || EmulateIE8 || EmulateIE7 ,有文档声明类型的话，以ie9(8,7)标准模式渲染，否则ie5
   - 9 8 7 5 强制使用ie9的标准模式渲染
   
+ document.documentMode 返回渲染的形式

#### children属性
HTMLCollection的实例，包含元素子节点,ie5就开始支持，ie9以上其他浏览器返回非空白字符的元素，
childNodes 则在ie9以下返回非空元素，ie9以上返回包含非空的东西
#### contains() 
```js
elementFather.contains(elementb); //b是不是a的后代节点
```
+ A.compareDocumentPosition(B) A和B的关系 ie9
```js
    console.log(div2.compareDocumentPosition(div3));    //前 4
    console.log(div2.compareDocumentPosition(div1));    //后 2
    console.log(div1.compareDocumentPosition(mydiv));   //里 10
    console.log(mydiv.compareDocumentPosition(div1));   //外 20
```
#### 插入文本
1. innerText 属性  ie8

读的时候，element.innerText将返回所有的文本内容（包括子节点的）,不包含行内样式和脚本

写的时候，会删除所有的子节点，并且也会对文本中存在的HTML语法字符（大于小于号引号和号）进行过编码; 这里不知道怎回事没有达到预期的效果什么有没变    ？？？？？

2. textContent ie9


上面的内容由两个函数代替
```js
function getInnerText(element){
   return (typeof element.textContent == "string")?element.textContent : element.innerText;
}
function setInnerText(element,text){
    if(typeof element.textContent == "string"){
        element.textContent = text;
    }else{
        element.innerText = text;
    }
}
```

3.outerText 尽量别用


## DOM2和DOM3
###DOM变化
+ 判断浏览器是否实现了对应的部分
```js
 var hasXmlDom = document.implementation.hasFeature("HTML","5.0");
 var hasDom2Core = document.implementation.hasFeature("Core","2.0");
 var hasDom3Core = document.implementation.hasFeature("Core","3.0");
 var hasDom2HTML = document.implementation.hasFeature("HTML","5.0");
 var hasDom2XML = document.implementation.hasFeature("XML","2.0");
```
#### 针对XML命名空间的变化  ????? 变量的封装和隐藏， 88班的白丽华，88班就是命名空间
有了命名空间，不同的xml文档的元素可以混合在一起，而不必担心发生命名冲突。HTML不支持XML的命名空间，但是XHTML支持，

XHTML的命名空间是 http://www.w3.org/1999/xhtml,必须写作
```xml
<xhtml:html xmlns:xhtml = "http://www.w3.org/1999/xhtml">
    <xhtml:head>
         <xhtmltitile>Example</xhtml:title>
    </xhtml:head>
    <xhtml:body>
      hello
    </xhtml:body>
</xhtml:html>
```

但是命名空间在不同的语言下才有用

```xml
<html xmlns = "http://www.w3.org/1999/xhtml">
    <head>
         <titile>Example</title>
    </head>
    <body>
       <s:svg xmlns:s = "http://www.w3.org/2000/svg" version = "1.1"
             viewBox = "0 0 100 100" style = "width:100%;height:100%">
            <s:rect x="0" y ="0" width="100" height="100" style="fill:red"/>
       </s:svg>
    </body>
</html>
```
svg 元素所有子元素，以及这些元素的所有特性，都被认为属于 http://www.w3.org/2000/svg命名空间。

1. Node类型的变化

- localName   不带命名空间前缀的节点名称
- namespaceURI  命名空间的URI 未指定的话为null
- prefix 命名空间前缀 未指定的话是null
- nodeName    (prefix:)localName  tagName

对html来说，localName和tagName为html，namespaceURI是“http://www.w3.org/1999/xhtml”，prefix是null   
对svg 来说  localName 为svg ，tagName和nodeName s:svg 。prefix是s

2. DOM3在这基础上引入了与命名空间有关的的方法
- isDefaultNamespace(namespaceURI)       当前节点的默认命名空间是否为namespaceURI
- lookupNamespaceURI(prefix)             返回给定的prefix的命名空间
- lookupPrefix(namespaceURI)             返回给定namespaceURI

3. Document类型的变化
- createElementNS(namespaceURI,tagName); 使用给定的tagName创建一个属于命名空间namespaceURI的新元素  
- createAttributeNS(namespaceURI，attributeName)； 使用给定attributeName创建一个属于命名空间的namespaceURI的新特性  
- getElementsByTagNameNS(namespaceURI,tagName);   
只有文档中存在两个或者多个命名空间的时，这些与命名空间有关的防范才是必须的

4. Element类型的的变化

5. NamedNodeMap

变化就是在方法后面加了个NS

#### 其他方面的变化
1. DocumentType
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml/DTD/xhtml1-strict.dtd"
[<!ELEMENT name (#PCDATA)>]>
```
document.doctype.publicId ;  //-//W3C//DTD XHTML 1.0 Strict//EN  
document.doctype.systemId;  //  http://www.w3.org/TR/xhtml/DTD/xhtml1-strict.dtd     
document.doctype.internalSubset; //  文档类型的额外定义

2. Document类型的变化

- importNode()    
每一个节点都有的一ownDocument属性，表示所属的文档，如果调用appendChild()时传入的是属于不同的文档，则会导致错误，     
但是在调用importNode()时传入不同文档的节点则会返回一个新节点，这个新节点的所有权归当前文档所有 
```js
var newNode = document.importNode(oldNode,true);
document.body.appendChild(newNode);
```
- defualtView    
var parentWindow = document.defautView||document.parentWindow;    
获取到的是网址 Window → http://offlintab.firefoxchina.cn/        

- createDocumentType(文档类型，publicId，systemId)；    
document.implementation.createDocumentType("html","-//W3C//DTD XHTML 1.0 Strict//EN","http://www.w3.org/TR/xhtml/DTD/xhtml1-strict.dtd");      

- createDocument(namespace,tagname,文档类型)      
 document.implementation.createDocument("http://www.w3.org/1999/xhtml","html",doctype);    
 创建的是一个只包含html标签的文档

- createHTMLDocument(title);  创建完整的文档，传入的是title
 document.implementation.createDocument("http://www.w3.org/1999/xhtml","html",doctype);  

3. Node类型的变化

- element.isSupported("HTML","2.0");      最好要能力检测
- A_element.isEqualNode(B_element);      属性和名字相同         
  A_element.isSameNode(B_element);       同一个元素

4. Dom3 针对DOM添加额外数据引入的方法      已经弃用
setUserData(name，data，function(){});      传入的是设置的键，实际的数据，处理函数    
.getUserData("name");                       获取     
这里我们并不知道这是什么
```js
var mydiv = document.getElementById("mydiv");
    mydiv.setUserData("name","bai",function(operation,key,value,src,dest){});
    var value = document.body.getUserData("name");
```
传入setUserData()中的处理函数会在带有数据的节点被复制、删除、重命名、或者引入一个文档的时调用，因而你可以决定如何处理用户数据。处理函数接受5个参数：表示操作类型的数值（1表示复制，2表示导入，3表示删除，4表示重命名）、数据键、值、源节点、目标节点；删除节点的时候后，源节点为null，除在复制节点是，目标节点均为null。在函数内部你可以决定如何存储.多数浏览器不支持这个方法

```js
var div = document.createElement("div");
div.setUserData("name","Bailihua",function(operation,key,value,src,dest){
    if(operation==1){
        dest.setUserData(key,value,function(){});
    }
});
var newDiv = div.cloneNode(true);
console.log(newDiv.getUserData("name"));
```

5. 框架的变化
框架和内嵌框架分别用HTNLFrameElement和HTMLIFrameElement表示，他们在DOM2中有一个新的属性叫做，contentDocument。这个属性包含一个指针，指向表示框架内容的文档对象。 
```js       
var iframe = document.getElementById("myIframe");
var iframeDoc = iframe.contentDocument||iframe.contentWindow.document;
```
不同框架间访问会跨域，导致错误



### 样式  ie9
html中定义方式有山中：1.通过<link/>元素包含外部样式2.使用<style/>元素定义嵌入式样式3. 使用style特性定义特定元素的样式。 DOM2为此提供一套操作class的API。
#### 访问元素的样式
任何支持style属性的HTML元素在js中都有一个对应的style属性，是CSSStyleDeclaration的实例，包含通过HTML的    style特性指定的所有样式信息，但是不是包含 外部样式表或者嵌样式表  层叠来的样式 ,必须将过期转化为驼峰样式

```html
<div id = "mydiv" style="background-color:blue;width:10px;height:25px"></div>
```
对应的js
```js
mydiv.style.width; //10px
mydiv.style.backgroundColor; //blue
```
如果没有给html元素设置style属性的话，那么style对象中可能只包含一些默认值

1.style的属性和方法
  - cssText       返回css代码，并且也可以设置，就如同innerHMTL一样的东西 
  - parentRule    表示css信息的CSSRule对象。
  - length        返回css属性的数量
  - item(index)    返回给定位置的CSS属性的名称，等价于[index],都是获取属性名； “background-Color” 不是驼峰的  
  - getPropertyPriority(propertyName):  优先权，如果给定的属性使用了!important 设置，则返回important，否则返回空字符串    
  - getPropertyValue(propertyName):    
  - getPropertyCSSValue(propertyName):  给定的属性的CSSValue对象， “background-Color” 不是驼峰的，  CssValue包含一个cssText和cssValueType，cssvaluetype为数值（0表示继承的值，1表示基本的值，2表示值列表，3表示自定义的值），ie9才开始支持
  - removeProperty(propertyName);  从样式中删除给定的属性，然后应用迭代的来的样式
  - setProperty(propertyName,value,priority);  将给定属性设置为相应的值，并加上优先权标志（important或者一个空字符串）


2. 计算的样式（所有的计算样式都是只读的）
虽然style支持style特性的任何元素样式信息，但不包含那些从其他样式表层叠来影响到当前元素的样式信息。 “DOM2”增强了document.defaultView,提供了getComputedStyle();传入的是元素和可选的伪元素字符串（“：after”）；

var style = window.getComputedStyle(element[, pseudoElt]);      
var style = document.defualtView.getComputedStyle(element[, pseudoElt]);

获取元素层叠后的最终显示的样式，但是由于各个浏览器之间存在差别，不同浏览器中返回的值存在差别，   
computedStyle.borderLeftWidth一定会有返回值     
IE不支持上述方法，有个style属性有一个currentStyle属性，这个属性是CSSStuleDeclaration，     
访问element.currentStyle

#### 操作样式表
CSSStyleSheet类型表示样式表，包含link和style中的样式表，是一个只读的借口，继承自StyleSheet，继承的属性  
- var supprotsDOM2StyleSheets = document.implementation.hasFeature("StyleSheets","2.0");
- disabled ： 表示样式表是否被禁用，这个是可读写的
- href        样式表示通过link包含的，则返回ULR，否则null
- media       当前样式表支持的所有媒体类型的集合
- ownerNode   指向拥有当前样式表的节点的指针，样式表可能在HTNL中通过 link 或者  style 引入的，如过是通过@import导入的，则这个属性值为null。ie不支持
- parentStyleSheet  样式表通过@important导入的情况下，这个属性指向导入他的样式表
- title       ownerNode中的title属性
- type        “type/css”
- cssRules    样式表中包含的的样式规则的集合。ie不支持，但有一个类似的rules
- ownerRule   如果通过@import导入的，这个属性就是一个指针，指向导入的规则，否则值为null，ie不支持
- deleteRule(index)  删除cssRules集合指定的位置的规则。ie是removeRule()方法
- insertRule (rule，index)    指定位置插入字符串， ie是addRule();         
应用于文档的所有样式表通过document.styleSheets  获取一个集合 访问直接通过[]或者item()。    
    
已经可以通过link/style 取得CSSStyleSheet对象
```js
function getStyleSheet(element){
    return element.sheet||element.styleSheet ;
}
```
这里getStylesheet()返回的样式和对象与 document.styleSheets集合的样式相同



1. Css 规则
CSSRule对象表示样式表中的每一条规则。有很多类继承他，最常见的是CSSStyleRule类型，表示样式信息（其他规则还是有
@import/@font-face/@page/@charset)。包含的属性有
- cssText   ie不支持
- parentRule 当前规则为导入规则的话，引用的就是导入规则。 否则为null。 ie不支持
- parentStyleSheet 当前规则所属的样式表    IE不支持
- selectorText     返回当前规则的选择符文本，需要转义成小写
- style     CSSStyleDeclaration对象，可以通过他取得和设置规则同特定的样式‘
- type     规则类型的常量值，对于样式规则，这个值是1. ie不支持    
cssText、selectorText、style最常用       
对于位于第一样式表中的只有一条规则的例子      
```css
div.box{
    background-color : blue;
    width : 100px;
    height : 200px;
}
```
对应的修改和获取方法
```js
var sheet = document.styleSheet[0];
var rules = sheet.cssRules||sheet.rules;
var rule = rules
```









2. 创建规则      
向现有样式表添加规则,stylesheet.insertRule(rule, index),插入规则的文本和在哪里插入的索引（当前样式表中的样子）。ie8支持 addRule(selector,csstext,index); 兼容性
```js
function  insertRule(sheet,selectorText,cssText,position){
    if(sheet.insertRule){
        sheet.insertRule(selectorText+"{"+cssText+"}",position);
    }else if(sheet.addRule){
        sheet.addRule(selectorText,cssText,position);
    }
}
```
**需要添加的样式很多的话，可以选择动态加载样式表**
3. 删除规则
```js
function deleteRule(sheet,index){
    if(sheet.deleteRule){
        sheet.deleteRule(index);
    }else if(sheet.removeRule){
        sheet.removeRule(index);
    }
```
#### 元素大小
1. 偏移量（offset）        
元素的可见大小由其高度、宽度决定，包括所有内边距、滚动条和边框大小（不包括外边距）。通过四个属性可以取得       
-  offsetHeight：  边框高+元素高+滚动条高，以像素为单位
-  offsetWidth ：  边框宽+元素宽+滚动条宽
-  offsetLeft  ：  元素左边框外到到其包含元素的内左边框的距离 ，px为单位
-  offsetTop   :   上边框到内上边框距离         
其中offsetLeft、offsetTop属性与包含的元素有关，该元素保存在offsetParent属性中，并且并不一定是parentNode值相等。偏移量是上述属性的叠加。
```js
function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent；

    while(current != null){
        actualLeft+=current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent；

    while(current != null){
        actualTop+=current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
```
**上述属性是只读的**,每次访问都需要计算一遍，所以尽量保存成局部变量

2. 客户区大小（client dimension）          
元素的内容和内边距所占的空间大小 ，不包括滚动条。 最常用的是确定浏览器的视口大小，这些都是只读的属性        
- clientWidth 
- clientHeight
```js
function getViewport(){
    if(document.compatMode == "BackCompat"){
        return {
            width : document.body.clientWidth;
            height : document.body.clientHeight;
        };
    }else{
        return {
            width : document.documentElement.clientWidth;
            height :  document.documentElement.clientHeight;
        }
    }
}
```
3. 滚动大小（scroll dimension)                
包含滚动内容的元素的大小。有些元素（例如html）即使没有任何代码也能自动的添加滚动条，但是另外的元素需要css的overflow属性才能滚动，主要属性
- scrollHeight   没有滚动条的情况下，元素内容的总高度
- scrollWidth    没有滚动条的情况下，元素的总宽度
- scrollLeft     被隐藏在内容区域左侧的像素数，通过修改该值可以改变元素的滚动位置 
- scrollTop      被隐藏在内容区域上方的像素数，通过修改该值可改变元素的位置       
- 对于包含滚动条的页面 document.documentElement.scrollheight就是页面的高度    
- 在确认文档的总高度时（包括基于是口的最小高度时）
 ```js
function docHeight(){
    if(document.documentElement){
        return Math.max(document.documentElement.scrollHeight,
        document.documentElement.clientHeight);
    }else{
        return Math.max(document.body.scrollHeight,
        document.body.clientHeight)
    }
}
function docWidth(){
    if(document.documentElement){
        return Math.max(document.documentElement.scrollWidth,
        document.documentElement.clientWidth);
    }else{
        return Math.max(document.body.scrollWidth,
        document.body.clientWidth)
    }
}
```

4. 确定元素的大小      
浏览器提供了一个getBoundingClientRect()方法，返回一个矩形对象，包含的属性：left、top、right、bottom.元素相对于视口的位置。但是ie8认为文档的左上角坐标是(2,2),传统的浏览器以(0,0)为起点坐标。
```js
function getBoundingClientRect(element){

    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;

    if(element.getBoundingClientRect){
        if(typeof arguments.callee.offset.offset != "number"){
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
            left : rect.left + offset,
            right : rect.right + offset,
            top : rect.top + offset,
            bottom : rect.botton + offset
        };
    }else{
        var actualLeft = getElementLeft(element);
        var actualTop = getElementTop(element);
        return {
            left : actualLeft -scrollLeft,
            right : actualLeft + element.offsetWidth -scrollLeft,
            top : actualTop - scrollTop,
            bottom : actualTop + element.offsetHeight -scrollTop
        }
    }
}
```

<<<<<<< HEAD
#### 遍历
Dom2 提供了NodeIterator和TreeWalker可以执行深度优先的遍历。ie不支持。 检测是否支持的方法  
```js
var supportTraversals = document.implementation.hasFeature("Traversal","2.0");
var supportNodeIterator = (typeof document.createNodeIterator == "function");
var supportTeerWalker = (typeof document.createTeerWalker == "function");
```

##### NodeIterator
=======
####遍历
- 定义深度优先的遍历操作
```js
var suportsTraversals = document.implementation.hasFeature("Traversal","2.0");    
var supertsNodeIterator = (typeof document.createNodeIterator == "function");   
var supertsNodeTreeWalker = (typeof document.createNodeTreeWalker == "function");   
```
#####NodeIterator
+ var nodeIterator = document.createNodeIterator(root, whatToShow, filter[,entityReferenceExpansion]);       
      - root 搜索作为搜索起点的树中节点
      - whatToShow 表示要访问哪些节点的**数字代码**,访问哪些节点，参数是常量形式在NodeFilter类型中定义
        - NodeFilter.SHOW_ALL 显示所有节点
        - NodeFilter.SHOW_ELEMENT 显示元素节点
        - NodeFilter.SHOW_ATTRIBUTE 显示特性节点
        - NodeFilter.SHOW_TEXT 显示文本节点
      - filter 是一个NodeFilter对象，或者是一个表示应该接收还是拒绝某种特定节点的函数，或者直接null
        - 每个nodefilter对象都只有一个方法，即acceptNode();如果访问节点，该方法返回NodeFilter.FILTER_ACCEPT;不需要访问的节点该方法返回NodeFilter.FILTER_SKIP；或者直接就是该函数体
```js 
var filter = {
   acceptNode : function(node){
    retern node.tagName.toLowerCase() == "p" ?
           NodeFilter.FILTER_ACCEPT :
           NodeFilter.Filter_SKIP;
   }
}

```
   - entityReferenceExpansion  实体对象扩展，html不支持
 ```js
 //nodeIterator                                                                                              
 //创建适配器，注意尽量用nodeName而非tagName
  var filter = function (node) {
      return node.nodeName.toLowerCase() == "li" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  }
  // 创建遍历器，并且有一个指向初始节点的指针，通过nextNode指向第一个
  var iterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT, filter);
  //nextNode指针向后移动
  var curentNode = iterator.nextNode();
  //先深度后横向的遍历，无节点的时候返回null，nextNode() 返回下一个节点，previousNode()返回前一个节点
  while(currentNode != null){
      console.log(currentNode.nodeName);
  }
 ```
##### TreeWalker
NodeIterator的高级版本，包含方法：    
- nextNode()
- previousNode()
- parentNode()
- firstChild()
- lastChild()
- nextSibling()
- previousSibling()
- document.createTreeWalker(node,whatToShow,filter)
- filter支持NodeFilter.FILTER_ACCEPT   NodeFilter.FILTER_SKIP , 并且支持 NodeFilter.FILTER_REJECT直接跳过整个子树
#### 范围    
通过范围可以选择文档中的一个区域，而不必考虑节点的界限，可以用来修改文档
##### DOM中的范围
检测是否支持      
```js
var supportRange = document.implement.hasFeature("Range","2.0");
var alsoSupportRange = (typeof document.createRange == "function");
```
使用： var range =  document.createRange();此时range包含的属性有，      
- startContainer 包含范围起点的节点，一般为包含range的父节点
- startOffset     如果startContainer是文本节点、注释或者CDATA，offset是跳过的字符的数量，否则就是范围中第一个节点的索引
- endContainer   包含范围起点的节点，一般为包含range的父节点
- endOffset     终点在父节点的childNodes中的索引位置
- commonAncestorContainer       
上面的属性都是可以直接读写的
1. Dome的简单选择
range.selectNode(node);        选择包含node节点在内的所有节点和子节点         
range.selectNodeContents(node); node节点的所有子节点      


range.setStartBefore(relNode);         起点设在节点的前面，范围包含节点
range.setStartAfter(relNode);          起点设在节点的后面，范围不包含节点
range.setEndBefore(relNode2);    
renge.setEndAfter(relNode2);    


包前不包后  
range.setStart(startNode, startOffset);   包含offset      
range.setEnd(endNode, endOffset);       不包含offset

可以选择范围指的是一段代码，并且不是只有标签，当有子节点的时候选择是按照子节点的索引来选择的，子节点没有的话就是按照文本的位来选择了

创建范围后，在dom底层会生成完整的dom结构

+ 操作范围
 - range.deleteContents()    删除范围包含的所有内容,删除后原文自动形成闭合的文档结构，好像是优先执行的，DOM解析到之前就能操作了
 - range.extractContents()        提取，删除并返回范围的东西，返回的是文档片段，
 - range.cloneContents()     
 - range.insertNode()             把node添加到range的开头，用于添加一些帮助信息
 - range.surroundContent(node)    将范围添加到node标签里面        
 - range.collapse(true)           折叠范围，就是范围未选择任何文档，将开始和结束设置在同一个位置即可，此方法，true的话就折叠到前面，false折叠到后面
 - compareBoundaryPoints(Range.START_TO_START,range2);  第一个参数是比较哪个点，可以比较的项目有，Range.START_TO_START, Range.START_TO_END,Range.END_TO_END,Range.END_TO_END.   返回-1，表示在前面；0相等，1在后面     
 - range.cloneRange()
 - range.detach()    从文档中分离出来，之后range = null ,这样最后就消除这个范围了


##### IE中的范围
ie8只支持文本范围     
var range = document.body.createTextRange();
var found = range.findText("hello");  返回true代表找到文本，返回false表示没找到，found.text为文本中的内容。 并可以传入另一个参数表示向哪个方向继续搜索数值。负值表示向后搜索，正值表示向前搜索。  这是通过文本内容来搜索的 
var foundagain = range.findText("hello",1);

var found = range.moveToElementText(node);   和dom中的selectNode相同 ，访问内容的话，用range.htmlText     
range.parentElement()   返回文本选取的父节点

**复杂的选择**       
moveStart("word",2)移动起点  向前移动两个单词  
moveEnd() 移动终点    
expand("word");扩展范围     
move("word",3); 先折叠后移动，所以最终得到的是折叠的东西

上面的word指的是单位，可选属性有character、word、sentence、textedit      
**编辑**
range.text = "haha";    
range.pasteHTMl("<em>hah</em>") ;  标签替换     
**折叠**     
range.collapase(true);    
range.boundingWidth  == 0 ;表示折叠成功     
**比较**     
range.compareEndPoint("StartToStart",range2);     
**复制**     
range.duplicate()

## 13事件
###事件流
事件捕获阶段、处于目标阶段、事件冒泡阶段，Dom2要求处于阶段归为冒泡阶段，但是IE9及以上把他放在了冒泡和捕获阶段都有
###事件处理程序
####html 事件处理程序
不推荐用，直接在标签上定义，类似于  <button onclick = "showMessage()">点我</button>    ，     
this指向事件的目标元素   ，       
并且可以在函数内部访问document对象，    
如果是表单元素的话，还会保存表单的对象，**this.form**     
**不推荐上面的元素定义法**    
#### DOM0
element.onclick =function(){};    
element["on"+type]  = function(){};    
元素级属性，this指向元素本身，事件的处理会在冒泡阶段处理的     
element.onclick = null ;删除事件处理程序
#### DOM2 （IE9)
element.addEventListener(type,handler,false);         
element.removeEventListener(type,handler,false);      
type : click,     
handler :  处理函数的引用，亦可以是匿名函数 ，但是匿名函数无法移除的是
false： 冒泡阶段处理，  true  捕获阶段处理   ,一般不建议捕获阶段处理
元素级别的作用域，this指向本身，一种type可以添加多个函数，按照添加顺序执行  
#### IE8
attachEvent(type,handler);   
detachEvent(type,handler);     
默认冒泡阶段处理，执行顺序与添加顺序相反      
this指向的是window   
#### 跨浏览器

```js
var EventUtil = {
    addHandler : function(element,type,handler){
          if(element.addEventListener){ //dom 2
              element.addEventListener(type,handler,false);
          }else if(element.attachEvent){
              element.attachEvent("on"+type,handler);//ie8
          }else{//dom0
              element["on"+type] = handler;
          }
    },
    removeHandler : function(element,type,handler){
          if(element.removeEventListener){
              element.removeEventListener(type,handler,false);
          }else if(element.detachEvent){
              element.detachEvent("on"+type,handler);//ie8
          }else{
              element["on"+type] = null;
          }
    }
}


//使用
EventUtil.addHandler(element,"click",handler);
```
###事件对象

事件触发的时候，会有一个事件对对象传输到处理函数中，即event，如：  
```js    
btn.addEventListener("click",function(event){
    alert(event.type);
},false);
```
但是DOM0 的IE中需要window.event才能取得event。Dom2的没有这个问题

+ 事件对象的属性
      - bubbles         boolean  只读       表明事件是否冒泡（没用）
      - cancelable      boolean  只读       表明事件是否可以取消默认行为（没用)   
      - currentTarget   element  只读       事件处理程序注册的位置，一定是this指向的相同
      - defaultPrevented        为TRUE的时候表示已经调用了preventDefault()    
      - eventPhase       1 表示捕获阶段，2表示处理阶段，3表示冒泡阶段
      
      - preventDault()   cancelable为true的时候可以调用，取消默认事件
      - returnValue      ie8中的东西，设置为true后，实现了preventDefault()    

      - stopPropagation()   取消事件进一步冒泡，bubble为true才能用
      - cancelBubble      设置为true实现stopPropagation()

      - target      element   事件的目标
      - srcElement       IE8   时间的目标

      - type     事件的类型  string


**兼容性**
```js
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
    }
}
```


###事件类型

####UI事件
+ load 页面完全加载后在window上触发，框架加载完毕后在框架集上触发，图像加载完后在<img>上触发。    
+ unload 页面框架卸载后对应触发
+ abort  终止，用户停止下载过程时，如果嵌入的内容没有加载完，在<object>上面触发
+ error   js错误在window上触发，无法加载图像在<img>触发，无法加载嵌入的内容在<object>,框架无法加载的时候在框架集上触发   
+ select  用户选择文本框中一个或者多个字符的时候触发
+ resize  窗口大小改变window或者框架上触发
+ scroll  用户滚动滚动个条的时候触发，在元素上面触发，<body>元素包含页面的滚动条



##### load
页面、图片、js文件都会除服load事件： 
+ 页面  
```js
EventUtil.addHandler(window,"load",funciton(event){
    event = EventUtil.getEvent(event);
    //  在兼容DOM的浏览器中，event.target指向document,而 ie则不会为这个时间设置srcElement
})
```
+ body   
所有浏览器都支持window，所有少用body触发    
+ img   
在创建新的img元素的时候，可以为其指定一个事件处理程序，以便图像加载完毕后给出提示，最重要的是**在指定src属性前指定事件**。
```js
EventUtil.addHandler(window,"load",function(){
    var image = document.createElement("img");
    EventUtil.addHandler(image,"load",function(event){
        event = EventUtil.getEvent(event);
        //do something
    });
    document.body.appendChild(image);
    image.src = 'haha';
});
```
首先为window指定load事件，向DOM添加元素的话，所有元素必须加载完毕，页面加载完前操作，document.body 会出错； 新图像元素不一定是要从添加到文档后才开始下载，只要设置了src属性就会下载   。    
在不属于DOM文档的图像（未添加到文档的img元素和image对象）上触发load时，ie8 不会生成event对象       
+ script  
<script>只有在设置了src属性并添加到文档后才会开始下载，也就是指定事件和src的顺序不是很重要</script> IE8不支持
##### unload 
文档完全卸载后触发，只要从一个页面切换到另一个页面就会发生，多用于清除引用，多在window上个触发
##### resize
浏览器最大化、最小化、改变大小的时候会在window上触发， ie、chrome会在变化1像素后触发，fireFox则只会在用户停止调整后触发，因此这个事件的处理程序中不要存在大计算量的代码  
```js
EventUtil.addHandler(window,"resize",function(event){
   // ie8未设置srcElement
})；
```
##### scroll
window上触发，混杂模式，通过body元素的scrollTop/scrollLeft监控，标准模式通过html来检测。
```js
EventUtil.addHandler(window,"scroll",function(event){
    if(document.compatMode == "CSS!Compat"){
        document.documentElement.scrollTop
    }else{
        document.body.scrolTop
    }
})
```
滚动期间不停触发，少计算   
####焦点事件
document.hasFocus()   返回布尔值确认当前文档是否获得焦点       
document.activeElement   返回获取焦点的元素  
焦点事件的触发顺序       
focusout 失去焦点时触发，冒泡   
focusin 元素获取焦点时触发，冒泡  
blur 元素失去焦点师触发，不会冒泡    
focus 元素获取焦点时触发，不会冒泡     
检测是否支持     
var isSupported = document.implementation.hasFeature('FocusEvent','3.0');

####鼠标和滚轮  
mousedown :  按下鼠标任意键触发,键盘触发不了  
mouseup   键盘不触发，松开键的时候用   
click:单机鼠标左键或者回车键   
dbclick : 双击左键     
   
mouseenter : 鼠标从外部进入到元素内部时触发，不冒泡，进入子元素不会触发     
mouseleave ： 鼠标从内部移动到外部的时候触发，不冒泡，移动到后代元素也不触发     


mousemove  鼠标指针在元素内部移动时触发 ，键盘不触发 


//下面的是穿越边界就会触发的
mouseout   从一个元素移动到另一个元素上时触发，可能是外部元素也可能是内部元素 键盘不触发      
mouseover  鼠标指针位于元素外部，进入子元素也会触发。键盘不触发   

   
同时触发mousedown和mouseup才能触发 click。其中一个被取消就没办法触发。 dbclick需要触发两次才行      

检测所有事件是否支持  
var isSupported  =  document.implementation.hasFeature("MouseEvent","3.0");

#####客户区坐标  
event.clientX      
event.clientY
##### 页面坐标

```js
var pageX = event.pageX,
    pageY = event.pageY;
  //IE8
if(pageX === undefined){
    pageX = event.clientX +event.body.scrollLeft||event.documentElement.scrollLeft;
}
if(pageY === undefined){
    pageY = event.clientY +event.body.scrollTop||event.documentElement.scrollTop;
}
```
##### 屏幕坐标
event.screenX     
event.screenY
##### 修改键
ctrl、alt、shift、cmd键与鼠标组合使用的话，在触发鼠标事件之后，在event属性中，后有对应的ctrlKey、altKey、shiftKey、mataKey等的属性中的一个布尔值会为true。用于确认哪个是对的
##### 相关元素  
mouseover和mouseout事件会涉及两个元素。 并且event中会保存target元素和relateTarget记录双方。   
```js
var EventUtil = {
    getRelateTarget: function(event){
        if(event.relateTarget){
            return event.relateTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromeElement;
        }else{
            return null;
        }
    }
}
```
#####鼠标按钮  
对于mousedown和mouseup的事件还有一个button的属性，0 表示左键，1表示中间，2表示右键。兼ie8   
```js
getButton : function(event){
        if(document.implementation.hasFeature('MouseEvents',"2.0")){
            return event.button;
        }else{
            switch(event.button){
                case 0 :
                case 1 :
                case 3 : 
                case 5 :
                case 7 :
                   return 0;
                case 2 :
                case 6 :
                   return 2;
                case 4 :
                   return 1;
            }
        }
    }
```

##### 更多信息
detail属性，记录在给定位置上单击了多少次，同一位一次mousedown和mouseup算作一次单机，detail属性从1开始计算，每次单击后递增，
如果在mousedown和mouseup之间移动了位置，detail就重置为0

##### 鼠标滚轮事件      
向下滚动的话，获取的是负的值，向上滚动的话获取的是正的值  
```js
var EventUtil = {
    getWheelDelta:function(event){
        if(event.wheelDelta){
            return (client.engine.opera&&client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        }else{
            return -event.detail*40;
        }
    }
}
```
使用方法   
```js
(function(){
    function handleMouseWheel(event){
        event = EventUtil.getEvent(event);
        var delta = EventUtil.getWheelDelta(event);
    }
    EventUtil.addhandler(document,"mousewheel",handleMouseWheel);
    EventUtil.addhandler(document,"DOMMouseScroll",handleMouseWheel);
})()
```

##### 触摸设备
没有dbclick，双击会放大          
单击元素会触发 mousemove  ,如果操作会导致内容变化，将不再有其他事件发生；如果没有发生变化，就会触发，mousedown/mouseup/click;轻击不可单击的元素不会触发任何事件（默认操作所的元素和指定click的元素）
mousemove也会触发mouseover和mouseout事件     
两手指放在屏幕上并岁手指移动会触发mousewheel和scroll
#### 键盘和文本事件  
keydown 按下任意键触发，按住不放的话，会重复触发此事件      
keypress 按下 字符键触发，不放的话，重复触发
keyup 释放任意键触发     
只有用户通过文本框输入文本时才常用到     
textInput 最为对keypress的补充，用意是在将文本显示给用户之前更容易拦截文本。 文本插入文本框前会触发textInput     

如果按下字符键的时： keydown、keypress位于文本框发生变化前被触发，如果不松开，这两个事件会一直触发，keyup松开后触发，在文本框内容变了之后   

如果按下非字符键，先触发keydown，不松开的话，会一直触发，松开后触发keyup

**同样支持组合键**

##### 键码 
在发生keydown、keyup的时候，event对象的keyCode属性会包含一个代码，用于标记对应的键。有特殊的情况返回的不同

#####字符编码  
当keypress键按下时，意味着按下的键会影响屏幕中文本的显示。 在浏览器中，按下能够插入或者删除字符的键都会触发keypress事件，并且y有个属性 charCode只有在这时才有值，ie有问题，所以，需要兼容
```js
getCharCode : function(event){
    if(typeof event.charCode == "number"){
        return event.charCode;
    }else{
        return event.keyCode;
    }
}
```
获取字符编码后，可以使用String.fromCharCode()将其转化为实际的字符
##### textInput 事件
DOM3 中引入，textInput.  
所有可以获得焦点的元素都可以触发keypress，但只有编辑区域才能触发textInput.textInput只有在用户按下实际能输入的键才会触发，keyPress事件则在按下那些能够影响文本显示的键师才触发（ps 退格)   
textInput属性有一个属性data记录用户输入的字符
还有一个 inputMethod记录输入的方法，只有ie支持
####复合事件
输入物理键盘上没有的字符的时候（日文）需要按住多个键，和textInput差不多，
compositionstart:在IME（input method editor）打开时触发    
compositionupdate: 在向输入字段中插入新字符时触发
compositionend  ： 在ime的文本符合系统关闭时触发，表示返回正常键盘输入状态  
其属性data包含改变量的内容
#### 变动事件 
DOM2定义的    
   - DOMSubtreeModified : 在dom中发生任何变化后都会触发，在其他任何事件触发后都会触发。不要在这里操作dom会产生循环
   - DOMNodeInserted ： 在一个节点作为子节点插入到另一个节点的时候触发
   - DOMNodeRemoved  节点在父节点被移除
   - DOMNodeInsertedIntoDocument  一个节点字节插入文档或者通过子树间接插入文档后触发，发生在DOMNodeInserted后
   - DOMNodeRemovedFromDocument  一个节点被直接从文档中移除或者通过子树简介移除之前触发，在DOMNodeRemoves后触发
   - DOMAttrModified 在修改特性后触发
   - DOMCharacterDataModified  文本节点值发生变化后触发
IE8不支持任何变动事件  ，并且有些在DOM3中被移除了
#####删除节点
removeChild()或者replaceChild()在DOM中删除节点时，首先触发DOMNodeRemoved事件，event.target是删除的节点，event.relateNode是目标的父节点，事件触发时还未移除，因此parentNode属性依然存在，与event.relateNode相同。事件会冒泡，因此可以在任何层次上处理他。    
如果该节点包含子节点，那么，自身和子节点都会触发DOMNodeRemovedFromDocument，事件不会冒泡，因此只能在子节点上指定处理程序。此时的目标就是本身或者相应子节点，event中不包含其他信息  
最后触发，DOMSubtreeModified事件,目标是被移除节点的父节点


#####插入节点 
appendChild()  repalceChild()  insertBefore()   插入节点会触发DOMNodeInserted. 目标是插入的节点，relateNode是父节点。触发时节点已经被插入父节点中了。冒泡，可以在个个层次处理     
之后触发DOMNodeInsertedIntoDocument不冒泡，子节点定义
最后在父节点触发DOMSubtreeModified

#### h5事件
#####contextmenu 右键事件
在页面右键的时候触发，会出现默认的选项，可以阻止默认事件，存在bug，目前只有火狐支持还
##### beforeunload 
window上触发，可以让页面在卸载前被阻止，只是弹出一条alert，显示的内容设置为event.returnValue并设置成返回值
```js
EventUtil.addHandler(window,"beforeunload",function(event){
    event = EventUtil.getEvent(event);
    msg = "不要离开我";
    event.returnValue = msg;
    return msg;
})
```
##### DOMContentLoaded   DOM树形成后触发
ie9以上支持，触发后可以处里dom并添加事件。对于不支持的浏览器，设置一个0毫秒的超时调用无法确保在load前使用
##### readystatechage
ie中支持很久的东西，用于替代DOMContentLoaded；替代的方法,一本只有ie支持
```js
EventUtil.addHandler(document,"readystatechange",function(event){
    if(document.readyState == "interactive" || document.readyState == "conplete"){
    EventUtil.removeHandler(document,"readystatechange",arguments.callee);
    //这里的arguments.callee指向的是最开始的，也就是最初的匿名处理函数
    }
})
```
##### pageshow和pagehide
新浏览器中有个往返缓存 back-forward cache，保存着页面的所有数据，让用户 “后退”和“前进”更快一些。从缓存中读取的页面不会触发load事件。     
pageshow  页面显示的时候触发，不论是否来自缓存，新页面会在load后触发，旧的页面会在页面完全显示后触发，必须安置在window上使用，刷新会重新加载页面。  在这个事件中，event.persisted 属性布尔值true表示页面被缓存了。   
pagehide 在页面unload前触发，event.persisted保存着页面信息，如果页面在卸载后保存到了bfcache中，persisted就会被保存为true。  
第一次pageshow的时候，persisted一定是false，第一次pagehide也一定是persisted为true    
对于制定了unload事件的页面一定被排除在bfcache之外
##### haschange 
url 变化的时候触发，用于通知开发人员，保存状态和导航信息用。   window上触发这个事件，event包含额外的oldURL和newURL。但是ie不支持，所以最好还是用location来确定参数列表    
#### 设备事件
主要介绍旋转和重力的控制问题
#### 触摸与手势事件
##### 触摸事件
  - touchstart   手指触摸屏幕时触发，即使一个手指已经放在屏幕上也会触发      
  - touchmove    手指在屏幕上滑动的时连续触发。可以通过preventDefault()可以阻止滚动，target与start相同
  - touchend     手指从屏幕移开的时候触发，target必定和touchstart的相同
  - touchcancel  系统停止跟踪时触发，突发弹框，从document移动到了浏览器的边框，突然增加了一个手指
  - touches      表示当前跟踪的触摸操作的Touch对象的数组
  - targetTouches   特定于事件目标的Touch对象数组
  - changeTouches  上次触摸以来发生了什么改变的Touch对象的数组  
  
  - Touch对象包含的属性  
      - clientX
      - pageX
      - screenX
      - identifier 标识触摸的唯一ID
      - target  触摸DOM节点目标      
 **当touchend发生时，touches集合中就没有热表格Touch对象了，因为不存在活动的触摸操作，应该转而使用changeTouches集合**     


```js
function handleTouchEvent(event){
     //只追踪一次触摸
    if(event.touches.length == 1){
        var output = document.getElementById("output");
        switch(event.type){
            case "touchstart":
                output.innerHTML = "touch start ("+ event.touches[0].clientX;
                break;
            case "touchend":
                break;
           case "touchmove":
               event.preventDefault();
               output.innerHTML = event.changedTouches[0].clientX

        }
    }
}
```


触摸发生的事件顺序   ： touchstart 、mouseover、mousemove、mousedown、mouseup、click、touchend   



#####手势事件
两个手指触摸屏幕的时候产生手势事件 ，冒泡的是
gesturestart   一个手指已经按在屏幕上面而另一个手指又触摸屏幕上时触发    
gesturechange  当触摸后另一个手指位置发生变化时触发   
gestureend     任何一个手指移开时触发  

在一个事件上设置事件处理程序，意味着两个手指必须同时位于该元素的范围内。   
touch和手势事件的关系     
当一个手指放在屏幕上的时候，触发touchstart事件，如果另一个手指又放在了屏幕上，则会触发gesturestart，随后触发该手指的touchstart，如果有一个手指移动name就会触发gesturechange，只要有一个手指移开，就会触发gestureend事件，紧接着触发该手指的touchend   

gesture事件包含两个额外的属性 rotation和scale 记录着转过的角度和手指尖距离变化。  
### 内存和性能
####事件委托  
给父级元素指定事件处理程序，然后通过target识别相应的元素，并操作相应的函数，可以减少添加事假处理程序。
####移除事件处理程序

### 模拟事件（ie9+）  
最好不用

## 表单脚本   

###基础
html表单由<form>元素表示，而在js中对应的是HTMLFormElement类型，继承了HTMLElement对象，自己有些独有的属性和方法   
    - acceptCharset     服务器能够处理的字符集，等价于HTML中的accept-charset
    - action    接收请求的url
    - enctype  请求的编码类型
    - elements   表单中所有控件的集合
    - length     表单中控件的数量
    - method     get post
    - name    
    - reset() 将所有表单重置为默认值
    - submit()   提交表单
    - target   发送请求和接收响应的窗口  

获取方法，$()    ，    document.forms 可以取得页面所有表单
#### 提交表单
```html
<input type = "submit" value = "Submit"/>    
<button type = "submit">Submit</button>   
<input type = "image"  src ="sibmit.gif">
```
以上按钮提交的时候，浏览器会在将请求发送给服务器前触发submit事件，我们有机会验证表单数据，并决定是否允许表单提交。阻止这个事件的默认行为可以取消提交表单   
```js
var form = document.getELementById("form1");
EventUtil.addHandler(form,"submit",function(event){
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);
})
```

也可以直接   
form.submit()  提交表单 ，但是这时不会触发submit事件，所以需要先验证表单之后再调用此方法  

**防止重复提交#**  
第一次提交后就禁用提交按钮，必须是在submit事件上disabled = true ，或者用onsubmit取消后续的表单提交操作，因为submit和click先后顺序不一定的是

####重置表单

```html
<button type = "reset" >reset</button>  
<input type = "reset" value = "reset">
```
可以通过取消默认行为来阻止重置 
也可以直接 form.reset().但是这里会触发 reset事件  

#### 表单字段
表单元素可以直接按照dom方法访问，也可以，用elements 按照顺序或者name属性来访问每个元素。 相同的name的话会返回一个nodelist   
##### 共有表单字段属性  
 - disabled 当前表单是否被禁用  
 - form   志昂当前字段所属表单的指针，只读
 - name
 - readOnly   是否只读
 - tabIndex   当前字段的切换序号  
 - type        checkbox radio等 
 - value       当前字段提交给服务器的值，文件字段来说给的是文件在计算机中路径，只读 

把焦点设置到当前字段  
input1.focus()       
input1.disabled   = true   ;  禁用当前字段  
##### 共有的 方法  
focus()、blur()   
focus后可以触发键盘事件    
并且type = hidden的元素不能设置焦点  
h5 添加了一个属性， autofocus 会自动设置焦点，因此在设置focus前先要检查一下， 
```js
 if(element.autofocus !== true){
     element.focus();
 }
```


##### 共有的事件  
- blur  当前字段失去焦点的时候触发  
- change 对于inout 和 textarea 当他们失去焦点，并且value值改变的时候触发；对于select元素只有其选项改变时才会触发 
- focus 获得焦点的时候触发  
focus和blur事件都会触发对应的事件。  change对于select事件不需要失去焦点也可以触发的    

focus和blur通常用来改变用户界面，要么给出视觉提醒，要么向界面添加额外的功能
blur和change不能指定先后顺序  
### 文本框脚本  

单行文本框必须把<input>的type设置为text，通过设置size指定现实的字符数，通过value属性设置初始值，而maxlength 可以设置接收的最大字符数    
textarea元素始终呈现多行文本，指定文本框大小，rows 行  和 cows列   
处理文本框内容的时候最好用value而不是setattribute，因为dom的修改不一定会显示  
####  选择文本    
文本框都支持select() 方法，这个方法会选中文本框中的所有文本，多数浏览器都会将焦点设置到文本框中， 可以通过focus事件中调用select方法来使用户可以直接修改文本框里的内容，节省操作
 
#####  选择事件  select
用户选择了文本框的文本并释放鼠标后才会触发，让我们知道什么时候用户选择了文本；select方法也可以触发select事件。  

##### 取得选择的文本  （用户选了什么）
h5添加了两个属性，selecStart和selectEnd来记录选择的位置； 然后

```js
function getSelectedText(textbox){
    if(typeof textbox.selectionStart == "number"){
        return textBox.value.substring(textbox.selectionStart,textbox.selectionEnd);
    }else if(document.selection){
        //ie8
        return document.selection.createRange().text;
    }
}
```
##### 选择部分文本  （开发人员选）
h5中所有文本框会有个setSelectionRange方法    
```js
function selectText(textbox,startIndex,stopIndex){
    if(textbox.setSelectionRange){
        textbox.setSelectionRange(startIndex,stopIndex);
    }else if(textbox.createTextRange){
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character",startIndex);
        range.moveEnd("character",stopIndex-startIndex);
        range.select();
    }
    textbox.focus();
}
```

####过滤输入   
#####屏蔽字符 
例如只输入数字  
```js
EventUtil.addHandler(textbox,"keypress",function(event){
    //输入内容最好用keypress来处理
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var charCode = EventUtil.getCharCode(event);

    if(!/\d/.test(String.FromCharCode(charCode)&&charCode>9&&！event.ctrlKey){
        //这里charCode>9是为了补充keypress，屏蔽了退格删除上下键等，但是这里有问题不能修改了啊
        //最后不屏蔽ctrl键
        EventUtil.preventDefault(event);
    }
})
```


##### 操作剪贴板
存在6个剪贴板事件  
beforecopy   
copy     
beforecut    
cut     
beforepaste  
paste    
在实际的事件发生前可以通过这些before事件来修改剪贴板里的数据，取消这些事件并不会取消实际发生的事件，只有取消实际的事件才能取消   
剪切板对象 clipboardData    
```js
var EventUtil = {
      getClipboardText : function(event){
        var clipboardData = (event.clipboardData||window.clipboardData);
        return cllipboardData.getData(event);
    },
    setClipboardText:function(event,value){
        if(event.clipboardData){
            return event.clipboardData.setData("text/plain",value);
        }else if(window.clipboardData){
            return window.clipboardData.setData("text",value);
        }
    },
    clearClipboard:function(event){
         var clipboardData = (event.clipboardData||window.clipboardData);
        cllipboardData.clearData();
    }
}
```  

在确保文本框内容是包含某些字符的时候，剪贴板事件很有用的     
```js
EventUtil.addHandler(textbox,"paste",function(event){
    event = EventUtil.getEvent(event);
    var text = EventUtil.getClipboardText(event);
    if(!/^\d*$/.test(text)){
        Event.preventDefault(event);
    }
})
```
#### 自动切换焦点  
实现文本框达到最大数量后自动将焦点切换到下一个文本框   

电话的例子

```html
<input type = "text" name = "tel1" id = "txtTel1" maxlength = "3">
<input type = "text" name = "tel2" id = "txtTel2" maxlength = "3">
<input type = "text" name = "tel3" id = "txtTel3" maxlength = "4">
```
对应的输入  
```js
(function(){
    function tabForward(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if(target.value.length == target.maxLength){
            var form = target.form;
            for(var i = 0,len = form.elements.length;i<len;i++){
                if(form.elements[i+1]){
                    form.elements[i+1].focus();
                }
                return;
            }
        }
    }
    var textbox1 = document.getElementById("txtTel1");
    var textbox2 = document.getElementById("txtTel2");
    var textbox3 = document.getElementById("txtTel3");

    EventUtil.addHandler(textbox1,"keyup",tabForward);
})();

```
#### H5约束验证API
##### required 
必填内容的属性，input、textarea 和select 可以选用  
```html
<input type = "text" name ="username" required>
```
js可以直接访问该属性，检查是否是必填的字段，text1.required  布尔值  

##### 输入类型  
input中type可选 email 、url
##### 数值范围 
input的type可选的有number 、 range 、 datetime 、datetime-local 、 date 、month、week、time  ，
这些数值类型的输入元素，可以指定min属性（最小的可能值）max（最大的可能值）和step属性（从min到max之间的差值），例如输入0~100的值，并且是5的倍数  
```html
<input type="number" min="0" max="100" step="5">
```

##### 输入模式 pattern
属性的值是一个正则表达式，用于匹配文本框中值。例如
```html
<input type="text" pattern="\d+" name="count">
```
不用加上^$  
##### 检测有效性
checkValidity()防范可以检测表单中某个字段是否有效，返回布尔值  

通过validity属性获取详细的信息

这个属性包含很多属性 
   - customError 如果设置了setCustomValidity() ，则为true
   - patternMismatch   输入与指定不服，返回true
   - rangeOverflow      比max大
   - rangeUnderflow     比min小   
   - stepMisMatch
   - tooLong             输入超过了maxLength 返回true
   - typeMismatch     number的type中有了其他的
   - valueMissing  require属性没有value  
   - valid          有效，前面的都是false的时候这里才true

```js
if（input.validity && !input.validity.valid){
    if(input.validity.valueMissing){
        alert("Please specify a value");
    }else if(input.validity.typeMismatch){
        alert("Please enter an number")
    }
}
```

#####禁用验证 
告诉表单不用验证
```html
<form method="post" action="signup.php" novalidate>
</form>
```
也可以js取得和设置这个值  
document.forms[0].novalidate = true;

也可以通过提交按钮设置formnovalidate 来禁用验证  
```html
<input type = "submit"  formnovaldate name="hah" value="hah">
```
当然也可以通过js来获取和设置这个属性


###下拉框脚本
```html
<!-- The second value will be selected initially -->
<select name="select">
  <option value="value1">Value 1</option> 
  <option value="value2" selected>Value 2</option>
  <option value="value3">Value 3</option>
</select>
``` 

HTMLSelectElement类型还提供了额外的属性和方法  
- add(newOption,relOption)    
- multiple   是否允许多选
- options    控件中所有option的集合
- remove(index) 
- selectedIndex  被选中项的索引，没有的话-1 
- size    选择框可见的行数             
选择框的type属性  select-one 或者 select-multiple  
value  属性，没有选中的项的时候是空，有选中的是第一个的value，没设置value的就是文本内容  

HTMLOptionElement  ：    
 -  index 
 - label 
 - selected
 - text 
 - value 

#### 选择选项
   **显示被选中的项**        
   var selectedOption =  selectbox.options[selectbox.selectedIndex];   
   selectedOption.text    selectedOption.value   

  **设置选中项**     
  selectbox.selectedIndex = index;  或者   
  selectbox.options[index].selected = true ;  

#### 添加选项  
```js
var newOption = document.createElement("option");
newOption.appendChild(document.createTextNode("new Option"));
newOption.setAttribute("value","newVlue");
selectbox.appendChild(newOption);
```

或者  
```js
var newOption = new Option("text","value");
select.add(newOption,undefined);
//DOM的appendChild(ie8有问题),insetBefore()都可以用
```
#### 移除选项 
这里options应该是一个Nodelist
```js
selectbox.removeChild(selectbox.options[0]);

selectbox.remove(0); 移除第一个项，之后的项会自动补充成第一个   

selectbox.option[0] = null;
```

####移动和重排 

appendChild()传入一个**文档中**已经有的元素，会将原来的元素删除，然后添加到指定的位置    
selectbox.insertBefore(nodetomove,option);

### 表单序列化  
利用type、name、value 把数据转化成可以保存传输的形式     
发送给服务器的数据   
- 对表单的名称和值进行 URL编码，使用&分割  
- 不发送禁用的表单字段  
- 只发送勾选的复选和单选按钮 
- 不发送type为submit和reset的按钮
- 多选框每种选中框单独一个条目  
- 在单机提交按钮提交表单的情况下，也会发送提交按钮，包含input的type为image的元素  

序列化的代码  

```js
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
```
### 富文本编辑  
所见即所得,很多内容没看，用到了再添加吧
在页面中嵌入一个包含空HTML页面的iframe，通过只能代码加载的属性，designMode  = “on” 就可以了  
```js
<iframe name = "rechedit" style = "height:100px;width:100px;" src="blank.html"></iframe>

<script type = "text/javascript">
EventUtil.addHandler(window,"load",function(){
    frames["rechedit"].document.designMode = "on";
});
</script>
```  


submit的时候   
```js
target.elements["comments"].value = recheditelement.innerHtml;
```  



## Canvas 
#神奇的canvas--传智播客前端学院

# 一、canvas简介

## 1.1 什么是canvas？（了解）

+ 是HTML5提供的一种新标签
```
    <canvas>浏览器不支持的话会显示这些文字</canvas>
     英 ['kænvəs]  美 ['kænvəs]   帆布 画布
```
+ Canvas是一个矩形区域的画布，可以用JavaScript在上面绘画。控制其每一个像素。
+ canvas 标签使用 JavaScript 在网页上绘制图像，本身不具备绘图功能。
+ canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
+ HTML5之前的web页面只能用一些固定样式的标签：比如p、div、h1等
       
## 1.2 canvas主要应用的领域（了解）  

1. 游戏：canvas在基于Web的图像显示方面比Flash更加立体、更加精巧，canvas游戏在流畅度和跨平台方面更牛。      
    [25 超棒的 HTML5 Canvas 游戏](http://www.oschina.net/news/20143/top-25-best-html5-canvas-games-you-love-to-play)

2. **可视化数据**.数据图表话，比如:[百度的echart](http://echarts.baidu.com/)    

3. **banner广告**：Flash曾经辉煌的时代，智能手机还未曾出现。现在以及未来的智能机时代，HTML5技术能够在banner广告上发挥巨大作用，用Canvas实现动态的广告效果再合适不过。

4. 未来=> 模拟器：无论从视觉效果还是核心功能方面来说，模拟器产品可以完全由JavaScript来实现。

5. 未来=> 远程计算机控制：Canvas可以让开发者更好地实现基于Web的数据传输，构建一个完美的可视化控制界面。

6. 未来=> 图形编辑器：Photoshop图形编辑器将能够100%基于Web实现。

7. 其他可嵌入网站的内容(多用于活动页面、特效)：类似图表、音频、视频，还有许多元素能够更好地与Web融合，并且不需要任何插件。

8. **完整的canvas移动化应用**

9. 我们课程的目标
    + 我们不是主要做游戏开发的
    + 要求必须会做基本的用canvas绘制的特效页面：比如，传智前端官网。
    + 会用canvas做一些简单的广告、活动页面

10. 我们课程的案例和项目演示

11. canvas的标准： 
    + 最新标准：http://www.w3.org/TR/2dcontext/
    + 稳定版本的标准：http://www.w3.org/TR/2013/CR-2dcontext-20130806/
    + 目前来说，标准还在完善中。先用早期的api足够完成所有的应用
# 二、canvas绘图基础

## 2.0 sublime配置canvas插件（推荐）
    推荐：
        安装插件：AndyJS2
        github地址： https://github.com/malun666/AndyJS2
        直接下载到：X:\Users\用户名\AppData\Roaming\Sublime Text 3\Packages

## 2.1 Canvas标签

### 2.1.1 canvas标签语法和属性  （重点）     
+ canvas：画布油布的意思 ==英 ['kænvəs]   美 ['kænvəs] ==
+ 标签名canvas，需要进行闭合。就是一普通的html标签。
+ 可以设置width和height属性，但是属性值**单位必须是px**，否则忽略。
+ width和hegiht：默认300*150像素
+ 注意：
    * 不要用CSS控制它的宽和高,会走出图片拉伸，
    * 重新设置canvas标签的宽高属性会让画布擦除所有的内容。
    * 可以给canvas画布设置背景色

### 2.1.2 浏览器不兼容处理（重点）

+ ie9以上才支持canvas, 其他chrome、ff、苹果浏览器等都支持
+ 只要浏览器兼容canvas，那么就会支持绝大部分api(个别最新api除外)
+ 移动端的兼容情况非常理想，基本上随便使用
+ 2d的支持的都非常好，3d（webgl）ie11才支持，其他都支持
+ 如果浏览器不兼容，最好进行友好提示         
```
    例如：                     
    <canvas id="cavsElem">
        你的浏览器不支持canvas，请升级浏览器.浏览器不支持，显示此行文本
    </canvas>
```
+ 浏览器不兼容，可以使用*flash*等手段进行**优雅降级**


## 2.2 canvas绘图上下文context

### 2.2.1 Context：Canvas的上下文、绘制环境。（重点掌握）
+ 上下文：上知天文，下知地理。是所有的绘制操作api的入口或者集合。
+ Canvas自身无法绘制任何内容。Canvas的绘图是使用JavaScript操作的。
+ Context对象就是JavaScript操作Canvas的接口。
*使用[CanvasElement].getContext(‘2d’)来获取2D绘图上下文。        
```
var canvas  = document.getElementById( 'cavsElem' ); //获得画布
var ctx = canvas.getContext( '2d' );//注意：2d小写， 3d：webgl
```

### 

## 2.3 基本的绘制路径（重点）
### 2.3.1 canvas坐标系
    canvas坐标系，从最左上角0,0开始。x向右增大， y向下增大

### 2.3.2 设置绘制起点(moveTo)
    * 语法：ctx.moveTo(x, y); 
    * 解释：设置上下文绘制路径的起点。相当于移动画笔到某个位置
    * 参数：x,y 都是相对于 canvas盒子的最左上角。
    * 注意：**绘制线段前必须先设置起点，不然绘制无效。**

### 绘制轨迹
### 2.3.3.1 绘制直线(lineTo)
    * 语法：ctx.lineTo(x, y);
    * 解释：从x,y的位置绘制一条直线到起点或者上一个线头点。
    * 参数：x,y 线头点坐标。
#### 2.3.3.2 绘制圆弧 
    * ctx.arc(x,y,radius,startAngle,endAngle,conuterclosewise)
    * x、y为圆心，radius为半径，其实角度和结束角度， 是否逆时针转动  

    * ctx.arcTo(x1,y1,x2,y2,radius) 
    * 穿过1、2点，半径为radius的圆弧

    * ctx.moveTo(30,50);
    * ctx.bezierCurveTo(x1,y1,x2,y2,x,y) 
      Bezier曲线,起点到xy的bezier曲线，1/2是控制点

    * quadraticCurveTo(x1,y1,x,y)
     上一个点到xy的二次曲线，1点为控制点,好像不太对，不是正统的抛物线啊     
    * rect(x,y,width,height)

    * clip()不知道怎么用





### 2.3.4 路径开始和闭合
    * 开始路径：ctx.beginPath();
    * 闭合路径：ctx.closePath();
    * 解释：如果复杂路径绘制，必须使用路径开始和结束。闭合路径会自动把最后的线头和开始的线头连在一起。
    * beginPath: 核心的作用是将 不同绘制的形状进行隔离，
      每次执行此方法，表示重新绘制一个路径,跟之前的绘制的墨迹可以进行分开样式设置和管理。

### 2.3.5 描边(stroke)
    * 语法：ctx.stroke();
    * 解释：根据路径绘制线。路径只是草稿，真正绘制线必须执行stroke
    * stroke: （用笔等）画；轻抚；轻挪；敲击；划尾桨；划掉；（打字时）击打键盘
     英 [strəʊk]   美 [strok]
+ canvas绘制的基本步骤：
    * 第一步：获得上下文 =>canvasElem.getContext('2d');
    * 第二步：开始路径规划 =>ctx.beginPath()
    * 第三步：移动起始点 =>ctx.moveTo(x, y)
    * 第四步：绘制线(矩形、圆形、图片...) =>ctx.lineTo(x, y)
    * 第五步：闭合路径 =>ctx.closePath();
    * 第六步：绘制描边 =>ctx.stroke();
```
    html部分：
        <canvas id="cavsElem">
            你的浏览器不支持canvas，请升级浏览器
        </canvas>

    javascript部分：

    //===============基本绘制api====================
    //获得画布
    var canvas = document.querySelector('#cavsElem');
    var ctx = canvas.getContext('2d');  //获得上下文

    canvas.width = 900;     //设置标签的属性宽高
    canvas.height = 600;    //千万不要用 canvas.style.height
    canvas.style.border = "1px solid #000";

    //绘制三角形
    ctx.beginPath();        //开始路径
    ctx.moveTo(100,100);    //三角形，左顶点
    ctx.lineTo(300, 100);   //右顶点
    ctx.lineTo(300, 300);   //底部的点
    ctx.closePath();        //结束路径
    ctx.stroke();           //描边路径
```
+ 综合案例：02绘制定位表格.html
+ 综合案例：03画画板.html

### 2.3.7 填充(fill)
    * 语法：ctx.fill(); 
    * 解释：填充，是将闭合的路径的内容填充具体的颜色。默认黑色。


    * 注意：交叉路径的填充问题，“非零环绕原则”，顺逆时针穿插次数决定是否填充。
        
        以下是非0环绕原则的原理：（了解即可，非常少会用到复杂的路径）
        “非零环绕规则”是这么来判断有自我交叉情况的路径的：对于路径中的任意给定区域，从该区域内部画一条足够长的线段，
        使此线段的终点完全落在路径范围之外。
        图2-14中的那三个箭头所描述的就是上面这个步骤。
        接下来，将计数器初始化为0，
        然后，每当这条线段与路径上的直线或曲线相交时，
        就改变计数器的值。如果是与路径的顺时针部分相交，则加1，
        如果是与路径的逆时针部分相交，则减1。若计数器的最终值不是0，那么此区域就在路径里面，在调用fill()方法时，
        浏览器就会对其进行填充。
        如果最终值是0，那么此区域就不在路径内部，浏览器也就不会对其进行填充了
    * 案例： 04填充矩形.html

<img src="imgs/fill-0-prin.jpg" height="206" width="289">

### 2.3.8 快速创建矩形rect()方法
    * 语法：ctx.rect(x, y, width, height);
    * 解释：x, y是矩形左上角坐标， width和height都是以像素计，传入数字就行
    * rect方法只是规划了矩形的路径，并没有填充和描边。
    * 改造案例：04填充矩形.html
    *rect: abbr. 矩形（rectangular）；收据（receipt）

### 2.3.9 快速创建描边矩形和填充矩形
    * 语法： ctx.strokeRect(x, y, width, height);
        - 参数跟2.3.8相同，注意此方法绘制完路径后立即进行stroke绘制
    * 语法：ctx.fillRect(x, y, width, height);
        - 参数跟2.3.8相同， 此方法执行完成后。立即对当前矩形进行fill填充。

### 2.3.10 清除矩形(clearRect)
    * 语法：ctx.clearRect(x, y, width, hegiht);
    * 解释：清除某个矩形内的绘制的内容，相当于橡皮擦。

## 2.4 绘制圆形（arc)  
+ 概述：arc() 方法创建弧/曲线（用于创建圆或部分圆）。
    * 语法：ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
    * arc:  弧（度）弧形物；天穹 英 [ɑːk]   美 [ɑrk]
    * counter 反击，还击；反向移动，对着干；反驳，回答  ['kaʊntə]   美 ['kaʊntɚ]
    * 解释：
        - x,y：圆心坐标。 
        - r：半径大小。
        - sAngle:绘制开始的角度。 圆心到最右边点是0度，顺时针方向弧度增大。
        - eAngel:结束的角度，注意是弧度。π
        - counterclockwise：是否是逆时针。true是逆时针，false：顺时针
        - 弧度和角度的转换公式： rad = deg*Math.PI/180;  
        - 在Math提供的方法中**sin、cos等都使用的弧度**    
![图片](imgs/arc.gif "title3")   

+ 案例：05绘制圆形.html
+ 案例：06绘制饼状图.html

## 2.5 绘制文字（会使用就可以了）
### 2.5.1 绘制上下文的文字属性 （有印象就行了） 
+ font            设置或返回文本内容的当前字体属性
    * font 属性使用的语法与 CSS font 属性相同。
```
例如：ctx.font = "18px '微软雅黑'";
```
+ textAlign       设置或返回文本内容的当前对齐方式
    * start :    默认。文本在指定的位置开始。
    * end   :    文本在指定的位置结束。
    * center:    文本的中心被放置在指定的位置。
    * left  :    文本左对齐。
    * right :    文本右对齐。      
```
    * 例如：ctx.textAlign = 'left';         
```
![对齐图片](imgs/textAsign.png)

+ textBaseline      设置或返回在绘制文本时使用的当前文本基线   
    * alphabetic ：   默认。文本基线是普通的字母基线。
    * top        ：   文本基线是 em 方框的顶端。。
    * hanging    ：   文本基线是悬挂基线。
    * middle     ：   文本基线是 em 方框的正中。
    * ideographic：   文本基线是em基线。
    * bottom     ：   文本基线是 em 方框的底端。     
```
    例如： ctx.textBaseline = 'top';
    单词:
     alphabetic: 字母的；照字母次序的   [,ælfə'bɛtɪk]
     ideographic：表意的；表意字构成的   英 [,ɪdɪəʊ'ɡræfɪk]   美 [,ɪdɪə'græfɪk]
```
![设置文字为主](imgs/font-line1.png)     
<img src="imgs/textBaseline.gif" height="268" width="300" alt="">  

### 2.5.2 上下文绘制文字方法  
    * ctx.fillText()      在画布上绘制“被填充的”文本
    * ctx.strokeText()    在画布上绘制文本（无填充）
    * ctx.measureText()   返回包含指定文本宽度的对象
    * 单词：measure 测量；估量；权衡   英 ['meʒə]   美 ['mɛʒɚ]

```
    //综合案例代码：
    ctx.moveTo( 300, 300 );
    ctx.fillStyle = "purple";               //设置填充颜色为紫色
    ctx.font = '20px "微软雅黑"';           //设置字体
    ctx.textBaseline = "bottom";            //设置字体底线对齐绘制基线
    ctx.textAlign = "left";                 //设置字体对齐的方式
    //ctx.strokeText( "left", 450, 400 );
    ctx.fillText( "Top-g", 100, 300 );        //填充文字
```

---

## 2.6 绘制图片（drawImage）  （重点）

### 2.6.1 基本绘制图片的方式
    context.drawImage(img,x,y);
    参数说明： x,y 绘制图片左上角的坐标， img是绘制图片的dom对象。

### 2.6.2 在画布上绘制图像，并规定图像的宽度和高度
    context.drawImage(img,x,y,width,height);   
    参数说明：width 绘制图片的宽度，  height：绘制图片的高度
    如果指定宽高，最好成比例，不然图片会被拉伸</em>
        等比公式：  toH = Height * toW   /  Width;  //等比 
                 设置高 = 原高度 * 设置宽/ 原宽度;

### 2.6.3 图片裁剪，并在画布上定位被剪切的部分
    context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    参数说明：
        sx,sy 裁剪的左上角坐标，
        swidth：裁剪图片的高度。 sheight:裁剪的高度 
        其他同上

### 2.6.4 用JavaScript创建img对象
    第一种方式： 
       var img = document.getElementById("imgId");
    第二种方式：
        var img = new Image();//这个就是 img标签的dom对象
        img.src = "imgs/arc.gif";
        img.alt = "文本信息";
        img.onload = function() {
            //图片加载完成后，执行此方法
        }






# 三、 canvas进阶

## 3.1 Canvas颜色样式和阴影

### 3.1.1 设置填充和描边的颜色（掌握）
+ fillStyle  : 设置或返回用于填充绘画的颜色
+ strokeStyle: 设置或返回用于笔触的颜色

以上两个值都可以接受颜色名,16进制数据，rgb值，甚至rgba.
一般先进行设置样式然后进行绘制。
    
    例如：
    ctx.strokeStyle = "red";      
    ctx.strokeStyle = "#ccc";      
    ctx.strokeStyle = "rgb(255,0,0)";      
    ctx.strokeStyle = "rgba(255,0,0,6)";    

### 3.1.2 设置阴影（了解，少用，性能差）
+ 类比于CSS3的阴影。
+ shadowColor  ：   设置或返回用于阴影的颜色
+ shadowBlur   ：   设置或返回用于阴影的模糊级别,大于1的正整数，数值越高，模糊程度越大
+ shadowOffsetX：   设置或返回阴影距形状的水平距离
+ shadowOffsetY：   设置或返回阴影距形状的垂直距离

```
    ctx.fillStyle = "rgba(255,0,0, .9)"
    ctx.shadowColor = "teal";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.fillRect(100, 100, 100, 100);
```
例如：

+ 案例： 12设置box盒子阴影.html

+ 设置png图片的阴影，图片透明部分不会被投影。

## 3.2 复杂样式（了解）

### 3.2.1 创建线性渐变的样式（了解） 
+ 一般不用，都是用图片代替，canvas绘制图片效率更高。
+ 线性渐变可以用于 矩形、圆形、文字等颜色样式
+ 线性渐变是一个对象
+ 语法：ctx.createLinearGradient(x0,y0,x1,y1); //参数：x0,y0起始坐标，x1,y1结束坐标
```
    例如：
    //创建线性渐变的对象，
    var grd=ctx.createLinearGradient(0,0,170,0);
    grd.addColorStop(0,"black");  //添加一个渐变颜色，第一个参数介于 0.0 与 1.0 之间的值，表示渐变中开始与结束之间的位置。
    grd.addColorStop(1,"white");  //添加一个渐变颜色
    ctx.fillStyle =grd;           //关键点，把渐变设置到 填充的样式
```


### 3.2.2 设置圆形渐变（径向渐变） 了解
+ 创建放射状/圆形渐变对象。可以填充文本、形状等 。
+ context.createRadialGradient(x0,y0,r0,x1,y1,r1);
+ radial   半径的；放射状的；光线的；光线状的   英 ['reɪdɪəl]   美 ['redɪəl]
+ 参数详解：
    * x0:  渐变的开始圆的 x 坐标
    * y0:  渐变的开始圆的 y 坐标
    * r0:  开始圆的半径
    * x1:  渐变的结束圆的 x 坐标
    * y1:  渐变的结束圆的 y 坐标
    * r1:  结束圆的半径
```
var rlg = ctx.createRadialGradient(300,300,10,300,300,200);
rlg.addColorStop(0, 'teal');    //添加一个渐变颜色
rlg.addColorStop(.4, 'navy');
rlg.addColorStop(1, 'purple');
ctx.fillStyle = rlg;//设置 填充样式为延续渐变的样式
ctx.fillRect(100, 100, 500, 500);
```
**俯视的圆锥形颜色变化**


### 3.2.3 绘制背景图（了解）
+ ctx.createPattern(img,repeat) 方法在指定的方向内重复指定的元素了解
+ pattern：n. 模式；图案；样品  英 ['pæt(ə)n]   美 ['pætɚn]
+ 第一参数：设置平铺背景的图片，第二个背景平铺的方式。
    * image    ：   规定要使用的图片、画布或视频元素。
    * repeat   ：   默认。该模式在水平和垂直方向重复。
    * repeat-x ：   该模式只在水平方向重复。
    * repeat-y ：   该模式只在垂直方向重复。
    * no-repeat：   该模式只显示一次（不重复）。
```
    var ctx=c.getContext("2d");
    var img=document.getElementById("lamp");
    var pat=ctx.createPattern(img,"repeat");
    ctx.rect(0,0,150,100);
    ctx.fillStyle=pat;//  把背景图设置给填充的样式
    ctx.fill();
```

## 3.3 变换（重点）
### 3.3.1 缩放（重点）
+ scale() 方法缩放当前绘图，更大或更小
+ 语法：context.scale(scalewidth,scaleheight)
    * scalewidth  :  缩放当前绘图的宽度 (1=100%, 0.5=50%, 2=200%, 依次类推)
    * scaleheight :  缩放当前绘图的高度 (1=100%, 0.5=50%, 2=200%, etc.)
+注意：缩放的是整个画布，缩放后，继续绘制的图形会被放大或缩小。

### 3.3.2 位移画布（重点）
+ ctx.translate(x,y) 方法重新映射画布上的 (0,0) 位置
+ 参数说明：
   * x：   添加到水平坐标（x）上的值
   * y：   添加到垂直坐标（y）上的值
+ 发生位移后，相当于把画布的0,0坐标 更换到新的x,y的位置，所有绘制的新元素都被影响。
+ 位移画布一般配合缩放和旋转等。

+ 案例： 17位移画布.html

### 3.3.3 旋转（重点）
+ context.rotate(angle); 方法旋转当前的绘图
+ 注意参数是弧度（PI）
+ 如需将角度转换为弧度，请使用 degrees*Math.PI/180 公式进行计算。



## 3.3 绘制环境保存和还原（重要）
+ ctx.save()  保存当前环境的状态
    * 可以把当前绘制环境进行保存到缓存中。
+ ctx.restore()   返回之前保存过的路径状态和属性
    * 获取最近缓存的ctx
+ 一般配合位移画布使用。

## 3.4合成
### 3.4.1  设置绘制环境的透明度（了解）
+ context.globalAlpha=number;
+ number:透明值。必须介于 0.0（完全透明） 与 1.0（不透明） 之间。
+ 设置透明度是全局的透明度的样式。注意是全局的。
### 3.4.2  globalCompositeOperation 
后绘制的图形和先绘制的怎么结合 
   
   + source-over  默认，后者遮挡前部分，并且都可见
   + source-in    两者重叠部分可见，其他部分透明 ,重叠显示的是后绘制的图形  
   + source-atop  先绘制的不受影响，后绘制的图像只显示与先的重叠的部分 
   + source-out   后悔值图形不重叠的部分可见，先绘制的图形不可见 

   + destination-over  后绘制的在下面其他同 source部分
   + destination-in    重叠部分显示，先画的在上面
   + destination-atop  显示先画的重叠部分和后画的部分
   + destination-out   显示先绘制的不重叠部分 

   + lighter     重叠部分颜色合成 
   + copy        后绘制的完全取代与之重叠的图形 
   + xor            异或操作
   
## 3.5 画布限定区域绘制（了解）
+ ctx.clip(); 方法从原始画布中剪切任意形状和尺寸
+ 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）
+ 一般配合绘制环境的保存和还原。

## 3.6 画布保存base64编码内容（重要）
+ 把canvas绘制的内容输出成base64内容。 
+ 语法：canvas.toDataURL(type, encoderOptions);
+ 例如：canvas.toDataURL("image/jpg",1);
+ 参数说明：
    * type，设置输出的类型，比如 image/png   image/jpeg等
    * encoderOptions： 0-1之间的数字，用于标识输出图片的质量，1表示无损压缩，类型为： image/jpeg 或者image/webp才起作用。

```
    案例1：
    var canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL();
    console.log(dataURL);
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
    // blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"

    var img = document.querySelector("#img-demo");//拿到图片的dom对象
    img.src = canvas.toDataURL("image/png");      //将画布的内容给图片标签显示

```


## 3.7 画布渲染画布（重要）
+ context.drawImage(img,x,y);
+ img参数也可以是画布，也就是把一个画布整体的渲染到另外一个画布上。
```
    var canvas1 = document.querySelector('#cavsElem1');
    var canvas2 = document.querySelector('#cavsElem2');
    var ctx1 = canvas1.getContext('2d');
    var ctx2 = canvas2.getContext('2d');
    ctx1.fillRect(20, 20, 40, 40);      //在第一个画布上绘制矩形

    ctx2.drawImage(canvas1, 10, 10);    //将第一个画布整体绘制到第二个画布上

```


## 3.8 了解：线条样式（了解）
+ lineCap     设置或返回线条的结束端点(线头、线冒)样式
    * butt  ：  默认。向线条的每个末端添加平直的边缘。
        -  翻译.：屁股；烟头；笑柄；靶垛；粗大的一端  英 [bʌt]   美 [bʌt]
    * round ：  向线条的每个末端添加圆形线帽。
    * square：  向线条的每个末端添加正方形线帽。      
    <img src="imgs/linecap.png" height="303" width="480" >  
    参考：23线的样式.html
+ lineJoin    设置或返回两条线相交时，所创建的拐角类型
    * bevel:   创建斜角。
        - 翻译. 斜角；斜面；[测] 斜角规  英 ['bev(ə)l]   美 ['bɛvl]
    * round:   创建圆角。
    * miter:   默认。创建尖角         
<img src="imgs/linejoin.png" height="387" width="453" alt="">
    
+ lineWidth   设置或返回当前的线条宽度
+ miterLimit  设置或返回最大斜接长度
    * 意思:  斜接 英 ['maɪtə]  
    * 斜接长度指的是在两条线交汇处内角和外角之间的距离。
    * 一般用默认值：10就可以了。除非需要特别长的尖角时，使用此属性。
<img src="imgs/MiterLimet.png" height="410" width="840" alt="">
    
## 3.9 了解贝塞尔曲线（知道有）
### 3.9.1 绘制一条二次方曲线。
+ 微软的画图板中的曲线的颜色。
+ quadratic：二次方的意思， 英 [kwɒ'drætɪk]   美 [kwɑ'drætɪk]
+ Curve：曲线的意思， 英 [kɜːv]   美 [kɝv]
+ 语法： context.quadraticCurveTo(cpx,cpy,x,y);
+ 参数：
    * cpx：   贝塞尔控制点的 x 坐标
    * cpy：   贝塞尔控制点的 y 坐标
    * x  ：   结束点的 x 坐标
    * y  ：   结束点的 y 坐标      
<img src="imgs/quadraticcurve.gif" height="140" width="258" alt="">
```
    ctx.beginPath();
    ctx.moveTo(20,20);
    //绘制2次方曲线，贝赛尔曲线
    ctx.quadraticCurveTo(20,100,200,20);
    ctx.stroke();
```

### 3.9.2 绘制贝塞尔曲线（知道有）
+ 绘制一条三次贝塞尔曲线
+ 语法：context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
+ 提示：三次贝塞尔曲线需要三个点。前两个点是用于三次贝塞尔计算中的控制点，第三个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点。
+ 参数说明：
    * cp1x：    第一个贝塞尔控制点的 x 坐标
    * cp1y：    第一个贝塞尔控制点的 y 坐标
    * cp2x：    第二个贝塞尔控制点的 x 坐标
    * cp2y：    第二个贝塞尔控制点的 y 坐标
    * x:        结束点的 x 坐标
    * y:        结束点的 y 坐标   
```
//绘制复杂的贝塞尔曲线
ctx.beginPath();
ctx.moveTo(400,400);
//参数说明：context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
// cp1x： 第一个贝塞尔控制点的 x 坐标
// cp1y： 第一个贝塞尔控制点的 y 坐标
// cp2x： 第二个贝塞尔控制点的 x 坐标
// cp2y： 第二个贝塞尔控制点的 y 坐标
// x: 结束点的 x 坐标
// y: 结束点的 y 坐标
ctx.bezierCurveTo(500, 200, 600, 600, 700, 300);
ctx.stroke();  
```
+ 案例：25绘制贝塞尔曲线.html          
<img src="imgs/beziercurve.gif" height="166" width="290" alt="">

## 3.10了解创建两条切线的弧（知道有）
+ 在画布上创建介于当前起点和两个点形成的夹角的切线之间的弧
+ 语法： context.arcTo(x1,y1,x2,y2,r); //类比：css3中的圆角。
+ 例如： ctx.arcTo(240, 100, 240, 110, 40);
+ 参数：
    * x1:  弧的端点1的 x 坐标
    * y1:  弧的端点1的 y 坐标
    * x2:  弧的端点2(终点)的 x 坐标
    * y2:  弧的端点2(终点)的 y 坐标
    * r :  弧的半径   
```
//代码demo：
ctx.beginPath();
ctx.moveTo(100,100);
ctx.lineTo(200,100);
//context.arcTo(x1,y1,x2,y2,r); //类比：css3中的圆角。
ctx.arcTo(240, 100, 240, 110, 40);
ctx.lineTo(240, 300);
ctx.stroke();   
```

<img src="imgs/canvas-arcto-1.png" height="311" width="427" alt="">

## 3.11了解判断点是否在路径中（知道有）
    context.isPointInPath(x,y);
    //isPointInPath() 方法返回 true，如果指定的点位于当前路径中；否则返回 false。
    //判断x,y坐标的点是否在当前的路径中。
## 3.12了解文本宽度计算（知道有）
    context.measureText(text).width;

##  3.13 如果以后做canvas游戏方向开发深入学习可以扩展内以下容：
+ setTransform()  将当前转换重置为单位矩阵。然后运行 transform()
+ transform() 替换绘图的当前转换矩阵
+ globalCompositeOperation    设置或返回新图像如何绘制到已有的图像上
+ 像素操作

# 四、 Canvas开发库封装
## 4.1封装常用的绘制函数
### 4.1.1封装一个矩形
    //思考：我们用到的矩形需要哪些绘制的东西呢？
    1、矩形的 x、y坐标
    2、矩形的宽高
    3、矩形的边框的线条样式、线条宽度
    4、矩形填充的样式
    5、矩形的旋转角度
    6、矩形的缩小放大
    //下面是把上面所有的功能进行封装的代码：
    function ItcastRect( option ) {//矩形构造函数
        this._init(option);
    }
    ItcastRect.prototype = {  //矩形的原型对象
        _init: function( option ) {  //初始化方法
            option = option || {};
            this.x = option.x === 0 ? 0 : option.x || 100;
            this.y = option.y === 0 ? 0 : option.y || 100;
            this.w = option.w || 100;
            this.h = option.h || 100;
            this.angle = option.angle === 0 ? 0 : option.angle || 0;
            this.fillStyle = option.fillStyle || 'silver';
            this.strokeStyle = option.strokeStyle || 'red';
            this.strokeWidth = option.strokeWidth || 4;
            this.scaleX = option.scaleX || 1;
            this.scaleY = option.scaleY || 1;
        },
        render: function( ctx ) {//把矩形渲染到canvas中
            ctx.save();
            ctx.translate( this.x, this.y );//位移画布
            ctx.rotate( this.angle * Math.PI / 180 );//旋转角度
            ctx.scale( this.scaleX, this.scaleY );//缩放
            ctx.fillStyle = this.fillStyle;
            ctx.fillRect( 0, 0, this.w, this.h ); //填充矩形
            ctx.lineWidth = this.strokeWidth;     //线宽
            ctx.strokeStyle = this.strokeStyle;   //填充样式
            ctx.strokeRect( 0,0,this.w,this.h );  //描边样式
            ctx.restore();
        },
        constructor: ItcastRect
    };

+ 4.1.2作业：尝试着封装一个圆形？
```
//封装圆形的代码的答案：不要偷看
function ItcastCircle( option ) {
    this._init( option );
}
ItcastCircle.prototype = {
    _init: function( option ) {
        option = option || {};
        this.x = option.x === 0 ? 0 : option.x || 100;
        this.y = option.y === 0 ? 0 : option.y || 100;
        this.w = option.w || 100;
        this.h = option.h || 100;
        this.angle = option.angle === 0 ? 0 : option.angle || 0;
        this.fillStyle = option.fillStyle || 'silver';
        this.strokeStyle = option.strokeStyle || 'red';
        this.strokeWidth = option.strokeWidth || 4;
        this.scaleX = option.scaleX || 1;
        this.scaleY = option.Y || 1;
        this.opactity = option.opactity || 1;
        this.counterclockwise = 
            option.counterclockwise === true ? true : option.counterclockwise || false;
        this.startAngle = option.startAngle == 0 ? 0 : option.startAngle || 0;
        this.endAngle = option.endAngle == 0 ? 0 : option.endAngle || 0;
        this.startAngle = this.startAngle * Math.PI/180;
        this.endAngle = this.endAngle * Math.PI / 180;
        this.r = option.r || 100;
    },
    render: function( ctx ) {
        ctx.save();
        ctx.translate( this.x, this.y);
        ctx.scale( this.scaleX, this.scaleY );
        ctx.rotate( this.agnle * Math.PI / 180 );
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.moveTo(0, 0);
        ctx.arc( 0, 0, this.r, this.startAngle, this.endAngle, this.counterclockwise);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    },
    constructor: ItcastCircle
};
```

## 4.2 第三方库使用
+ Rgraph vs 百度的echart
```
https://roopons.com.au/wp-content/plugins/viral-optins/js/rgraph/
```
+ 国产的egret引擎
```
 http://www.egret-labs.org/
```
+ 比较火的3d引擎：treejs
```
http://threejs.org/
```
+ Konva
```
官网：http://konvajs.github.io/
    特点：
     * 小巧、使用方便、适合移动端和pc端
     * 支持丰富的事件处理操作
     * 支持类似JQuery的操作方式（顺带能复习jQueyr）
     * 开源，可以随意更改
     * 社区更新比较活跃，github托管源码
     * 性能也不错
```

+ 其他的还有很多，希望以后能用到你们的库。


# 五、Konva的使用快速上手
## 5.1 Konva的整体理念
+ 舞台的概念的引入。整个视图看做是一个舞台 stage
+ 舞台中可以绘制很多个层 layer
+ layer下面可以有很多的group
+ group下面可以有 矩形、图片、其他形状等
+ 参看：快速上手文档---查看翻译文档
```
                  Stage
                    |
             +------+------+
             |             |
           Layer         Layer
             |             |
       +-----+-----+     Shape
       |           |
     Group       Group
       |           |
       +       +---+---+
       |       |       |
    Shape   Group    Shape
               |
               +
               |
             Shape
```

## 5.2 Konva矩形案例
### 5.2.1 创建一个矩形： Konva.Rect(option);
```
    //Konva使用的基本案例
    //第一步：创建舞台
    var stage = new Konva.Stage({
        container: 'container',     //需要存放舞台的Dom容器
        width: window.innerWidth,   //设置全屏
        height: window.innerHeight
    });

    //第二步：创建层
    var layer = new Konva.Layer();  //创建一个层
    stage.add(layer);               //把层添加到舞台

    //第三步： 创建矩形
    var rect = new Konva.Rect({     //创建一个矩形
        x: 100,                     //矩形的x坐标，相对其父容器的坐标
        y: 100,                      
        width: 100,                 //矩形的宽度
        height: 100,                //矩形高度
        fill: 'gold',               //矩形填充的颜色
        stroke: 'navy',             //矩形描边的颜色
        strokeWidth: 4,             //填充宽度
        opactity: .2,               //矩形的透明度
        scale: 1.2,                 //矩形的缩放 1：原来大小
        rotation: 30,               //旋转的角度，是deg不是弧度。
        cornerRadius: 10,           //圆角的大小（像素） 
        id: 'rect1',                //id属性，类似dom的id属性
        name: 'rect',
        draggable: true             //是否可以进行拖拽
    });

    //创建一个组
    var group = new Konva.Group({
        x: 40,      
        y: 40,
    });
    group.add( rect );  //把矩形添加到组中
    
    //第四步： 把形状放到层中
    layer.add( group ); //把组添加到层中
    layer.draw();       //绘制层到舞台上
```


Echart 和 d3都得学



## chapter16 h5脚本编程
### 跨文档消息传递 XDM

具体是postMessage方法  
```js
var iframeWindow  = document.getELementById("myframe").contentWindow;
iframeWindow.postMessage("message","http://www.bai.com");//发送什么，发给谁
```

接受到数据后会触发message事件 
```js
window.addEventListener("message",function(event){
    if(event.origin == "http://www.hei.com"){
        processMessage(event.data);
        event.source.postMessage("receved","http://www.bai.com");
    }
})
```
**没看懂**  

###原生拖放 

####拖放事件    
1. 拖放元素的时候，在被拖放的元素上触发的：  
+ dragstart  按下鼠标开始移动  
+ drag       拖动过程中触发，类似于mousemove会一直触发  
+ dragend    拖动停止（鼠标松开？）
2. 拖进在某个有效的可放置范围内的时候，在这个范围元素上触发
+ dragenter   拖进来了
+ dragover    持续拖动 
+ dragleave 或者 drop    拖出去了或者放下了
#### 自定义放置目标      
在拖动目标通过不能放置的范围时，有特殊的光标，表示不能放置。不支持放置的元素上不会触发drop的  ，可以把任何元素变成可以放置的目标，只需要重写dragenter和dragover事件的默认行为    
```js
var target = document.getElementById("dragtarget");
target.addEventListener("dragenter",function(event){
    event.preventDefault();
});                                                                                                                                   
target.addEventListener("dragover",function(event){
    event.preventDefault();
});    
```
#### 数据交换
dataTransfer对象  setData("MIME","what")    getData("MIME")，这里的mime不是很好的支持，一般填写  text URL这两个字符串    
在dragstart事件中可以设置 
```js
 dragElement.addEventListener("dragstart",function(event){
     event.dataTransfer.setData("text","哈哈哈");//在拖动文本框的时候会自动把里面的文本变成数据
 }) 
 ```
 只有在drop事件才能取得数据    
 ```js 
target.addEventListener("drop",function(event){
    event.dataTransfer.getData("text");//URL
}) 
```
#### dropEffect 与 effectAllowed
dataTransfer可以确定被拖动元素和放置元素可以接受什么操作，有两个属性，dropEffect和effectAllowed ；   
dropEffect在dragenter事件触发的时候设置,可以知道被拖动的元素可执行哪种放置行为,只是改变光标的样子，实现由自己开发     
   + none     不能放置，除文本框外所有元素的默认值 
   + move     放置 
   + copy     复制放置 
   + link     复制打开连接             


effectAllowed属性，在dragstart中设置，和dropEffect配合，表示支持哪种行为  
  + uninitiallized  没设置
  + node
  + copy
  + link
  + move 
  + copylink 
  + copyMove 
  + linkMove  
  + all     

#### 可拖动  
默认图像、连接、文本可拖动，H5添加了draggable 属性 ，布尔值控制拖动 



###媒体元素                                                                                                                                                                                                                                                               ### 历史状态管理      
history対像 

## 错误和调试  
### try-catch 
```js
try{
    //可能导致错误的代码
}catch(error){
     //在错误发生的时候怎么处理
}
``` 
error对象包含一个message属性。   

1. finally  
```js
   try {
            return 4;
        } catch (error) {
            return 1;
        }finally{
           return 7;
        }
```
finally 字句无论如何都会执行，就算存在return语句也不能阻止，当同时存在return语句的时候，会导致前面的return 失效 。finally不存在return的话，漆面的return还是有效的. 但是好像会直接导致   
2. 错误类型 
  + Error    基本类型，主要用于开发人员抛出错误
  + EvalError   没有把eval当做函数调用的时候会出这个错误
  + RangeError  超出范围  
  + RefrenceError 找不到对象  
  + SyntaxError    eval中传入不合适的字符串，语法错误等
  + TypeError    保存类型不符合，对象不存在相应的方法  

  **处理错误**  
  ```js
  try{

  }catch(error){
      if(error instanceof TypeError){

      }else if(errro instanceof ReferenceError){

      }else{

      }
  }
  ```
  对于看不到源码的未知库函数调用这个函数是个不错的选择

  ### throw  
  用于抛出自定义错误，后面可以跟任何东西，  
  在设计一个函数的时候，可以通过if语句配合 typeof、instanceof 来判断传入参数是否满足条件，不满足的话可以抛出一个自己定义的错误。 多用于常用函数的编写   
  ### error 事件  
  只能DOM0方法处理  
  ```js
  window.onerror = function(message,url,line){
      console.log(message);
      return false; //通过返回false可以阻止浏览器的默认行为
  }
  ```  
  图片也支持error事件，并且发生错误的时候表示图片下载停止了  

  ###常见错误类型  
  1. 类型转化错误   
  在  == 、！= 、 if 、while、for等判断语句中，使用费布尔值的时候  
  多用=== 、typeof 、instanceof等转化为布尔值 
  2. 通讯错误  
  查询语句必须用encodeURIComponent();


  ```js
 function addQueryStringArg(url,name,value){
     if(url.indexOf("?")==-1){
         url+=?;
     }else{
         url+=&;
     }
     url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
     return url;
 }
 ```

 ### 错误添加到服务器那里  
 ```js
 function logError(sev,msg){
     var img =  new Image();
     img.src = "log.php?sev"+encodeURIComponent(sev)+"&msg="+encodeURIComponent(msg);
 }
 ```

 用img发送请求很好用  

 

 ###   ie错误 
 1. script一定要直接在body直接子标签上 
 2. 闭包有问题
