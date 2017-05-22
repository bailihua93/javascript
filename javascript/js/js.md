## 简介
DOM (document object model)：提供访问和操作页面内容的方法和接口 
BOM   浏览器窗口和框架处理； 提供与浏览器交互的方法和接口 ，例如：弹出窗  、移动缩放关闭浏览器 、 navigator 、location 、 屏幕信息/XHR

## HMTL中加载js

###<script> 
```html
<script async defer=“defer” src= "" type="text/javascript"></script>
``` 

defer在ie8后无效
script标签是一个阻塞操作 ；
在js代码中不要出现 \<\/script>字符串 ，需要的话可以转义 ,<\/script>   

js文件的扩展名不是必须的   


文档模式 ：标准模式和混杂模式，没有生命的话，自动混杂模式   


## 3 基本概念  
###语法  
####标识符  
第一个字符是字母 下划线 或者美元符号   
其他是字母 数字 下划线 美元符号 
#### 严格模式
"use strict"   定义了一种不同的解析和执行模型 ，ES3中不明确的行为得到处理   
####语句  
分号不是必须的(得有换行），但是压缩的话一定得有分号,

#### 变量 
松散类型变两个  var message; 每个变量仅是一个占位符  ；  
var操作符定义的变量将成为定义该变量的作用域中的局部变量， 在函数内部省略var操作符，
就变成了全局变量，严格模式下，未经声明的变量赋值会抛出错误

### 数据类型 
Undefined、Null 、Boolean、Number、String 和Object    
#### typeof 操作符
后面的括号不是必须的 typeof name / typeof(name)  相同的   返回的结果是字符串，       
 * undefined  这个值未定义；
 * boolean    布尔值
 * string     字符串
 * number     数值
 * object     这个值是对象、null 、正则表达式
 * function   函数


#### Undefined 类型
声明了对象但是并没有初始化，会自动赋予undefined值，可以显示初始化，没必要  ；    
undefined值的变量和尚未定义的变量还是不一样的，后者只能进行typeof ，其他会报错  

#### Null类型  
null表示一个空对象的指针 ，typeof null 返回的是 object ;    
定义一个变量准备存储对象的时候，可以在定义的时候初始化为null      
undefined 派生自 null  ，  并且 underfined == null，==会转化操作数  

#### Boolean类型  
true和false ；所有的类型的值可以转化成这两个， Boolean(name);   
```
string  非空的字符串true     空字符串"" false    
number  任何非0true         o和NaN false
Object  任何对象true        null false
Undefined  没有true        undefined false
```  

#### Number类型  
八进制以零（0）开头，后面值超过0~7的话，前面的0会被忽略，自动转化为十进制了  
十六进制 以 零x（0x）开头

1. 浮点数值
浮点值中必须包含一个小数点，并且小数点后面必须有一位数字（非0的）   
小数点后面有6个0的时候。  
浮点值最高是17位小数 ，但是算数计算精度远远不如整数，0.1+0.2结果不是0.3，舍入误差   
2. 数值的范围  
Number.MIN_VALUE 和Number.MAX_VALUE  超过这个值得时候，自动转化为正副Infinity的值，   
使用isFinite(result);能够确认是否是在最大小的值之间  
3. NaN  
用于表示一个本来要返回数值操作数未返回熟知的情况，例如任何数值除以0，其他语言报错，js则返回NaN；
NaN与任何值（自身）不相同，任何操作也返回NaN 
isNaN（value）  value不是数值对吗，该函数会尝试Number()自动转化 ，number返回的是NaN的话，最终返回true    
对象调用isNaN（） 会先调用valueOf,
NaN在比较操作符中总返回false
4. 数值转化  
+ Number(value) 转化任何类型；  
    - true转1 false转0；数值转本身；
    - null转0，undefined转NaN。
    - 字符串的话  ： 
       - 空字符串 转为0 
       - 只包含数字的转化成十进制，前面有0也会被忽略 
       - 0x开头的十六进制的转化成对应的十进制
       - 字符串包含数字以外的东西转成  NaN
  * value对象的话先调用valueof再依照上面的转化。 如果valueOf返回的是一个引用类型的值的话，那么就会调用value的toString；如果toString返回的还是引用类型的话，就会报错 ;   原生的对象会先调用toString, 在按照字符串来处理一遍;都是会将得到的基本类型值处理一遍的（但是加法不是遮掩的，加法只进行最初的一次操作，获取到基本类型就停止了）   
  **一元加操作符与该函数相同的操作**
+ parseInt(value)     转化为整数 ,只能操作字符串和数字   
   - 可以识别字符串： 
   第一个非空字符不是数字或者负号的话返回NaN；空字符串返回NaN
   是的话，会截取到最后一个非数字的地方；之后按照数字进行解析 ；
   由于ES3和ES5在处理8进制等问题的时候出现了问题，所以需要在使用parseInt的时候传入第二个参数，表名被解析的是字符串的是什么进制的
   parseInt(value,10)  ,不会四舍五入  
   注意： 传入对象的话，会先调用toString,这个函数返回引用类型的话，那么会调用传入对象的valueof
+ parseFloar(value) 只能解析10进制，忽略0，只有第一个小数点有效，在非数字是截止

#### String类型
 单双引号的意义是相同的
 1. 字符字面量  
 ```
\n 换行  
\t 制表  
\b 退格  
\r 回车  
\\ 斜杠
\'
\"
```
用在字符串里面输出对应的符号的    
字符串中空格也算字符  
2. 特点 
字符串不可变的，改变的话，只是重新引用了一个实例罢了  
3. 转化为字符串
+ toSting() 数字/布尔值/对象/字符串都有这方法（字符串返回的是副本），返回的原样的东西； 数值调用toSting的时候，可以传递一个要输出什么进制字符串的数值。   null和undefined没有这个方法；
+ String(value); 有tostring的调用他，并且不会深层调用，没有的null返回“null”，undefined返回“undefined” ;对象是先toString后valueof
+  +“” 就可以返回字符串了 和Stiring（）相同

####Object类型   
所有类的基类 ，但是DOM和BOM对象属于宿主对象，可能不会继承Object
实例 的属性和方法：
 - constructor  指向构造函数  
 - hasOwnProperty(propertyName)  检查属性是否在实例中存在 传入的是字符串
 - isPrototypeOf(object)      传入对象是不是当前对象的原型  （？）
 - propertyIsEnumerable（propertyname） 传入的属性是否可以用for-in
 - toString()  返回对象的字符串表示  
 - valueOf()   返回对象的字符串、数值、布尔值表示


### 操作符  
js的操作符可以适用于很多值，字符串、数字、布尔、对象；对象先调用ValueOf再调用toString方法 
####一元操作符
1. 自增自减 
前置自增自减和多数情况一样  
后置自增 
```js
var a = 1,
    b;
    b= a++;
//b = a; a= a+1;
``` 
自增运算符是按照Number()函数来转化的非数字信息，然后进行运算的，NaN返回NaN；不管前置还是后置，使用之后，对象会被赋予运算后的值，不在是对象了
```js
// console.log(++"1ab");//报错
var a = "1ad";
console.log(a++); //NaN
```  
自增自减的只能是变量，并且操作后会将转化的值传递给这个变量
2. 一元加减  
Number()函数转化数据 ，之后在进行操作
#### 位操作符 
JS中所有的数据都是64位的，未操作会先将64位转化成32位，之后在转回64位 ，对开发人员来说，64位存储是透明的 就像一直按照32位来操作的一样  
负数存的是补码（绝对值反码+1）   
按位操作  
与&  或| 非～ 异或 ^  
有符号左移<<   有符号右移 >>  
无符号左移<<<   无符号右移 >>>
#### 布尔操作符
1. 非 ！value  返回的一定是 !Boolean(value);   
2. 短路与 &&  返回的值是操作数，判断的时候用布尔值罢了  
   第一个操作数是真（Boolean函数操作后）的时候，返回的是第二个操作数（这里返回的不是布尔值，是操作数）   
   第一个操作数是0、null、NaN、undefined的时候，返回的是第一个操作数 0、null、NaN、undefined    
3. 逻辑或  &&   
   第一个操作数为真的时候返回第一个操作数
   第一个操作数为假的时候返回第二个操作数

#### 乘性操作  
乘* 除/ 求模 %   先用Number函数求得数值  
#### 加减操作
 1. -减法法和前面的相同，先number后操作

 2. +加号操作 
    +  两个操作数都是数字的时候会用加法 ；()
    +  一个是数字的时候，布尔值返回数字， 那么undefined转为NaN，null转为0,对象返回valueof（注意：返回值为字符串数字直接相加或者拼接，返回值布尔/null/define 用Number函数） 原生对象会返回toString的字符串，之后在按照字符串操作
    +  如果，其中一个是字符串，其他任何情况都是使用String()函数，然后拼接字符串 ; 
    + 一个是布尔值，另外的是null  、undefined 、数字的话， 都转化成数字 
    + undefined   undefined、null   相加都是NaN
    + null + null      0  
   
#### 关系操作符
 大于（>） 、小于（<）、大于等于（>=)、小于等于(<=)   返回布尔值 ，当操作数
 - 都是数字的时候，直接比较
 - 都是字符串，比较编码
 - 有一个是数字，另一个Number成数字比较
 - 有一个是布尔值，先转化为数字，在按照一个是数字的比较
 - 有一个是对象，先valueof在按照前面的去比较 
 - 有NaN返回false

最终比较的是数字和字符，数字优先级高

#### 相等操作符
相等（==）不相等（！=）先转换在比较； 全等（===)不全等（！==）先比较不转化


1. 相等不相等操作规则（数字化）
 - 数字直接比较
 - 字符串比较编码
 - 有数子另一个转化成数字（另一个不管是字符串还是布尔值）
 - 布尔值转化数字
 - 一个是对象，另一个不是对象的话，对象用valueof


 - null等于undefined
 - NaN！=NaN
 - 相等性比较多的是偶null和undefined不能进行转化
 - 两个都是对象的话，比较指针是否指向同一个对象  
####条件操作符号 （必定有返回值，最好接收一下）
boolean_expression?true_value:false_value
####赋值操作符 
 var a =10;   
  a+=10;//20

####逗号操作符 
声明多个变量  

赋值的时候逗号返回最后一项   var num=（1,2,3）；//num = 3；
###语句
####if 
直接调用Boolean
#### do - while 
至少执行一次
#### while 
#### for
####for-in 
在使用前先检查对象不是null或者underfined  
之后就可以遍历对象的属性  

####label
```js
label1：for(){
    label2:for(){}
}
```
####break continue
####switch
比较值的时候执行的是全等操作，不会发生类型转化 ；
```js
switch(expression){
    case value1 : statement;break;
    case value2 : statement;break;
    default : statement;break;
}
``` 
想要表达的是expression === value；

js中case的值不一定是常量/可以使变量，甚至表达式  ；但是最终还是要case和expression相等才行   

###函数
 用function来声明函数 

#### 理解参数  
调用函数的时候传入多少个参数都是没有影响的，参数在函数内部是一个类数组arguments存储的，函数接受到的始终都是这个数组   
命名的参数只提供便利，但不是必须的，   
arguments对象length属性返回传入参数的个数，可以通过arguments[index]获取对应的参数  
arguments的值永远与对应的命名参数的值一致，但是内存是独立的，只是值是相同的   
```js
function add(num1,num2){
    arguments[1] =10;
  console.log(num1+num2);
}
add(1,2); //11
add(1); //NaN
```
上面的函数传入两个实参的话，第二个参数始终会被改为10的   
arguments的长度始终由实参决定的 ，不可修改数量，即使手动修改，也不会映射到对应的形参上   
没有传值的形参会自动给赋予underfined；  

函数参数传递的永远是数值传递   

####没有重载 
按照后定义的函数进行运算  ; 如果是函数声明的话，会提前编译，所以即使在两个定义之间执行也是按照后定义的执行的  
未指定返回值的函数其实是返回一个undefined 的

##4 变量、作用域、内存
###基本类型了引用类型  
基本类型： 简单的数据段  、 Undefined、Boolean、Number、string、Null等类型，按值访问的是    
引用类型： 多个值构成的对象  js不允许访问内存中的位置，也就是不能操作对象内存的空间，实际操作对象的时候操作的是对象的引用  ；js认为字符串不是对象 ,数组也是引用类型  
#### 只能给引用类型的值添加属性 
只有对象可以添加属性，基本类型添加了，下次访问的时候也访问不到的  
#### 变量的赋值  
赋值操作的时候，基本类型的值赋值操作是独立的，只是将值传递了出去；引用类型的会将指针传递出去，两个变量实际是指向同一个元素的
####  函数传递参数  
向参数传递基本类型的值的时候，被传递的值会被复制给一个局部变量（形参，或者叫arguments的项）  
传递引用数据类型的时候，被传递的是这个值在内存中的地址传递过去，值得变化会反应在外部  
#### instanceof  
检测引用数据类型的时候，如果变量是给定的引用类型（根据原型链来识别）的实例，会返回true    
variable instanceof constructor  
使用instanceof检测基本类型的话，会返回false     
注意： 当数据是跨框架的话，instanceof会失效
### 执行环境和作用域
执行环境定义了变量或者函数有权访问的其他数据 ，每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都会保存在这对象中    

**作用域链**：保证对执行环境有权访问的所有变量和函数的有序访问；前端始终是但钱执行的代码所在环境的变量，如果这个环境是函数，其活动对象将作为变量对象，活动对象最初只包含一个变量，即arguments；下一个变量对象来自包含环境的，在下一个变量来自下一个包含环境，最外层为全局执行环境  

```js
var color = "blue";

//优先局部变量
function show2(){
    var color = “blue”；
    console.log(color);
}
show2();//blue

//也可以访问全局变量
function show1(){
    color = "red";
    console.log(color)
    };
show1();//red
console.log(color);//red


function show3(color){
    console.log(color);
}
show3();//undefined

function show4(color){
    console.log(window.color);//只有这样可以访问到全局的变量
}

```  
延长作用域链条 try-catch 和with


####声明变量   
- var声明会把变量添加到最近的环境中,所有的声明在文件加载的时候都会提前，但是初始化会留在原地
- 同一个变量名重复声明没有影响，只在加载的时候用到一次，之后就按各种赋值操作处理就行了     
- 初始化变量没有使用var的话，该变量就会自动添加到全局变量，这个过程并没有声明发生，只是进行了初始化，
在初始化前的任何操作都会报错，并且如果是存在函数中的话，只能等函数执行之后才能初始化完毕
- 当局部变量优先与全局变量使用的时候，可以使用 window.variaty 来访问全局变量

####垃圾收集 
标记清除和引用计数方法  
不用的数据，最好将其值设置为null，来解除引用




##第5章 引用类型  
引用类型：是一种数据结果，将数据和功能组织绑定在一起 ； 对象的定义、类 
对象 ： 引用类型的实例   


### Object类型

所有类的基类 ，但是DOM和BOM对象属于宿主对象，可能不会继承Object
实例的属性和方法：
 - constructor  指向构造函数  
 - hasOwnProperty(propertyName)  检查属性是否在实例中存在 传入的是字符串
 - isPrototypeOf(object)      传入对象是不是当前对象的原型  （？）
 - propertyIsEnumerable（propertyname） 传入的属性是否可以用for-in
 - toString()  返回对象的字符串表示，原生返回的是[object Constructor]
 - valueOf()   返回对象的字符串、数值、布尔值表示,console.log 貌似会调用这个方法;**原生返回的好像是本身**
1. 创建object 
```js
//直接用类创建，不推荐
var obj = new Object();
obj.name = “白” ;


//字面量形式  属性可以是任何数据，只是最后会自动转化为string，并且字面量方法运算更快，并且不会调用OBject的构造函数，当然也可以额外添加属性
var person = {
    name : "bai",
    age : 29,
    4: 4,
    "hello":"hello"
};
person.gg ="1cm";
```
字面量形式，是一种很好的传递大量参数的方法（最好是必须的参数使用命名参数，字面量来封装可选参数） 

2. 访问  
+ 访问属性名    for(item in object){}  中item就是属性名字


+ 访问属性值
    - 点方法。 对象可以通过 对象名.属性名  的方法来访问属性的值，但是这里属性名是明确的，不能是变量和奇怪的形式，多数用这个就够了

    - 方括号法   对象名[属性名]   这里的属性名必须是字符串形式，并且可以接受变量   

```js
for(item in person){
    console.log(item);
    console.log(person[item]); //争取的访问
    console.log(person.item); //这里是错误的，什么也访问不到
}

person["hello  bai"]; //只能方括号访问

```



### Array 类型  
有序的列表，但是JS中可以存储任何类型的数据，并且长度可以自动调整  
1.定义数组 

```js
 var color = new Array();//创建数组
 var colors = new Array(20)；//创建包含20项的数组，里面的值都是undefined
 //任何没有初始化的项都会用undefined填充的  
 var name = new Array("gred");//创建一项的数组
 //创建数组不加new也是合理的  
 var name = Array(20);


 //方括号语法定义 ，这种也不会调用Array的构造函数
  var colors = ["red","blue"];
  var colors = [];
  var number = [1,2,]; //不推荐，因为ie8会解析成3项，现代浏览器会解析成两项，最后一个逗号为空的话，不会计入数据的
  var number = [,,,,,];//五项或者六项  
```

2. 访问
通过方括号索引值访问  
```js
var num = [1,2];
num[0] ;//1 
num[10];//undefined;这时长度会自动加到索引+1；并将其中的项都变成undefined
```

array.length是可读写的 ，写入的话是调整数组的长度,小于现有长度的话，会发生裁剪，后面的项都就不见了；大于的话，自动扩充数组的项目 

array[array.length]= value  可以不停地为数组添加项

3. 检测  
array instanceof Array;  //在一个全局环境下可以这么检测
Array.isArray(array); //一种没有限制的方法 

4. 转换方法    
array.toString()  会返回每一项的字符串形式，并拼接成以逗号分割的字符串，每一项的字符串是由自身的toString方法来的  
array.valueOf()   会返回数组本身,完完全全是同一个对象啊   
array.jion(value)  以value为分隔符将数组拼接成字符串

5. 栈和队列
+ 栈方法
  * array.push(value)   将数据加入数组末尾，同时返回推入了多少项  
  * array.pop()    将最后一个数据取出 


+ 队列方法 
  * array.unshift(value) 将数值放入开头   
  * array.shift()        取出开头的数据  

```js
var a = [];
a.push(1,2,3);//[1,2,3]
a.push(4);   //[1,2,3,4]
a.unshift(7,8,9); //[7,8,9,1,2,3,4]
```
6. 重排列     
array.reverse();  //返回转化后的数组本身
array.sort(fn)；传入的函数 ，返回排序后的数组本身
```js
function fn(value1,value2){
    if(条件){
        return 1 ；//返回正数交换顺序
    }else if(条件){
      return -1 ；返回负数不变
    }else{
        return 0；返回0也不变
    }
}
```
7. 操作方法  
 * var c = arr1.concat(arr2,arr3)   concat首先复制出一个新数组，然后将其他的数组或者值添加到末尾，如果没有穿入值，就是返回的克隆体，原数组不变的是    
 * slice方法，基于当前数组截取处一个新的数组，原数组不变，可以接收一个或者两个参数，表示截取的起止位置（
    - 一个的话到结尾，两个的话包头不包尾
    - 传入负数的话，用长度加上该数字，得到正数，
    - 结束位置小于起始位会返回空数组
   
   Array.prototype.slice.call(arguments);可以把类数组转化为数组
 * splice(index,count[,insert]) 原数组改变

array.splice(start)    从 array[start] 开始删除，后面全删
array.splice(start, deleteCount)       从 array[start] 开始删除，总共删deleteCount项
array.splice(start, deleteCount, item1, item2, ...)   从 array[start] 开始删除，总共删deleteCount项，并将值插入到array[start]

```js
var a =[1,2,3,4,5];
var c = a.splice(2);  // 在原数组上改变，a [1,2]  c [3,4,5]
var c = a.splice(2,1);  // 在原数组上改变，a [1,2,4,5]  c [3]
var c = a.splice(2,1,6);  // 在原数组上改变，a [1,2,6,4,5]  c [3]
```

8. 位置方法 （IE9）

* array.indexOf(value[,index])   要找的项value在array中的第几项， 可传入的index表示从哪一项开始找，下一次的时候就得从找到项+1处开始了
* array.lastIndexOf(value[,index])  只是方向不同罢了，从后向前找，返回的 位置还是正常的位置  

没找到返回 -1  

9. 迭代方法  

 - every 每一项都返回true，则该函数返回true
 - some  有一项返回true，该函数返回true
 - filter 返回true的项，数组内的项组成一个新的数组返回
 - map    每一项的返回值，返回，组成一个数组
 - forEach 便利每一项，操作，不返回值，
```js
var array1 = [1,2,3,4,5,6];

var everyResult = array1.every(function(item,index,array){
    return item;
});
var someResult = array1.some(function(item,index,array){
    return item;
});

var filterResult = array1.filter(function(item,index,array){
    return item;
});
var mapResult = array1.map(function(item,index,array){
    return item;
});
 array1.forEach(function(item,index,array){
     process(item);
});

```

10. 归并方法
reduce和reduceRight，遍历并操作每一项，操作函数返回值将作为下一项执行函数中的prev，然后重复此过程，就是省了一个记录结果并迭代的全局变量 ，接受两个参数，操作函数和初始的作为prev的值；没有传入的话，就从第二项开始了，所以最好传入一下 

```js
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev,cur,index,array){
    return prev+cur*2;
},0);
console.log(sum);
```

###Date类型  
```js
var now = new Date(); //不传参数的话获取的是当前的时间；
//想要根据特定的日期和时间创建日期对象，需要传入该日期的毫秒数
```
1. Date.parse(string);   
解析特定的字符串为毫秒数，然后传入构造函数就行了，直接把string传递给构造函数后台也会调用Date.parse的 即  
new Date(string)  和 new Date(Date.parse(string))是一样的 ；string支持的格式  ：      
   -  “月日年”   6/13/2004
   - “英文月  日 年”    January  12，2004
   - "英文星期几 英文月 日 年 时 分 秒 时区"     Tue May 25 2004 00：00：00  GMT-0700
   -  YYYY-MM_DDTHH:mm:ss.sssZ               2004-05-25T18:00:00      ES5才行  


2. Date.UTC();
基于本地时间的，传入数字参数  ：
   - 年  
   - 0~11 的月
   - 1~31 的日
   - 0~23 的时
   - 分
   - 秒

   同样new Date(num,num)与new Date(Date.UTC(num,num)) 相同    
   Date.UTC(2004,1,31,11,11,11);   


传入字符串按照parse处理，传入数字，按照UTC处理 

3. Date.now()  ES5 
返回当前时间的毫秒数，可以用来计算耗时问题    
+new Date()   正号也可以获取当前毫秒数
4. toString /toLocalString 返回时间，没一点用；  valueof 返回毫秒数 
5. 格式化成字符 
toUTCString() 传入参数来格式化时间为 字符串  等价函数 toGMTString（） 后者兼容性号

6. 常见方法  
  -  getTime     等价valueOf
  -  setTime     设置毫秒数，会改变日期，不用直接初始化就传入秒了
  还有一大堆  


7. UTC时间  
没有时区偏差的情况下的时间，本初子午线上的时间，北京比他早8小时

### RegExp类型 
正则表达式
```js
var partern1 = /partern/flags;
var partern2 = new RegExp(pattern,flag)
```
使用字面量和使用构造函数在ES3中，字面量是共享一个RegExp实例（实例属性不会重置），而构造函数会重建每一个； Es5规定，字面两每次都会重新创建
1. partern 里面可以写什么  
+  范围
   - abg;   查找字符串中所有ab的实例 
   - [abc]d 查找abc中的一个，与组成d的字符串的实例
   - [^abc] 查找不包含abc中任意一个字符的字符串 
   - [0-9]  0~9之间的任意一个数字 
   - [a-z] 
   - [A-z]
   - [A-Z] 
   - （red|blue|grean） 包含其中之一的
+ 元字符
   -  .  任意字符
   -  \w 任意字母
   -  \W   非字母
   -  \d 数字
   -  \D 非数字
   -  \s  空白符
   -  \b  单词边界  
   -  \0  null
   -   \n 换行
   - 必须要转义的字符  ([{\/^$|?*+.}])
+ 量词 
   - n+ 至少一个
   - n* 任意个
   - n？ 0或1个
   - n{x} x个
   - n{x,y} x~y个之间
   - n{x,}  至少x个
   - n$  以n结尾
   - ^n  以n开头
   - ？=n  后面紧跟着n
   - ？！n 后面不是n

2. flag
 - g 全局模式，表示应用与所有字符串，并非发现的第一个 ；不添加这个的话，只匹配第一个
 - i 不区分大小写
 - m  partter为字符串的话省略这个； 跨行


3. 捕获组 
+ (exppression) 作为整体的正则式的一部分，返回其中匹配的项目，方便之后调用其内容   


+ 命名
如果没有显式为捕获组命名，即没有使用命名捕获组，那么需要按数字顺序来访问所有捕获组。在只有普通捕获组的情况下，捕获组的编号是按照“(”出现的顺序，从左到右，从1开始进行编号的 。


命名捕获组通过显式命名，可以通过组名方便的访问到指定的组，而不需要去一个个的数编号，同时避免了在正则表达式扩展过程中，捕获组的增加或减少对引用结果导致的不可控。不过容易忽略的是，命名捕获组也参与了编号的，在只有命名捕获组的情况下，捕获组的编号也是按照“(”出现的顺序，从左到右，从1开始进行编号的 。（js不可用）

混合方式的捕获组编号，首先按照普通捕获组中“(”出现的先后顺序，从左到右，从1开始进行编号，当普通捕获组编号完成后，再按命名捕获组中“(”出现的先后顺序，从左到右，接着普通捕获组的编号值继续进行编号。

+ 引用 
 在Replace中引用，通常是通过$number方式引用。
举例：替换掉html标签中的属性。
```html
<textarea id="result" rows="10" cols="100"></textarea> 

<script type="text/javascript"> 

var data = "<table id=\"test\"><tr class=\"light\"><td> test </td></tr></table>";

var reg = /<([a-z]+)[^>]*>/ig;

document.getElementById("result").value = data.replace(reg, "<$1>");

</script>

//输出

<table><tr><td> test </td></tr></table>
```



在匹配时的引用，通常通过RegExp.$number方式引用。

```html
    <textarea id="result" rows="10" cols="100"></textarea>   
    <script type="text/javascript">   
    var data = [' <img alt="" border="0" name="g6-o44-1" onload="DrawImage" src="/bmp/foo1.jpg" />', ' <img src="/bmp/foo2.jpg" alt="" border="0" name="g6-o44-2" onload="DrawImage" />'] ;  
    var reg = /<img\b(?=(?:(?!name=).)*name=(['"]?)([^'"\s>]+)\1)(?:(?!src=).)*src=(['"]?)([^'"\s>]+)\3[^>]*>/i;  
    for(var i=0;i<data.length;i++)  
    {  
        var s = data[i];  
        document.getElementById("result").value += "源字符串：" + s + "\n";  
        document.write("<br />");  
        if(reg.test(s))  
        {  
            document.getElementById("result").value += "name: " + RegExp.$2 + "\n";  
            document.getElementById("result").value += "src: " + RegExp.$4 + "\n";  
        }  
    }  
    </script>  
```



<a href = "http://blog.csdn.net/lxcnn/article/details/4146148">捕获组详解</a>
   
4. RegExp实例的属性
  - global 是否设置了g标志
  - ignoreCase 是否设置了i标志
  - multiling 是否设置了m
  - lastIndex 下一次开始搜索的时候起始位置 从0 算起
  - source    字面量中的pattern 返回的是字符串，不是构造函数传入的那种




5. 实例的方法 

+ exec()  用于确认目标位置和匹配的项，返回结果
   * var matches = pattern.exec(text); 
      结果是就是matches ，每次只能返回匹配到的一个结果 ，只有pattern设置了g在调用的时候才会按照原来的lastIndex来继续搜索           
   * matches[index]  返回第一次匹配到的位置  
   * matches[input]  返回传入的字符串 text
   * matches[0]   整体匹配到的东西
   * matches[n]   第n捕获组捕获 的东西 
+ test()   确认字符串是否存在    
  if(pattern.test(text)){}  


 7. RegExp构造函数属性  
```js
 if(patter.test(text)){
    process(RegExp.input)             //传入的内容也就是Text          RegExp.$_
    process(RegExp.lastParen)         //最近一次匹配捕获组      写成   RegExp.$1   RegExp.$2 没有$0
    process(RegExp.lastMatch)         // 最近的一次匹配项             RegExp[$&] 非法字符，只能方括号访问
    process(RegExp.leftContext)       // 匹配项左侧内容
    process(RegExp.rightContext)      //最后一次匹配项右侧内容
    process(RegExp.multiline)
 }

```
8. 字符串的方法
+ matches
```js
var text = "cat,bat,sat";
var pattern = /.(at)/g;
var matches = text.match(pattern);
//pattern没有g的时候 ,matches[index]=0;matches[0]=cat;matches[1]=at;matches[input]=text;pattern.lastIndex=0;
//pattern 设置了g的时候，matches就变成了所有匹配项的结果组成的数组，很奇特的设定
```

+ search
```js
var matches = text.search(pattern);
console.log(RegExp.lastMatch);
console.log(RegExp.$1);
```
对应的test,自身返回获取到的第一次匹配的位置



+ str.replace(regexp|substr, newSubstr|function)  
   * 传入的第一个参数是正则表达式（没有设置g）或者字符串的话，只会替换第一个匹配到的东西    
   第一个参数是设定了g的正则表达式，那就会替换所有匹配项   
   * 第二个参数是字符串的话还可以添加写匹配项的信息进去； $&等于RegExp.lastMatch    $'等于 RegExp.leftContext  $`等于 RegExp.rightContext    $n $nn  第n个捕获组内容 
   * 第二个参数是函数的话，会提供更加精细的操作，函数其前几个参数是 匹配项和捕获组，最后两项是匹配的位置和原始字符串  

```js
result = text.replacc(/.at/g,"word$1") ; //结果就是wordcat，worldbat，wordsat

 result = text.replace(pattern,function(match,$1,pos,input){
    switch(match){
        case "cat": return "hello";
        case "bat": return "bai";
        case "sat": return "mr";
       
    }
});

```

9. 字符串位置方法   
var pos = str1.indexOf(str2[,index]);    
var c = str1.lastIndexOf(str2[,index]);   
返回对应字符串的位置，并且，可以传递一个参数，用来指定从那个位置开始向后（前）找；

通过不断地 str.indexOf(st,pos+st.length) 就可以找到所有的位置了




10. 继承的方法 
 toString toLocalString 返回正则表达式的字面量    
 valueOf 返回 expression本身


### Function  


**函数是对象，函数名是指向对象的指针**

1. 定义  

```js
 function sum(){}
 var del = function(){};
 var sel = new Function(num1,num2,return num1+num2)
```
2. 没有重载
按照后定义的函数进行运算  ; 如果是函数声明的话，会提前编译，所以即使在两个定义之间执行也是按照后定义的执行的  
未指定返回值的函数其实是返回一个undefined 的

```js
 fn()
 var fn = function(){
     console.log("fn1");
 }

 fn();

 function fn(){
     console.log("fn2")
 }
 function fn(){
     console.log("fn3")
 }
 
 //结果fn3 fn1
 ```
3.  理解参数  
调用函数的时候传入多少个参数都是没有影响的，参数在函数内部是一个类数组arguments存储的，函数接受到的始终都是这个数组   
命名的参数只提供便利，但不是必须的，   
arguments对象length属性返回传入参数的个数，可以通过arguments[index]获取对应的参数  
arguments的值永远与对应的命名参数的值一致，但是内存是独立的，只是值是相同的   
```js
function add(num1,num2){
    arguments[1] =10;
  console.log(num1+num2);
}
add(1,2); //11
add(1); //NaN
```
上面的函数传入两个实参的话，第二个参数始终会被改为10的   
arguments的长度始终由实参决定的 ，不可修改数量，即使手动修改，也不会映射到对应的形参上   
没有传值的形参会自动给赋予underfined；  

函数参数传递的永远是数值传递   


4. 作为值传递的函数 （闭包相关的技术啊）
当需要一个函数的时候，可以用闭包传递出来的函数，这样还能多做些东西呢，并且，这个返回函数有些值还是可控的 ；例如sort函数需要传入的比较函数可以这么写
```js
function createCompareFunction(property){
    return function(object1,object2){
        var v1= object1.property;
        var v2 = object2.property;
        if(v1<v2){
            return -1;
        }else if(v1>v2){
            return 1;

        }else{
            return 0;
        }
    }
}
```

5. arguments(下面的这些严格模式下出错)
+ arguments 包含函数中传入的所有参数，伪数组，Array.prototype.slice.call(arguments)可以给转化成数组    
  arguments.callee   指向arguments的拥有函数，函数内部调用自己的时候，可以用来解耦合   
6.  this   
 引用函数运行时候的环境对象，  函数的调用者  
 函数名字只是一个指着  say  和  obj.say 值得是同一个函数  ；只有say()和obj.say() 才是不同的，这一点，可以在函数绑定那节的内容看出来，函数的调用者，并不一定是函数开起来的引用者的样子  

7. caller 
  保存着调用但钱函数的函数的引用  ，更加松散的方式，arguments.callee.caller
8. length 属性，返回函数期望收到参数的个数  


9. prototype  
   + 保存ECMAScript5中所有引用类型的实例的方法，Es5中prototype下的属性无法枚举

10. call和apply 
+  使用   
function.call(thisArg, arg1, arg2, ...)    thisArg问对象，也就是要指定的环境变量，必须的是，null和undefined将转化为全局变量   
fun.apply(thisArg, [argsArray])           
区别，接受的参数形式不同，call接收单个的参数，apply接受数组或者伪数组，因此首先可以用来改变函数的参数的形式，（函数科林化）  

+ 作用  
   - 传递参数，改变参数的形式，在函数中调用其他函数  ；函数柯林化
   - 改变函数的运行的环境变量（作用域）    ； 对象不用与函数耦合了




### 基本包装类型 

* 基本类型访问和操作的过程  
```js
var s1 = "string";
var s2 = s1.substring(2);

// 当读取到一个基本类型的时候，后台就会创建一个对应的基本包装类型对象，从而进行操作；以上面为例子
// 第一行还是基本类型 ，第二行访问s1的时候，访问过程处于一种读取模式，也就是从内存中访问这个值，而读取模式就会
// 创建String类型的一个实例
//在实例上调用指定方法
//销毁实例
//即：
var temp = new String(s1);
var s2 = temp.substring(2);
temp = null;
``` 


* 引用类型和基本包装类型的区别就是对象的生存期，new 的引用类型对象会一直到离开当前作用域，而基本包装类型则是在代码执行的一瞬间

```js
var a = "a";
var b =a;
var a = "C";
```  
a b 是独立的变量，但是常量是只有一个的，这个常量不会变，只是会变的只有变量映射的方法和位置


```js
var s = "s";
s.name = "hello";
console.log(s.name);
```
第二行添加属性没有错，但是并不是添加到了s上，而是添加到基本包装类型的实例上了，执行的时候这个实例就销毁了，没一次执行都会重建和销毁；


* 基本包装类型  new操作得到的是引用类型了就；  


####Boolean类型

```js
var b = new Boolean(0);
console.log(b.toString());  “false”
console.log(b.valueOf());  false
//传入任何值，然后返回的是对应的东西 但是  
var c = "a";
var d = b&&c; //返回的是c的值，因为对象会Boolean成true
```

最好永远不要用Boolean

#### Number
 
1. 方法
  + toString([number])   可以传入一个数字，然后返回对应进制的数字的字符串   
  + toFix(number)   按照指定的小数位进行返回值的字符串，会四舍五入0~20位；ie8在传入0时。{（-0.94，-0.5]],[0.5,0.94)]}返回0   
  + toExponential(number)  指定科学计数法的e值  
  + toPrecision(numbe)    自己选择最好的总共显示number位数字的方法返回数字  1~21位

2. 不要用显示的方法


####String类型 

1. length 
返回字符串包含多少字符，是按照字符来算的，不是按照字节，汉子也算一个字符，空格也算一个字符,tab是三个字符  

2. 字符方法 
 + string.charAt(index)  返回index位置处的字符
 + string.charCodeAt(index)   返回字符编码
 + string[index]   IE8和以上支持 和charAt相同
3. 字符串操作方法  
  + var st = st1.concat(st2[,str3,str4]);   拼接出新的字符串，源字符串不变      推荐用加号+


  + var st = st1.slice(index[,index])   截取的起止位置，从0开始； 负数加长度, 前大后小返回空
  + var st = st1.substring(index[,index])   截取的起止位置    ；   负数都转0（小在前大在后）
  + var st = st1.substr(index[,number])   截取的起位置和返回多少字符串  负数，第一个参数加长度，第二个转0（空串）


4. 字符串位置方法   
var pos = str1.indexOf(str2[,index]);    
var c = str1.lastIndexOf(str2[,index]);   
返回对应字符串的位置，并且，可以传递一个参数，用来指定从那个位置开始向后（前）找；

通过不断地 str.indexOf(st,pos+st.length) 就可以找到所有的位置了

5. trim()
var st = str.trim() ;返回一个删除了前置和后置空格的字符串，源字符串不变 
6. toLowerCase/toUpperCase/toLocalLowerCase/toLocalUppercase   转大小写
7. 字符串的模式匹配法  

+ matches
```js
var text = "cat,bat,sat";
var pattern = /.(at)/g;
var matches = text.match(pattern);
//pattern没有g的时候 ,matches[index]=0;matches[0]=cat;matches[1]=at;matches[input]=text;pattern.lastIndex=0;
//pattern 设置了g的时候，matches就变成了所有匹配项的结果组成的数组，很奇特的设定
```

+ search
```js
var matches = text.search(pattern);
console.log(RegExp.lastMatch);
console.log(RegExp.$1);
```
对应的test,自身返回获取到的第一次匹配的位置



+ str.replace(regexp|substr, newSubstr|function)  
   * 传入的第一个参数是正则表达式（没有设置g）或者字符串的话，只会替换第一个匹配到的东西    
   第一个参数是设定了g的正则表达式，那就会替换所有匹配项   
   * 第二个参数是字符串的话还可以添加写匹配项的信息进去； $&等于RegExp.lastMatch    $'等于 RegExp.leftContext  $`等于 RegExp.rightContext    $n $nn  第n个捕获组内容 
   * 第二个参数是函数的话，会提供更加精细的操作，函数其前几个参数是 匹配项和捕获组，最后两项是匹配的位置和原始字符串  

```js
result = text.replacc(/.at/g,"word$1") ; //结果就是wordcat，worldbat，wordsat

 result = text.replace(pattern,function(match,$1,pos,input){
    switch(match){
        case "cat": return "hello";
        case "bat": return "bai";
        case "sat": return "mr";
       
    }
});

```
8. 字符串转化成数组  str.split([separator[, limit]])    
不传入参数的话整体作为数组的第一项   
传入第一个参数可以是字符串也可以是RegExp ，用于指定分割符号  
传入的二个参数会限制字符串的长度   

```js
var val1 = text.split(",")；//[cat,bat,sat]
var val2 = text.split(",",2); //[cat,bat]
var val3 = text.split(/[^\,]+/);//[",",",",","]
```
9. str1.localeCompare(str2)  比较str1和str2  str1>str2 返回 1（字母表靠后）； str1< str2 返回 -1（字母表靠前）; str1=str2 返回01（字母表相同）   
10. var str = String.fromCharCode(104,101,108,108,111)  //hello 与  charCodeAt相反



###单体内置对象  
在JS程序执行前就存在的对象  
#### Global对象  
浏览器中的window什么的，isNaN() parseInt()等都是他的方法  
1. URI编码方法 
 * encodeURI(URI)用于整个URI（http://www.baidu.com?hah）；不会对本身属于url的特殊字符编码,像是冒号 正斜杠 问好 井号，空格会被处理
 * encodeURIComponent() 用于部分编码，表单处理那里   对任何非标准字符进行编码  
 * decodeURI
 * decodeURIComponent

2. eval(str)
 就像完整的js解析器，会把str解析成js并插入到所在位置，与所在环境有相同的作用于连，只有eval执行的时候，其中的代码才会被创建    
 多用于代码注入   
3. window 
浏览器中，Global是window的一部分 
####Math  
1. 属性 
Math.E  e; Math.LN10 10的自然对数;Math.PI   π 
2. max(num1,num2,num3) 和 min()  
如果是一个数组的话   Math.max.apply(Math,array);传入的对象必须是Math

3. 舍入方法
Math.ceil(num) 向上进位成整数，直接进的 。只要有数字就进，不在乎是不是小数第一位
Math.floor(num) 向下舍入成整数
Math.round(num) 四舍五入为整数
4. Math.random()  0<=x<1    
与Math.floor和倍数相乘可以构造任何范围 

5. Math.abs()  Math.sqrt()   Math.pow()


##面向对象  
```js
var person = new Object();
//字面量创建对象是最常用的方式
var person = {
  name : "weichuanzhang",
  age : 29,
  job :"software",
  sysName : function(){
    alert(this.name);
  }
}
```
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

访问器属性不能直接定义，必须使用Object.defineProperty();也是就是只能通过该方法来定义这个属性，属性的返回值什么的都是自己方法定义的
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


####Object.getOwnPropertyDescriptior(object,"year") 获取属性

### 创建对象   
字面量缺点，使用同一个接口创建很多对象，会产生大量重复代码；因此人们开始使用工厂模式的一种变体 
#### 工厂模式  
js无法创建类 ,所以每次在函数内部创建新对象，并返回
```js
function createPerson(name,age,job,fn){
    var  0 = new Object();
    o.name = name;
    o.age =age;
    o.job = job;
    o.fn = fn;
    o.sayHi = function(){
        console.log("hi");
    }；
    return o;
}
function haha(){}
var person1 = createPerson("bai",24,"nothing",haha);
```



####构造函数模式

```js
function Person(name,age,job){
   
    this.name = name;
    this.age =age;
    this.job = job;
    this.sayHi = function(){
        console.log("hi");
    }
}
var person1 =new Person("bai",24,"nothing");

```
1. 特点
* 构造函数名大写  
* new : 创建一个新对象；将构造函数的作用域赋给新对象（this指向新对象）；执行代码（新对象添加属性）； 返回新对象  
* 实例中有个constructor属性指向构造函数；    
* 构造函数，可以将实例标示为一种类型，instancef  Object.prototype.toString.call 可以检测
2. 使用 
```js
var person = new Person("bai",18);
person.sayHi(); //new创建的this是new的，所以属性添加到新对象上了 


Person("he",18);
window.sayHi();//直接调用，this指向window

var o = new Object();
Person.call(o,"lan",18);
o.sayhi();//通过call改变this指向
```


2. 存在问题  
函数是对象，则每次新建一个实例，作为实例的方法都会重新创建一个匿名函数对象； 但是这些方法的功能是不变的，因此，并不需要每次创建,改进  
```js
function Person(name,age,job){
   
    this.name = name;
    this.age =age;
    this.job = job;
    this.sayHi = sayHi;
}
function sayHi(){
        console.log("hi");
    }
}
var person = new Person("bai");

```
把函数定义到外面就会破坏封装性，并且为了添加进去，定义很多全局变量也不好  

#### 原型模式 
每个函数都有一个prototype属性，指向一个对象（原型对象），可以用来包含可以由特定类型的所有实例共享的属性和方法    
1. 原型对象  
没创建一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，属性指向原型对象；

默认情况下，原型对象，会有自动获得一个constructor属性，指向拥有这个prototype属性的函数， 通过这个构造函数，我们才可以继续为原型对象添加其他属性和方法（？？？）;constructor作用是什么  

创建的自定义的构造函数后，其原型对象默认只会取得constructor属性，其他方法是从Object继承来的；   

构造函数创建的新实例内部，有个内部属性[[Prototype]]指向构造函数的原型对象;有些浏览器，实例的__proto__属性指向了原型对象(IE没有)  

Person.prototype.isPrototypeOf(person);     

Object.getProtoTypeOf(person)  会返回[[Prototype]] 指向的原型对象，也就是Person.prototype;ES5可用 ；这个在原型实现继承中很重要 （IE9+）  

代码读取对象的属性： 首先搜索这个对象本身有没有这个属性，有的话返回该属性；没有的话，沿着指针搜索原型对象中有没有，有的话就返回  

constructor也是共享的，也就可以直接通过实例搜索到其构造函数     

虽然实例可以访问原型对象中的值，但是不能直接重写原型对象中的属性；重写只会是给实例本身添加了个同名属性，然后按照先实例后原型的原则，导致直接回复的是实例本身的属性了  

delete可以删除实例中的属性，从而是我们的屏蔽了的原型中的属性，可以重新访问    

hasOwnProoperty()可以检测一个属性是否是实例自己的属性，（原型中的属性的话，就会返回false）

Object.getOwnPropertyDescriptor() 只能返回实例属性　　  

2. 原型和ｉｎ
* 单独使用in的时候，能访问的属性都会返回true ,不论属性来自本身还是原型；通过hasOwnProperty合作，可以确认属性来源　　
```js
function hasPrototypePeoperty(object,name){
    return !object.hasOwnProperty(name)&&(name in object);
}
```
* for-in 　　会列出所有可以枚举的元素，不论来自原型还是实例本身，因此与for-in 合作的时候最好检测下是否是自身的属性，在进行操作　　　　　
Object.keys(obj);会显示实例自身所有的可枚举属性的名字构成的数组    
Object.getOwnPropertyNames(obj)  会将实例所有的属性（包括不可枚举的）组成的数组
 
3. 自定义原型对象　　
```js
function Person(){ }
Person.prototype = {
    name : "bai"
}
```  
自定义的constructor属性指向的是Object了，也就是，实例通过constructor无法访问构造函数了；instanceof没有影响； 
为了方便，最好手动设置一下constructor；直接添加的话，constructor就是可以枚举的了，最好用
```js
Object.defineProperty(Person.prototype,"constructor",{
    enumerable:false,
    value:Person
})
```

4. 原型的动态性
为原型函数添加属性，会实时的反应到实例中去     
实例的指针只指向原型对象，并没有经过构造函数，一旦实例被创建，其指向的原型对象就不变了， 最好不要在创建对象后在改变函数的原型对象  

5. 原型对象的问题  

原型对象中的属性，会被所有实例共享的，基本类型的值没有影响，最多就是会被屏蔽；函数也没有影响，最多也就是 被屏蔽； 但是值是引用类型的话，那么有一个实例操作这个属性，那么该属性的变化就会被所有的实例共享了；因为他们一般是直接操作的，不会屏蔽，会实时的变化的；



#### 组合构造函数模式和原型模式 

构造函数用于定义实例属性，原型模式用于定义方法和共享的属性      
```js
function Person(name){
   this.name =name;
   this.friend = function(){

   };
}
Person.prototype = {
    constructor : Person,
    say:function(){
        alert("hi");
    }
}

var person1 = new Person("bai");
var person2 = new Person("hei");
//构造函数中的引用类型都是不全等的，每次创建是来都重新创建一遍的
console.log(person1.friend == person2.friend); //false
console.log(person1.friend === person2.friend);//false
```



#### 动态原型模式
为了让其他OO语言的人看懂的一种写法，把原型的内容在构造函数内部动态创建遍 ,只会初始化一次，之后就直接继承了 ；不要用字面量重写原型函数了，因为第一次执行的时候 指定了默认的原型函数  
```js
funcition Person(name){
    this.name = name;
    if(typeof this.say != "function"){
        Person.prototype.say = function(){
            alert("hi");
        }
    }
}
```



####寄生构造函数模式  
工厂模式，只是使用的时候用new来操作了； 作用是为工厂生产的东西添加特殊的方法等，如构造特殊的数组;好像new没什么用
```js
 function SpecialArray(){
     var values = new Array();

     values.push.apply(values,arguments);//这里apply主要用于传递参数
     values.toPipeString = function(){
         return this.join("|");
     }
     return values;
 }
var calors = new SpecialArray("red","blue");
var colars = SpecialArray("red","blue");
```


####稳妥构造函数模式  

1. 稳妥对象  
没有公共属性，其方法不引用this的对象  ；在安全环境（禁this和new的）；或者防止数据被其他程序改动的情况 ： 实例方法不用this，不用new引用构造函数  
```js
function Person(name,age){
    var o = new Object();
    //可以在这里定义私有的变量和函数
    o.say = function(){
        return name;
    }
    return o;
}

传入传出东西，都不会在对象上定义；对象自身没有属性，但是可以返回属性值，可以这么叫
```




###继承 

1. 原型链继承
* 用一个类（B）的实例（b）做另一个构造函数（A）的原型，那么A的实例a就包含b的属性方法以及B的原型对象的属性和方法  ；这就是原型链继承
* instanceof  IsPrototypeOf 对被继承者都会显示true    
* 添加方法一定要在替换原型以后才行；并且不能在用对象字面量方法来添加方法了
* 存在的问题: 新建的原型对象肯能含有引用类型；创建子类实例的时候，不能把超类的实例参数一起传递了 
2. 借用构造函数继承 

```js
function Super(name){
    this.name =name;
}
function sub (name){
    Super.apply(this,name)
    this.he = function(){}
}

```

3. 组合继承
```js
function sup(){};
function sub(){
    sup.call(this,arg)
}
sub.prototype = new sup();
sub.prototype.constructor = sub;
```
先借用构造函数，解决实例属性问题，新的实例的属性是自身的一套，    原型继承会继承一套属性和方法，但是由于自身的方法会屏蔽原型对象的属性，
那么就不会存在属性共享的问题了  ； 存在的问题就只有sup的构造函数会执行两次  

4. 寄生组合式继承  
```js 
//寄生组合式继承
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
} //创建超类原型的的一个副本；也可以创建一个对象的副本；如果想要加强的话，还可以以这种形式添加些函数就行了
// 实际是 sub的原型 == sup原型的副本；实现原型的继承
function inheritPrototype(subType,supType){
    var protoType = object(supType.prototype);
    protoType.constructor = subType;
    subType.prototype = protoType;
}



function sup(){};
function sub(){
    sup.call(this,arg);//这里实现参数的继承
}
inheritPrototype(sub,sup);
```








## 函数表达式  
```js
// 创建函数
//声明函数
function functionName(){

}


//浏览器支持一个name属性，返回函数名（声明时的名字）
var name =　functionName.name;


//函数声明提升：执行代码前会先执行函数声明
say();
function say(){}
//不会报错


//函数表达式多种
//匿名函数的函数表达式,function 后面没有跟着标识符就是匿名函数
var functionName = function(arg1,arg2,arg3){

};

// 函数表达式和普通的表达式一样，必须先赋值才调用，下面的会报错
/*say1();
var say1 = function(){};   */

//即使是命名函数表达式也是不行的
/*say2();
var say1 = function　say2(){};*/



//不允许使用条件来声明　函数；　想要不同的条件来创建函数，必须使用函数表达式，
// 下面代码无效，自动修复后保留了后面的声明
var condition;
　if(condition){
    function say1(){
        return "hello";
    }
}else{
    function say1(){
        return "ha";
    }
}

console.log(say1());

//把函数当做值来传递的话，都可以使用匿名函数


```






## 不知道哪一张的

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
文档对象模型(Document Object Model)
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

 ## 18 XML 
 ### xml支持
 DOM2开始支持，IE9
 #### 创建xml  

```js
   if(document.implementation.hasFeature("XML","2.0")){
         var xmldom = document.implementation.createDocument("namespace",rootName,doctype);
         //这里的namespace可以直接传空字符串，doctype传null     
        var child = xmldom.createElement("child");
        //此处的document就是xmldom
        xmldom.documentElement.appendChild(child);
        //documentElement指向文档的首元素
     }
``` 
#### DOMPaeser 
将xml解析为DOM文档 ，首先创建实例，让后使用parseFromeString方法解析xml字符串。 只能解析格式良好的xml所以解析不了html文档，解析错误的话就会返回一个parseerror的文档，内容为错误描述
```js
  var parser = new DOMParser();
   var xmldom = parser.parseFromString("<root><child/></root>","text/xml");
   //这样就创建了一个xmldom的文档了
```
加强版
```js

    var parser = new DOMParser(),
        xmldom,
        errors;

    try {
        xmldom = parser.parseFromString("<root><child/></root>", "text/xml");
        errors = xmldom.getElementsByTagName("parsererror");
        if (errors.length > 0) {
            throw new Error("Parsing Error");
        }
    } catch (error) {
        console.log(error.message);
    }
``` 
#### XMLSerializer 类型 
使用时先创建实例，然后调用serializeToString  
```js
var serializer  = new XMLSerializer();
var xml = serializer.serializeToString(xmldom); 
``` 
可以序列化任何dom对象，HTML也支持 ，传入不是DOM对象的话出错

#### IE8 
IE支持XML是通过activeX对象实现的，通过ActiveXObject可以在js中创建ActiveX对象的实例，创建xml的实例，
也要使用这个函数并传入一个表示xml文档的字符串，实际创建并解析的方法  

```js 
function createDocument(){
    if(typeof arguments.callee.activeXString != "string"){
        var versions = ["MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument"],
         i,len;
         for(i = 0,len = version.length;i<len;i++){
             try{
                 new ActiveXObject(versions[i]);
                 arguments.callee.activeXString = versions[i];
                 break;
             }catch(error){
                 //跳过，不做处理
             }
         }
    }
    return new ActiveXObject(arguments.callee.activeXString);
}
//创建空白 文档
var xmldom = createDocument();
//parseFromString
xmldom.loadXML("<root><child/></root>"); 
//error
if(xmldom.parseError != 0){
    console.log(
        "An error occurred:\n Error Code:"
        +xmldom.parseError.errorCode+"\n"
        +"line"+xmldom.parseError.line +"\n"
        +"linePos" + xmldom.parseError.linepos +"/n"
        + "Reason:"+xmldom.parseError.reason);
}

// 序列化 直接用xml就可以了
xmldom.xml

```

#### 跨浏览器处理xml

```js
//解析xml通用版，需要和createDocument使用
function parseXml(xml){
    var xmldom = null;

    if(typeof DOMParser != "undefind"){
        xmldom = (new DOMParser()).parseFromString(xml,"text/xml");
        var errors = xmldom.getElementsByTagName("parsererrror");
        if(errors.length!=0){
           throw new Error("XML parse error"+errors[0].textContent);
        }
    }else if(typeof ActiveXObject != "undefined"){
        xmldom = createDocument();
        xmldom.loadXML(xml);
        if(xmldom.parseError!=0){
            throw new Errror("XML parse error"+xmldom.parseError.reason);
        }
    }else{
        throw new  Error("NO XML parser available");
    }
    return xmldom;
}

//并且使用的时候最好和try-catch联合使用


//序列化xml
function serializeXML(xmldom){
    if(typeof XMLSerializer != "undefined"){
        return (new XMLSerializer()).serializeToString(xmldom);
    }else if(typeof xmldom.xml != "undefined"){
        return xmldom.xml;
    }else{
        throw new Error("NO serializer available");
    }
}
```


### XPath  

+ XPath 使用路径表达式来选取 XML 文档中的节点或者节点集。    
+ XPath  有7中类型的节点（node）：  元素、属性、文本、命名空间、处理指令、注释以及文档（根）节点    
+ 基本值    无父或无子的节点  

+ 项目Item   项目是基本值或者节点            
+ 关系 ： Parent children  sibling ancestor(先辈)  Descendant(后代)
####选取节点 : 
 XPath使用路径表达式在XML文档中选取节点，节点是通过沿着路径或者step来选的     
####表达式 
1. 基本介绍 
+ nodename  选取此节点的所有自己子节点      
+  /      从根节点选取
+  //从匹配选择的当前节点选择文档中的节点，不考虑他们的位置
+    . 选取当前节点       
+   ..   选取父节点
+   @选取属性


例子： 
bookstore   选取bookstore标签的所有子节点  
/bookstore   绝对路径下的bookstore   
bookstore/book 选取bookstore下的所有book元素  
//book       选取所有book元素，不论在什么位置       
bookstore//book    选取bookstore的后代元素中所有的book元素   
//@lang       选取名为lang的所有属性      

2. 谓语 ：放在方括号中，产选出特定节点或者指定值得节点   

/bookstore/book[n]    bookstore子元素第n个book元素     
/bookstore/book[last()]     bookstore的最后一个book子元素（last()-1)倒数第二个    
/bookstore/book[postion()<3]  前两个，position从1开始的？     
//title[@lang]          有lang属性的title元素     
//title[@lang="eng"]         
/bookstore/book[price>35.00]    bookstore 的所有book元素，并且其子元素中price的值>35  
//bookstore/book[price>35.00]/title    

3. 通配符  
  -  \* 所有元素 
  - @*  所有属性
  - node()  所有节点 
4. 选取若干路径 
  "|"使用或元素达到不同的路径 
  
#### XPath轴 
轴可以定义相对于当前节点的节点集   
+ ancestor  当前节点的所有先辈（父、祖父） 
+ ancestor-or-self  当前节点以及所有先辈 
+ attribute   当前节点的所有属性 
+ child   所有子元素 
+ descendant   所有后代元素 
+ descendant-or-self  当前节点和子节点
+ following   当前节点的结束标签之后的所有节点 
+ namespace   当前节点所有的命名空间 
+ parent
+ preceding   当前节点开始标签之前的所有节点
+ preceding-sibling   当前节点之前的同级节点
+ self  自己 
#### 步   
轴名称::节点测试[谓语]      例子  
+ child::book
+ attribute::lang
+ child::*
+ child::text()
+ child::node()
+ descendant::book     当前节点的所有book后代 
+ ancestor::book  当前节点的所有book先辈 
+ child::*/child::price  当前节点的所有price孙节点 

#### 运算符 
    |    合集 
    +    加          
    -    减   
    *    乘     
    div  除     8 div 4
    mod  取余  
    =    等于   
    ！=   不等于 
    <    小于
    <=   小于等于
    >    大于
    >= 
    or   或  
    and  与  



#### DOM3中的XPath 
XPath最重要的两个类型   XPathEvaluation 和XPathResult  ，最重要的方法  
```js
//求职
var xpathResult = document.evaluate(
 xpathExpression, //上面的那堆表达式
 contextNode, //一般是一个节点，应该是最上边的那个xmldom.documentElement
 namespaceResolver, //没有命名空间的话就是null，有的话就是其他的，我不知道
 resultType, 
 result  //一般是null
);
```

上面的resultType  最常用的是        
+ XPathResualt.ORDERED_NODE_ITERATOR_TYPE    返回匹配节点集合，次序与文档中的次序一致  
+ XPathResualt.UNORDERED_NODE_ITERATOR_TYPE    返回匹配的节点集合，但是集合中节点的次序不一定与他们在文档中次序一致     
+ XPathResualt.ANY_UNORDERED_NODE_TYPE        返回匹配的节点集合，但是集合中节点的次序不一定与他们在文档中次序一致  
+ XPathResualt.FIRST_ORDERED_NODE_TYPE        返回只包含一个节点的集合，包含匹配的第一个节点   
+ XPathResualt.ANY_TYPE                        返回域XPath表达式匹配的数据类型  
+ XPathResualt.NUMBER_TYPE                    返回数值  
+ XPathResualt.STRING_TYPE                   返回字符串  
+ XPathResault.BOOLEAN_TYPE                   返回布尔值   
+ XPathResault.ORDERED_NODE_SNAPSHOT_TYPE    返回快照，次序与文本中一致 ，修改不会影响到原来的东西  
+ XPathResault.UNORDERED_NODE_SNAPSHOT_TYPE    返回快照，次序与文本中不一致 


####例子   
```js
//节点迭代器必须用  iterateNext()
var result = xmldom.evaluate("employee/name",xmldom.documentElement,null,XPathResual.ORDERED_NODE_ITERATOR_TYPE,null);
if(resualt!==null){
    var element = resualt.iterateNext();
    while(element){
        //deal(element)
        element =resualt.iterateNext();
    }
}

// 快照形式的话用   snapshotItem

var result = xmldom.evaluate("employee/name",xmldom.documentElement,null,XPathResual.ORDERED_NODE_SNAPSHOT_TYPE,null);
if(resualt!==null){
    for(var a=i ,len = result.snapshotLength;i<len;i++){
        result.snapshotItem(i);
    }
}


// 单节点形式 
var result = xmldom.evaluate("employee/name",xmldom.documentElement,null,XPathResual.FIRST_ORDERED_NODE_TYPE,null);
if(result!=null){
    result.singleNodeValue ;
}



//简单类型结果 
//XPath可以获取简单的肥姐店数据类型   通过 booleanValue、numberValue、stringValue 属性返回值  
var result = xmldom.evaluate("employee/name",xmldom.documentElement,null,XPathResual.BOOLEAN_TYPE,null);
result.booleanValue   


// 对于数值类型，必须在表达式参数上指定一个可以返回数值的Xpath函数   例如: 计算匹配数量的count（）  
var result = xmldom.evaluate("count(employee/name)",xmldom.documentElement,null,XPathResual.NUMBER_TYPE,null);
result.numberValue 
//字符串类型会返回匹配节点的第一个相符的中的文本内容 





//ANY_TYPE  返回的结果可能是简单类型也可能是无序迭代器需要通过结果的resultType与对应来行比较确认返回的到底是什么 
```
####命名空间的支持   

1. createNSResolver()来创建对象  

文档的总结点包含命名空间定义的节点传进去  ,然后在表达式中也加上前缀就可以确认相应的命名空间是否能用
```js
var nsresolver = xmldom.createNSResolver(xmldom.documentElement); 

var result = xmldom.evaluate("wrox:book/wrox:author",xmldom.documentElement,nsresolver,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
```

2. 定义一个函数，接收命名空间的前缀，返回关联的url 

```js
var nsresulver = function(prefix){
    switch(prefix){
        case "wrox" : return "http://www.wrox.com/";
        //其他前缀
    }
}
```  


####IE 
IE9 以前activeX 实现  
```js
var element = xmldom.documentElement.selectSingleNode("bookstore/book");
if(element!=null){
    element.xml
}

var element = xmldom.documentElement.selectNodes("bookstore/book");
//返回nodelist  



//命名空间支持  
xmldom.setProperty("SelectionNamespaces","xmln:prefix1='url1' xmln:prefix2='url2" );
var result = xmldom.documentElement.selectNodes("wrox:book/wrox/author")
```

### 跨浏览器使用XPath  
IE能支持的方法很少，所以只要重写selectSingleNode() selectNodes()   就可以了，接收的参数  
上下文节点、XPath表达式、可选的命名空间对象    {prefix1：“url”， prefix2：“url2”}这样的形式 
```js
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
```


###XSLT没看   



##E4X没看

##JSON  
javascript Object Notation一种数据结构，与XML相互竞争的是;
###语法 
JSON支持三种类型的值   
+ 简单值 : 字符串、数值、布尔、null不支持undefined，字符串必须用双引号来包含
+ 对象 
+ 数组     
不支持变量、函数或者对象实例 ,这个需要字节改成别的然后怎么操作呢 ，属性必须加上双引号  ,数组和对象通常是JSON数据结构的最外层结构
###解析和序列化
JSON对象，有两个方法，stringify()和parse() ; 序列化后不包含任何缩进；重新解析后的对象和原来的对象相互独立  
#### JSON.stringify(value[, replacer[, space]])
```js
var book = {
     "titile":"Professional Javascript",
     "authors": ["bai","lan"],
     "edition":3,
     "year":2011
}

/**
*直接使用看起来就是把对象直接变成了一个去除了缩进的字符串 , 数组合值该是什么样子还是原来的样子
*/
var jsontext1 = JSON.stringify(book);
// {"titile":"Professional Javascript","authors":["bai","lan"],"edition":3,"year":2011}


/**
 * replacer 可是数组的话，就会只输出，特定的几个属性了
 */
var jsontext2 = JSON.stringify(book,["titile","year"]);
//{"titile":"Professional Javascript","year":2011}


/**
*  replacer 是函数的话可以控制各种值得返回情况，返回什么就是什么，并且返回undefined的话就省略该项了
*/
var jsonText = JSON.stringify(book,function(key,value){
    switch(key){
        case "authors":
        return value.join(",");
        case "year":
        return 5000;
        case "edition":
        return undefined;
        default:
        return value;
    }
},);
//{"titile":"Professional Javascript","authors":"bai,lan","year":5000}



/**
 * space可以传入数字表示缩进几个空格，传入字符串表示用该字符串间隔,从开头传入的
 */
var jsontext3 = JSON.stringify(book,["titile","year"]," 间隔 ");
/*
{
 间隔 "titile": "Professional Javascript",
 间隔 "year": 2011
}
*/

/**
*toJSON()方法是定义在对象内部的方法，在调用JSON.stringigfy的时候会直接调用，其返回值就是我们的结果，可以作为repalcer的补充 ，很坑
*/
```


**JSON.stringify()序列化的顺序如下**
+  存在toJSON()方法而且能通过他的取得有效的值，则调用他方法，否则返回对象本身  
+  如果提供第二个参数，则用这个函数过滤器，传入函数的的值是第一步返回的值
+  对第二步返回的每个值进行序列化
+  如果提供了第三个参数，执行相应的序列化

#### JSON.parse(text[, reviver])

```js
/**
*将字符串转化为json对象
*/
var bookCopy1 = JSON.parse(jsonText);


/**
*转化回来的东西都是字符串，尤其日期需要在reviver中还原为对象
*/ 
var bookCopy2  = JSON.parse(jsonText,funciton(key,value){
    if(key == "releaseDate"){
        return new Date(value);
    }else{
        return value;
    }
})
```


## ajax
### XMLHttpRequest
####创建XHR
IE8和以上
```js
var xhr = new XMLHttpRequest();
```  
####XHR用法 
1. open
> xhr.open("get/post","example.php",false);    
open方法只是启动一个请求
+ 第一个参数为请求方法 
+ 第二个为相对于当前页面的（也可以用绝对路径），只能向同一个域的相同端口的和协议的URL发送请求

2. send
>xhr.send(null);   
若果是get这里传入null，如果是post这里传入序列化的form内容  
3. 当JS等到服务器响应后，会自动填充XHR属性  
  + responseText  作为响应主体返回的文本  
  + responseXML   如果响应内容类型为“text/xml”或者“application/xml”   相应数据的XML DOM 文档
  + status        响应的HTTP状态，200表示成功，304表示自愿并没有修改，可以直接使用浏览器中缓存的版本  200< x < 300 或 304表示有效
  + statusText   具体的内容   

4. 多数情况下需要异步请求，检查XHR对象readyState属性   
  +  0 : 未初始化，尚未调用open()
  +  1 : open()调用 
  +  2 ： send() 调用了
  +  3 ： 已经接受到部分信息 
  +  4 ： 已经接受到所有信息并且可以使用了
 注意： 在open前指定onreadyStatechange处理方法 ，并且最好使用DOM0 ，XHR对象处理数据最好，因为this会出错，没有event对象 


5. 不想请求的时候可以中断 
 > xhr.abort()    
 之后注意XHR的解引用  

 #### HTTP请求头信息  
1. 浏览器自动发送的请求头信息  
  + Accept  浏览器可以处理的数据类型 
  + Accept-Charset  浏览器可以显示的字符集
  + Accept-Encoding   能够处理的压缩编码 
  + Accept-language   浏览器当前语言 
  + Connection         浏览器和服务器的链接类型 
  + Host   发送请求页面的域　　　
  + Referer  发出请求的页面的URi 单词是错的，错着来用就行了 
  + User-Agent   浏览器的用户代理字符串   

2. setRequestHeader 设置请求头    
在open后send前设置，并且是按照键值对来设置的   ，也可以发送自定义的信息， 建议发送自定义的东西，否在可能会导致出错  
> xhr.setRequestHeader("name","value");    
3. 获取响应头信息  
```js
var myHead = xhr.getResponseHeader("myhead");// 获取某个属性的值 
var  allhead  = xhr.getAllResponseHeaders()
```


```js

/**
 * 原生ajax封装
 *data={method:"get/post"，url:""，asyn:"true/false",data:"",dataType:"xml/json",success:function(){},failure:function(){}}
 */
function ajax(data) {
    //data={method:"get/post"，url:""，asyn:"true/false",data:"",dataType:"xml/json",success:function(){},failure:function(){}}
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
    var method = data.method == 'get' ? 'get' : 'post';
    var url = '';
    if (data.url) {
        url = data.url;
        if (method == 'get') {
            //      分装原装的ajax，get需要加上不同的数据来清理缓存，或者是通过不同的请求来重新向客户端发送
            url += "?" + data.data + "&_t=" + new Date().getTime();
        }
    }


    //第四步：指定回调函数
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status <300 ||xhr.status == 304) {
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
    if (method == 'get') {
        xhr.send(null);
    } else if (method == 'post') {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data.data);
    }



}

```

#### get
多数用于查询 ，需要对内容进行编码，然后放在url后面      

```js
//将查询语句添加到url中
function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent("value");
    return url;
}
```  
#### post 
data是个字符串，可以是序列化的XML、json、表单或者任意字符串 
并且需要设置请求头   ,open后，send前  
```js
xhr.setRequestHeader("Content-Type","applicaton/x-www-form-urlencoded");
```




### XMLHttpRequest  2级 
发展出得新规定，部分实现了
#### FormData（form）
序列化表单用的，两种用法，作为数据的时候不用设置请求头信息了也

```js
//直接插入键值对的时候
var data = new FormData();
data.append("name","value");


//或者  
var data = new FormData(document.getElementById("formid"));
```  
#### 超时请求
XHR对象添加一个timeout属性，在open后添加，表示请求等待相应多少秒后停止，触发timeout事件  ，请求终止的时，才是readystate可能已经变成4了，一位置会调用onreadystatechange事件，这是方位status会导致错误，因此需要把包含status的语句放在一个try-catch中    
```js
var xhr = createXHR();
xhr.onreadystatechange = function(){
    if(xhr.readystate === 4){
        try{
            if(xhr.status >=200&&xhr.status<300||xhr.status == 304){
                xhr.responseText;
            }else {
                //no  data
            }
        }catch(e){

        }
    }
};

xhr.open("get","baidu",true);
xhr.timeout =10000;
xhr.ontimeout = function(){

}
xhr.send(null);
```

####overrideMimeType()
在send前指定数据类型，将返回的"text/plain"中实际包含的是XML的，强制用xml来解析  ，
xhr.overrideMimeType("text/xml")


###进度事件  

####loadstart 
接收响应数据的第一个字节时触发

#### load 
接受到服务器响应 就会触发，
#### progress事件 


###跨域问题 


#### CORS(Cross-Origin Resouce Sharing,跨域资源共享)

添加一个请求头，包含页面的源信息（协议、域名、端口） ，  以便服务器根据头部信息决定是否响应   ，如  
Oringin:http:www.baidu.com   

如果服务器认为之歌请求可以接受，就在   Access-Control-Allow-Origin  头部中回发相同的源信息（如果是公共资源，可以接受发"*")   
Access-Control-Allow-Origin : http://www.baidu.com  

如果没有头部，或者信息不匹配，浏览器会驳回请求。请求和响应都不应该包含cookie 


##### IE8 对CORS的实现  

XDomainRequest类型  ， cookie不会发送和响应，只能设置请求头中的Content-Type字段（用来post）,不能访问请求头 ,只支持get和post   
只能异步请求 ，并且请求返回后会触发load事件，，响应数据会保存在responseText中,能用的信息比较少  

```js
var xdr = new XDomainRequest();
xdr.onload = function(){
    xdr.responseText ;
    //返回的数据里面只能访问原始文本，没有其他东西
}
xdr.onerror =  function(){
    //什么东西都不返回，只能告诉你出错了
}

xdr.timeout =1000;
xdr.ontimeout =  function(){
    //超时了
}
//get 的 
xdr.open("get","http://baidu.com/aa");//只支持异步 
xdr.send(null);

//post的 
xdr.open("post","http://www.baidu.com");
xdr.contentType = "application/x-www-form-urlencoded"
xdr.send(data);

```

##### 其他浏览器 CROS  
原生的XHR就行了，open中传入绝对地址   
不能使用使用setRequestHeader()来设置自定义头部   
不能发送和接收cookie  
调用getAllResponseHeaders()返回的是空值


##### Preflighted  Request 

不懂  
##### 带凭据的请求  
跨域一般不提供凭据（cooki/http认证ssl证明）    
通过将  withCredentials属性设置为true，可以指定某个请求应该发送凭据    

####跨浏览器的CORS 
```js
//跨浏览器的CORS  
function createCORSRequest(method,url){
    var xhr =  new XMLHttpRequest();
    if("withCredentials" in xhr){
        xhr.open(method,url,true);
    }else if(typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method,url);
    }else{
        xhr = null;
    }
   return xhr ;
} 
var request = createCORSRequest("get","baidu");
if(request){
    request.onload = function{
        request.responseText;
    };
    request.send(null);
}
```

### 其他跨域技术  

####图像ping  
数据通过查询字符串的形式范松，响应可以是任意内容，通常是204或者像素  


```js
var img = new Image();
img.onload = img.onerror = function(){
    console.log("done");
};
img.src = "http://www.baidu.com?name=bai";
```
在设置src的时候就发送了一个请求了    
通常用于跟踪用户点击页面或动态广告曝光次数  。   
只能get并无法访问服务器的响应文本，只能单向通信 
#### JSONP  
JSON with padding  参数式JSON ;被包含在函数中调用的JSON  ，callback（{"name":"bai"}）; 

通过script发送请求，url也包含回调函数的指定，服务器返回的数据（JSON格式）会直接使得回到函数执行   


由事件触发创建一个script。其中src中定义要访问的地址，并且添加属性键值对，
_jsonp=functionName  或者  callback=functionName（书上写的）
来触发本地的函数解析结果（返回的数据自动放到函数中了）

```js
window.onload = function(){
   var city = document.getElementById('city');
   city.onchange = function(){
      document.getElementById('info').innerHTML = '';
   }
   var btn = document.getElementById('btn');
   
   btn.onclick = function(){
      var cityCode = city.value;
      var url = 'http://cdn.weather.hao.360.cn/api_weather_info.php?app=hao360&_jsonp=abc&code='+city.value;
      var script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
   }

}



function abc(data){
   var d = data.weather;
   var info = document.getElementById('info');
   info.innerHTML = '';
   
   for(var i=0;i<d.length;i++){
      var date = d[i].date;
      var day = d[i].info.day;
      var night = d[i].info.night;
   
      info.appendChild(div);
      
   }
}

```


jQuery中对JSONP的使用
```js
$(function(){

   $.ajax({
      type : "get",
      async: false,
      url : "./jsonp.php",
      dataType : "jsonp",
      //jsonp: "qwe",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
      //jsonpCallback:"liudehua",
      //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名(类似：jQuery110201563(["zhangsan", "lisi", "wangwu"]);)

     //只制定datatype；不写jsonp 和jasoncallback，可以直接用success就可以了
      success : function(data){
          console.log(data);
      },
      error:function(){
          console.log('fail');
      }
   });

});
```


数据可靠性不能保证  


####Comet  
服务器推送，两种方式 

1. 长轮询  
浏览器一次请求，服务器不立即回应，只有当存在有效数据的时候才会返回  


2. 流    
一次请求后，服务器保持连接打开 ，然后周期性发送数据  
浏览器端，通过监测readystatechange事件，并在readystate 为3的时候进行相应操作就行  

```js
//commet中的流  函数创建方法  
function createStreamClient(url,processFunction,finishFunction){
    var xhr = new XMLHttpRequest();
    received = 0;
    xhr.onreadystatechange = function(){
        var result ;
        if(xhr.readyState == 3){
            result = xhr.responseText.substring(received);
            received += result.length;
            processFunction(result);
        }else if(xhr.readyState == 4){
            finishFunction(xhr.responseText);
        }
    }

    xhr.open("get",url,true);
    xhr.send(null);
    return xhr;
}
// var client = createStreamClient() ;使用的时候直接创建就行
```  

#####SSE
由于以上的需求，社区开发了SSE(Sever-Sent Event 服务器发送事件)   ，   
SSE Api用于创建单向链接  ，服务器相响应的数据MIME必须是text/event-stream ;   

```js
var source = new EventSource(url);
//URL必须和创建对象的页面同源，请求接收方，EventSource有一个readystate属性，0表示正在 链接服务器，1表示链接，2表示关闭了链接
source.onopen = function(event){
   // 链接建立的时候触发 open事件  
}
source.onmessage = function(event){
    var data = event.data; 
    //有新数据的时候触发
}
source.onerror = function (event){
    //  无法建立链接的时候触发
}
//断开后会自动重新链接,适合长训论和流  
source.close()   //强制关闭  
```

服务器端的数据纯文本的  
data : foo     

data : bar 

data :for
data :you   

每个空行隔开的是一次事件，event.data能访问到事件内容， 最后一个是 for\nyou 、




最好加上一个id  ，用于记录触发了多少了
data：for 
id：1


#### web  sockets双向通道  

适用于数据较少的通信

```js
var socket = new WebSocket(url);
//这里的URL必须以 ws://或者wss://开始的绝对路径   


socket.send(message);
//message只支持string,发送消息 



//接收消息的话有message事件
socket.onmessage =function(event){
    event.data
}


//open事件在建立链接的时候触发
//error在发生错误的时候触发
//close关闭的时候触发
```  


ajax和SSE也可以实现双向通讯  

####安全

SSL链接访问可以通过XHR请求的链接   
每次请求都要附带经过响应算法计算得到的验证码的  


#### 不安全  
post换成get    很容易改变  
来源URL是否可信   很容易伪造 
cookie          容易伪造 
不要发送用户名和密码，  JS调试器常看变量就能发现纯文本的内容了  



##模板

模板引擎
Lacal软件
原理剖析
流行模板引擎
artTemplate、JsRender、baiduTemplate、Mustache、Hanldebars
artTemplate

查询天气，需要先查询城市编码一个ajax，网络查编码（）
然后在 由城市编码查另外的城市天气（另外的编码）


用id标注编码的位置，数据在后面传入

例子
数组
var data = {
   title: '基本例子',
   isAdmin: true,
   list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = template('test', data);
document.getElementById('content').innerHTML = html;

<script id="test" type="text/html">
{{if isAdmin}}

<h1>{{title}}</h1>
<ul>
    {{each list as value i}}
        <li>索引 {{i + 1}} ：{{value}}</li>
    {{/each}}
</ul>
{{/if}}
</script>







处理时间
var data = {
   time: 1408536771253,
};
var html = template('test', data);
document.getElementById('content').innerHTML = html;


<script id="test" type="text/html">
{{time | dateFormat:'yyyy年 MM月 dd日 hh:mm:ss'}}
</script>



没有数据的时候讲返回渲染函数
var source = '<ul>'
   +    '{{each list as value i}}'
   +        '<li>索引 {{i + 1}} ：{{value}}</li>'
   +    '{{/each}}'
   + '</ul>';
var render = template.compile(source);
var html = render({
list: ['摄影', '电影', '民谣', '旅行', '吉他']
});
document.getElementById('content').innerHTML = html;



百度搜索

<script type="text/javascript">
   $(function(){
      /*输入完成注册keyup事件*/
      $('#keyWord').keyup(function(e){
         var kd = $('#keyWord').val();
         /*百度搜索用的借口地址*/
         var url ='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+kd;
         querySUG(url);
      });
   });

   function querySUG(url){
      document.getElementById('list').innerHTML = '';
//    异步的jsonp
      $.ajax({
         type : "get",
         async: true,
         url : url,
         dataType : "jsonp",
         jsonp: "cb",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
 //  jsonpCallback:"callback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名(类似：//jsonp一般不可省略，callback一般可以省略
jQuery1102016820125747472048_1450147653563(["zhangsan", "lisi", "wangwu"]);)
         success : function(data){
            var tag = '<ul>';
            for(var i=0;i<data.s.length;i++){
               tag += '<li>'+data.s[i]+'</li>';
            }
            tag += '</ul>';
            $('#list').html(tag).show();
            $('#list').find('li').hover(function(){
               $(this).css('background','lightGreen');
            },function(){
               $(this).css('background','lightGray');
            });
         },
         error:function(){
             console.log('fail');
         }
      });
   }
</script>



##高级技巧  
###高级函数  
#### 安全的类型检测  
```js
typeof regexp        //object     
regexp instanceof RegExp   //true
typeof functionname  //function
functionname instanceof Function  //true
typeof json  //object
```
instanceof 操作符在多个全局作用域的时候会出错 ，（多个iframe），var isArray = value instanceof Array；是错的  ，Array是window的属性，
夸多个全局作用域会出错了就      

总的解决方法，在任何值上调用Object原生的toString()方法，都会返回一个[object NativeConstructorName]  ,每个类的内部都有一个[[Class]]属性，之歌属性指定了上面的字符串中的构造函数名字  ,还是无法确认JSON     
```js
function isArray(value){
    return Object.prototype.toString.call(value) === "[object Array]";
}
function isFunction(value){
    return Object.prototype.toString.call(value) === "[object Function]";
}
function isRegExp(value){
    return Object.prototype.toSatring.call(value) ==="[obj RegExp]";
}
//Object.prototyape.toString.call(value);  //[object NativeConstructorNmae]
//ObjecttoString.call(value);  //输出的是定义的完整内容
//Object 是个函数
```  


####作用域安全的构造函数
直接调用构造函数，没有使用new的话，构造函数将值赋予给window对象，向下面这样改造下函数     
```js
function Polygon(sides){
    if(this instanceof Polygon){
        this.sides = sides;
        this.getArea = function(){
            return 0;
        }
    }else{
        return new Polygon(sides);
    }
}
```
这样有个弊端构造函数切确继承不能用了 ,加上原型链继承最好  

```js
function Rectangle(width,height){
    Polygon.call(this,2); 
    this.width = width;
    this.height = height;
    this.getArea = function(){
        return this.width*this.height;
    }
}
//直接这样继承的话，不会返回this的sides属性，返回的是一个new 出来的对象，并不会添加到对象中  
//需要加上原型继承，这样 RectAngel实例，也就是Polygon的实例  
Rectangle.prototype = new Polygon();
var rect = new Rectangle(5,10);
console.log(rect.sides);
```


####惰性载入函数  
为避免JS函数为适应各种情况每次调用的时候都会执行大量的判断，通过惰性载入函数，让函数自适应对应的浏览器， 
通过改变函数体来实现最简化的函数    

1. 函数调用的时候处理函数  
```js 
//惰性加载XHR
function createXHR(){
    if(typeof XMLHttpRequest != "undefined"){
         //第一个调用的时候重写函数体
        createXHR = function(){
            return new XMLHttpRequest();
        }
    }else if(typeof ActiveXObject != "undefined"){
        createXHR = function(){
            if(typeof arguments.callee.activeXString != "string"){
                var version = ["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],
                i,len;

                for(i=0,len = version.length;i<len;i++){
                    try{
                        new ActiveXObject(version[i]);
                        arguments.callee.activeXString = version[i];
                        break;
                    }catch(e){

                    }
                }
            }
             return new ActiveXObject(arguments.callee.activeXString);
        }
    }else{
        createXHR = function(){
            //erro
        }
    }
    return createXHR();
}

// 惰性加载createXHR的时候每次if语句都会覆盖原函数，
// 最后一步调用新的函数（第一次调用必须要调用一次新返回的函数的），下次调用的时候直接调用的是新的函数
```  

2. 在加载的时候，通过匿名，自执行函数给函数赋值  
```js
var createXHR1 = (function(){
     if(typeof XMLHttpRequest != "undefined"){
         //第一个调用的时候重写函数体
        return  function(){
            return new XMLHttpRequest();
        }
    }else if(typeof ActiveXObject != "undefined"){
        return  function(){
            if(typeof arguments.callee.activeXString != "string"){
                var version = ["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],
                i,len;

                for(i=0,len = version.length;i<len;i++){
                    try{
                        new ActiveXObject(version[i]);
                        arguments.callee.activeXString = version[i];
                        break;
                    }catch(e){

                    }
                }
            }
             return new ActiveXObject(arguments.callee.activeXString);
        }
    }else{
        return  function(){
            //erro
        }
    }
})();
```
#### 函数绑定  
函数绑定要创建一个函数，可以在特定的this环境中以指定和参数调用另一个函数。该技巧常常和回调函数与事件处理诚信度一起使用，
以便将函数作为变量传递的同时保留代码的执行环境  .   
只要是将某个函数指针以值得形式进行传递，同时该函数必须在特定的环境里面运行，绑定函数的作用就显示出来了，主要用于事件处理及setTimeout和setInterval 
```js
var handler = {
    message : "Event handled",
    handlerClick : function(event){
        alert(this.message);
    }
};
var btn = document.getElementById("my-btn")；

//这里this指的是window  
EventUtil.addHandler(btn,"click",handler.handleClick); 

//想要保留原来执行环境可以使用闭包
EventUtil.addHandler(btn,"click",function(event){
    handler.handleClick(event);
})



//使用绑定函数 

function bind(fn,context){
   return function(){
       return fn.apply(context,arguments);
   }
}

EventUtil.addHandler(btn,"click",bind(handler.handlerClick,handler));

//ES5自带原声的bind  
EventUtil.addHandler(btn,"click",handler.handlerClick.bind(handler));
```
#### 函数柯里化   
用于创建已经设置好一个或者多个参数的函数 ，**闭包返回一个函数**    

```js
function curry(fn){
    var fn = Array.prototype.slice.call(arguments)[0];
    var args  =Array.prototype.slice.call(arguments,1);
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null,finalArgs);
    }

}

function add(num1,num2){
    return num1+num2;
}
var curriedAdd = curry(add,5);
console.log(curriedAdd(4));
```


###防篡改对象  
[[Configurable]]  [[Writable]]  [[Enumerable]]  [[Value]]   [[Get]] [[Set]] 作为ES3的特性   
ES5 添加了一些，一旦把对象定义为防篡改，就无法撤销  


#### 不可扩展对象  

Object.preventExtensions(object);     调用后就不能给对象添加方法和属性了  ，严格模式下出错，非严格模式下，失败，undefined     
但仍可以修改和删除属性     
Objcect.isExtensible(oject);   是否可以扩展  
#### 密封的对象  
密封对象不可扩展，而且已有成员的[[configurable]]设置为false  ，不能删除属性和方法，不能用Object.defineProperty()把数据属性改为访问器属性，
属性值可以修改的还是 

Object.seal(object);  
 Object.isSealed(object);
#### 冻结对象  
对象不可扩展，密封，数据属性的[[writable]]false,如果定义了[[set]]函数，访问器属性仍然可以写     
Object.freeze(object)   
Object.isFrozen(object);  

###高级定时器 
####链式setTimeout
定时器的作用，指定的事件间隔将代买添加到队列里，并不是执行  
  
setInterval ()可以保证代码规则的插入队列，但是可能导致前次代码没执行完，新的代码就在此插入了队列，导致连续运行很多次，JS引擎让队列中没有相同的代码是实例的时候才能添加，但是某些间隔可能会跳过，多个定时器diamante间隔可能比预期小

解决办法 链式setTimeout  
```js 
setTimeout(function(){
    //do something

   if(boolean){
       setTimeout(arguments.callee,1000);
   }
},1000);
```

####数组分块 
为防止恶意代码，代码运行超过了 时间或者语句数量 就不会让他执行了      
原因：  
过长过深的嵌套函数调用或者处理大量的循环     

1.处理大量循环的方法:  如果该循环不处理不会造成其他的运行的阻塞  ，并且不需要按照顺序执行    
```js
/**
 * 当一个数组循环需要很多时间并且不是很着急一次性加载玩，可以使用数组分块技术，   
 * 使用的时候  array.concat()可以返回原数组的克隆体
 * @param {*要循环的数组} array 
 * @param {*处理每一项的函数} process 
 * @param {*这个函数的运行环境} context 
 */ 
function chunk(array,process,context){
    setTimeout(function(){
       var item = array.shift();
       process.call(context,item);
       if(array.length>0){
           setTimeout(arguments.callee,100);
       }
    },100)
}


// chunk(data.concat(),proccess,null)
``` 
数组分块技术  

数组直接使用没有传入参数的concat方法，会返回克隆体  
 

####函数节流   
高频率的调用一个方法或者计算可能导致浏览器崩溃，函数节流就是很好的方法      

**函数节流** 某些代码不能没间断的反复连续执行，第一次调用的时候创建一个定时器，在制定的间隔后运行代码；当第二次调用的时候，会清除前一次的定时器并设置另外一个；如果第一个已经执行了，那没问题，如果前一个未执行，就会讲其替换为一个新的；目的是为了在执行函数的请求停止一段时间后才执行       


基本模式   
```js
var processor = {
    timeoutId : null,
    preformProcessing :function(){
        //实际执行的代码
    }，
    process : function(){
        cleatTimeout(this.timeoutId);
        var that  = this;//setTimeout的对象是window
        this.timeoutId =  setTimeout(function(){
               that.performProcessing();
        },100);
    }
}

//开始执行   
processor.process();

```


函数简化    
```js
function throttle(method,context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
    },100);
}


//使用  
window.onresize = function(){
    throttle(resizeDiv)
}
```

###自定义事件  
事件是一种观察者模式的设计模式，发布事件的是主体（如DOM元素），事件处理函数就是观察者  

自定义事件是创建管理事件的对象，让其他对象监听那些事件    

对于同一个事件上需要进行多种操作的时候，在其中添加自定义事件，然后在外部添加额外的操作会更加明了简单  


```js
//事件注册和管理的主体
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





//直接使用这个事件 
var target = new EventTarget();
function fn(){};
target.addHandler("hi",fn);
target.fire({type:"hi",other:"other"});
target.removeHandler("hi",fn);  



//因为这种行为被封装在单独的类里面，所以，可以通过继承来获得该行为  

function Perspon (name,age){
    EventTarget.call(this);
    this.name = name;
    this.age = age;
}
inhertPrototype(Person,EventTarget);
Person.protoType.say = function(message){
    this.fire({type:"hello",massage:message})
}

//调用fire通常是不公开调用的
```


####拖放功能


```js
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
   dragdrop.enable = function(){
       EventUtil.addHandler(document,"mousedown",handleEvent);
       EventUtil.addHandler(document,"mousemove",handleEvent);
       EventUtil.addHandler(document,"mouseup",handleEvent);
   }
   dragdrop.disable = function(){
       EventUtil.removeHandler(document,"mousedown",handleEvent);
       EventUtil.removeHandler(document,"mousemove",handleEvent);
       EventUtil.removeHandler(document,"mouseup",handleEvent);
   }
}();

//事件的触发还是依赖与原始的事件根据不同的条件来触发的，
//触发函数中的type名字是自己定义的，目的是在触发滚动的同时，可以添加其他的额外代码，进行不同的协作用的  
// var c = function(){return y}()  ==var c = (funcition(){})();最终c是函数的返回值
```  



## 离线应用和客户端存储  （H5）

需要支持的条件 ： 
  * 知道设备能否上网
  * 能访问一定的资源
  * 有一块本地空间存储数据

###离线检测   
**navigator.online** 用于检测是否在线，是的话返回true，否则返回false；       
chrome和safria在链接不到移动网络或者路由的时候返回false,其他任何时候都会显示true  
移动端貌似可以很好的支持这个       


其次，存在online和offline两个事件可以检测网络的变化，在window上触发的  
```js
EventUtil.addHandler(window,"online",function(){

})  ;
EventUtil.addHandler(window,"offline",function(){

});
```

如何兼容呢   ？？？？？



### 应用缓存 appcache 

1. 从浏览器缓存中分出来一块缓存区域，需要缓存的文件可以列在一个 *.manefest|(.appcache也行)文件中，格式如下，并且文件的MIME类型必须是text/cache-manifest  
```
CACHE MANIFEST
#Comment  

file.js 
file.css 
```
并且在"<html>"中指定manifest属性<html manifest = "/offline.manifest">     

2. 对应的API核心是applicationCache对象   
  + applicationCache.status 显示应用缓存的状态  
      - 0： 无缓存，
      - 1 : 闲置，缓存没有更新
      - 2  检查中，正在下载描述文件看看有没有缓存 
      - 3  下载缓存中  
      - 4  更新完成 ，用applicationCache.swapCache()，就可以使用了 
      - 5   废弃，应用缓存的描述文件已经不见了，页面无法访问应用缓存了  
 + 事件  
      - checking 查找更新的时候触发  2                                           
      - error    检查更新，或者下载资源出错的时候触发    2 3    
      - noupdate  检查发现没有变化  
      - downloading 开始下载的缓存资源的时候  
      - progress    正在下载的时候  
      - updateready 下载完毕，并且可以通过swapCache来更新的时候触发 
      - cached     应用缓存完整的时候触发 


### 数据存储  
登录信息，偏好设定，其他数据   都可以存储在本地   

#### cookie  
最初是存储会话信息的，要求，首先服务器的响应头中存在 Set-Cookie:name-value  ,name和value为url编码的  
，浏览器会存储这个cookie信息，之后，请求头通过 Cookie:name-value来指出信息来自哪里    

1. 限制   
**cookie在性质上是绑定在特定域名下的**,一旦设置，之后的访问都会带有这个标志，防止没有权限的访问者访问   

每个域名做多有30个cookie（兼容最小的），并且整个cookie长度限制在4095b（<4k)       

2. 构成  

```
Set-Cookie : name=value; expires = Mon,22-Jan-07 07:10:24 GTM; domain=.baidu.com;path = /;  secure
``` 
  * name value 键值对  ,必填的
  * expires  失效日期，必须是GMT格式  （Wdy，DD-Mon-YYYY HH-MM-SS GMT）;可选，不填表示关闭浏览器就失效  
  * domain   域名  PS子域名 www.baidu.com   总域名: .baidu.com  可选
  * path    域名下的路径 可选
  * secure   是否使用SSL传输协议  https    

注意： 浏览器只会发送键值对，其他的限制都是服务器发送个浏览器的 
3. js中的cookie 
+ 获取   
document.cookie 可以返回页面当前可用的所有cookie信息（键值对），并且都是编码过得，需要decodeURLComponent()    

+ 设置            
设置值的时候，document.cookie 属性可以设置为一个新的cookie字符串  ，这个字符串会被解释和添加到现有的集合中，
设置document.cookie并不会覆盖所有cookie，除非cookie的名字已经存在，那么会覆盖相应的cookie；     
直接像服务器设置那样添加就行了     
```js
document.cookie = encodeURLComponent("name")+"="+encodeURLComponent("value")+";domain=.baidu.com;path=/"
``` 
并且后面的可以没有  


+ 简化函数  读取/写入/删除  
```js
var CookieUtil = {
    //只能返回value不会返回设置信息
    get : function(name){
        var cookieName = encodeURIComponent(name)+"=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if(cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";",cookieStart);
            if(cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd)); 
        }
    },
    /**
     * secure 最好传入布尔值
     */
    set  : function(name,value,expires,domain,path,secure){
        var cookieText = encodeURIComponent(name)+"="+encodeURIComponent(value);
        if(expires instanceof Date){
            cookieText += ";expires="+expires.toGMTString();
        }
        if(domain){
            cookieText+=";domain="+domain;
        }
        if(path){
            cookieText += ";path="+path;
        }
        if(secure){
            cookie+= ";secure";
        }
    },
    /**
     * 没有直接删除已有cookie 的方法，所以需要相同路径 域 安全选项 再次重置cookie并讲value致空/data设置为过去的时间 
     */
 remove:function(name,domain,path,secure){
      this.set(name,"",new Date(0),path,secure);
 }
}
```  

4. 子cookie 
为了绕开cookie数量的限制，用了子cookie;子cookie是存放在单个cookie中的更小段的数据 ，也就是使用cookie值来存储多个键值对  ，常见的格式  
name=name1=value&name2=value2&name3=value3      
子cookie一般也是以查询字符串的格式化 。这些值可以使用单个cookie进行存储和访问，而非对每个键值对使用不同的cookie存储      
为更好的操作zicookie，建立新的方法，  
```js
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
    remove : function(name,subName,domain,path,secure){
        var subCookies = this.getAll(name);
        if(subCookies){
            delete subCookies[subName];//删除对象的某个属性可以这么干？？
            this.setAll(name,subCookies,null,domain,path,secure);
            //上面可能影响了部分cookie的寿命，我也不知道怎么解决
        }
    },
    removeAll : function(name,domain,path,secure){
        this.setAll(name,null,new Date(0),domain,path,secure);
    }
}
```

**一定不要在cookie中存储重要的信息，身份/财务/地址等**     

###web存储机制  
提供一种cookie之外存储回话数据的途径，提供存贮大量可以跨会话存在的数据的机制  


1. Storage类型  
提供最大的存储空间来存储键值对，只能存储字符串，Storage的实例与其他对象类似 ，有如下方法  
  * clear()   删除所有值
  * key(index)  获取对应index处的name属性
  * getItem(name) 获取对应的Value 
  * removeItem(name) 删除键值对
  * setItem(name) 设置键值对 
这些方法可以直接调用亦可以通过storage随想简介调用，因为每一个项目都作为属性存储在对象上，通过 点语法或者方括号语法访问和修改属性，或者通过delete操作符进行删除   建议使用方法操作，也可以通过length来判断有多少键值对放在storage上 


2. sessionStorage  
用于存储特定于某个会话的数据，只保持到浏览器关闭,标签页关闭， 数据可以跨页面刷新存在，部分浏览器崩溃后重新进入也是支持的，     
存储在sessiong中的数据只能由最初给对象存储数据的页面访问到，多页面应用有限制;
是Storage的一个实例，所以方法完全相同的  
只是多出一个removeItem(name);迭代通过length 和 key()或者直接for-in即可  ，window的属性


3. globalStorage（很多没有实现，并且zeal介绍都没有） 

4. localStorage 
永久保存信息 ，要访问同一个localStorage需要来自同一个域名（子域名无效），使用相同的协议和端口，window的属性，大小限制在2.5MB

5. storage 事件 
任何对Storage对象的修改都会触发storage对象，删除 修改 清空等   
document.addEventListener("storage",function(event){});  event包含的信息很少 
  * domain  存储空间的域名 
  * key  
  * newValue    新值或者null
  * oldValue    旧值  



###IndexedDB 保存结构话数据的一种数据库  

IndexedDB的设计操作完全是异步的，因此，每次操作，都需要你注册onerror和onsuccess事件 ；indexedDB作为所有Api宿主的全局对象

```js
var indexedDB = window.indexedDB||window.msIndexedDB||window.mozIndexedDB||window.webkitIndexedDB;//新的浏览器已经支持第一个
```

1. 数据库 
使用对象保存数据  ，一个数据库就是一组位于相同命名空间下的对象的集合     
打开数据库 ,有的话就会直接发送请求；数据库不存在的话，发送一个创建并打开的请求   
```js
var request,database;
request = indexDB.open("DBName");
request.onerror = function(event){
    console.log(event.target.errorCode);
}
request.onsuccess = function(event){
    database = event.target.result;
    //所有的event.Target都指向request
}
```
默认情况下，IndexedDB数据库是没有版本号的 ，最好一开始就为数据库指定一个版本号

```js
var dbVersion;
if (database.version != "1.0"){
    request = database.setVersion("1.0");
    request.onerror = function(event){
        console.log(event.target.errorCode);
    }；
    request.onsuccess = function(event){
       dbversion = database.version;
    }
}else{
    dbversion = database.version;
};
//有版本号就表示对象已经被初始化过了
``` 
2. 对象存储空间(表)

```js
//创建表,这里传入的第一个参数是表名，存储空间名，第二个参数指定了猪键
var store = database.createObjectStore("users", {
    keyPath: "username"
});
```
表创建了之后可以向表中添加东西。add(object)和put(object)方法都可以，在已经存在相同键的时候，add会报错，put则是重写这个对象 
```js
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
```
3. 事务  
创建对象存储空间后，接下来的所有操作都是事务来完成的    

```js

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
```  

4. 使用游标查询  
使用事务查询，只能查询单个的， 检索多个对象的时候后就用到了游标，游标是指向结果集的指针    

```js
//使用游标
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

};
``` 
IDBCursor实例包含4个属性  
 * direction 数值，  默认值为IDBCursor.NEXT  (0)，下一项 ；IDBCursor.NEXT_NO_DUPLICATE(1),不重复的下一项，IDBCursor.PREV(2),前一项 ；IDBCursor.PREV_NO_DUPLICATE 前一不重复的项  
 * key  对象的键
 * value 实际的对象，输出的时候可以转化为JSON的字符串 
 * primaryKey  游标使用的键，可能是对象键，也可能是索引键 


使用游标也可以操作对应的记录，使用update(value)可以更新对应的value，并且也是一个异步的请求  

5. 键范围  
由于游标查询的方式有限，所以有了IDBKeyRange的实例，来限制见得范围 
```js
var IDBKeyRange = window.IDBKeyRange||window.webkitIDBKeyRang;

var lowerRange = IDBKeyRange.lowerBound("key");//从键key开始，然后可以移动到最后
//var lowerRange = IDBKeyRange.lowerBound("key"，true);//从键key的下一项开始，然后可以移动到最后
//var upperRange = IDBKeyRange.upperBound("key"[,true]);//从头开始，到（前一项）key为止 
//var boundRange = IDBKeyRange.bound(key1,key2[,true[,true]); 范围
// 使用游标
 request = store.openCursor(range);
``` 
6. 键方向  
在store.openCursor();还可以传入第二个参数指定键的方向 
```js
var IDBCursor = window.IDBCursor||window.webkitIDBCursor;
store.openCursor(range,IDBCursor.PREV;
//默认值为IDBCursor.NEXT  (0)，下一项 ；IDBCursor.NEXT_NO_DUPLICATE(1),不重复的下一项，IDBCursor.PREV(2),前一项 ；IDBCursor.PREV_NO_DUPLICATE 前一不重复的项 
```
7. 索引一个类似于游标的东西 没看懂
8. 并发 一个改变的时候另外一个马上关了就好了
9. 限制 5MB   
## 最佳事件   
###可维护性  
#### 要求 
可理解性 / 直观性 /可适应性 /可以扩展 / 可调试性  
#### 代码约定  
1. 可读性  
缩进 、 注释：函数、大段代码、复杂的算法   原因和返回值
2. 函数和变量命名
3. 变量类型要注释出来

#### 松散耦合 
js中尽量少用innerHtml这些动态生成html的语句，可以先在HTML中生成，然后隐藏了，到使用的时候，通过js调出来就行了    
ajax输出数据的时候，可以渲染层（jsp/php）来输出标记


尽量少用js来直接修改css的属性，多改变类名来实现 


事件处理程序和 应用处理程序接耦合，并且，从事件处理程序呢中，只传出event的具体项目  


#### 编程实践 

1. 不是你开发和维护的对象，不要为实例和原型添加属性、方法，并且不要重新定义已经存在的方法  
  可以 创建包含所需功能的新对象，并通过他与相关对象交互；创建自定义类型，继承和需要修改的类型，然后添加额外的功能 
2. 避免全局变量  ，用自执行函数和其他对象来隔离这些 
3. 避免与null比较  
4. 使用常量： “国际化有用”


###性能  

#### 注意作用域  
访问全局作用域对象属性，一定比局部的慢，因为需要在作用域连上查找

1. 避免全局查找  
使用全局变量和函数比局部的开销要大很多，看下常见的document的优化  

```js
function updateUI(){
    var doc = document;
    var imgs = doc.getElementByTagname("img");
    for(var i=0,len=imgs.length;i<len;i++){
        imgs[i].title = doc.title + "image"+i;
    };
    var msg = doc.getElementById("msg");
    msg.innerHTML = "Update"
}
```
只用了一次全局查找document，函数中尽量全局变量本地化  

2. 避免with
#### 选择正确的方法 
1. 避免不必要的属性查找
数组和常量的操作是O(1),对象是O（n），便利数组也是O（n）；并且使用变量和数组，要比对象的属性更有效率   
一旦多次用到对象属性，应该将其保存在局部变量中  
2. 优化循环
一定要把len初始化，然后传入判断条件   
简化终止条件  
简化循环体   
使用后测试循环  
3. 展开循环  

  * 对于数据少的循环，可以直接展开他
  * 如果循环的次数不能确定，可以考虑DUFF装置

```js
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
```

4. 避免用js解析js代码  
5.  原生方法快（Math中的方法们 ）  ，switch比if-elseif快，   位运算快（去摸，逻辑 与  或）
#### 最小化语句数  
完成多个操作的单语句比完成单个操作的多语句快 
1. 多变量声明     直接用一个var 加多个逗号反应快 
2. 插入迭代值     var name = values[i];i++;    =>     var name = values[i++];
3. 使用数组和对象字面量的时候  一次性整体初始化

#### 优化DOM交互
1. 最小化现场更新  
页面已经显示了之后，需要更新部分内容成为现场更新，  不管插入还是移除都会拖慢浏览器，因为他需要重新计算整个页面的无数尺寸   
一旦需要更新dom，请考虑使用文档片段更新 ,文档片段添加的时候只会添加子节点，片段本身不会添加  
```js
var list = document.getElementByID("myList"),
    fragment = document.createDocumentFragment(),
    item,
    i;
for(i=0;i<10;i++){
    item = document.createElement("li");
    fragment.appendChild(item);
    item.appendChild(document.createTextNode("item"+i));
}
list.appendChild(fragment);
```
2. 使用innerHtml  
innerHtml比js快的多
3. 使用事件代理
4. 注意HTMLCollection  
循环的时候把length初始化，并将每一项用一个局部变量引用了，再处理    
### 部署  
构建过程尽量分成多个文件 ，多个注释    
部署的时候，需要把代码合并成一个，并进行压缩


## 新兴API 
###File
####File类型 
实例只包含 name  size type（MIME） lastModefied 属性  
通过检测change事件可以访问file

#### FileReader
类似于XMLHttpRequest  