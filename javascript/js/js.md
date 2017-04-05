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


range.setStartBefore(relNode);         
range.setStartAfter(relNode);     
range.setEndBefore(relNode2);    
renge.setEndAfter(relNode2);    


包前不包后  
range.setStart(startNode, startOffset);   包含offset      
range.setEnd(endNode, endOffset);       不包含offset

可以选择范围指的是一段代码，并且不是只有标签，当有子节点的时候选择是按照子节点的索引来选择的，子节点没有的话就是按照文本的位来选择了

创建范围后，在dom底层会生成完整的dom结构

+ 操作范围
 - range.deleteContents()    单楚楚范围包含的所有内容
 
