{
	/*
		 // Place your snippets for JavaScript here. Each snippet is defined under a snippet name and has a prefix, body and 
		 // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
		 // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
		 // same ids are connected.
		 // Example:
		 "Print to console": {
			"prefix": "log",
			"body": [
				"console.log('$1');",
				"$2"
			],
			"description": "Log output to console"
		}


	*/

	" rewrite constructor": {
		"prefix": "reconstructor",
		"body": [
			"Object.defineProperty($1.prototype,\"constructor\",{",
			"enumerable : false,",
			"value : $1",
			"});"
		],
		"description": "rewrite constructor"
	},


	// 当做一个个独立的属性
	"Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	},
	"how to extend": {
		"prefix": "extend_best",
		"body": [

			"//直接抽取父级原型改成自己的原型，sub为子构造函数，sup为父构造函数",
			"function inheritPrototype(subType,supperType){",
			"    var prototype = supperType.protoType;",
			"    prototype.constructor = subType ;",
			"    subType.prototype = prototype ;",
			"}",
			"",
			"//定义　父级构造函数",
			"function SupperType(){",
			"",
			"}",
			"SupperType.prototype ={}",
			"",
			"",
			"//定义　　自己构造函数",
			"function SubType(arg){",
			"    SuperType.apply(this);",
			"    //添加别的属性也在这里并且可以自定义属性也",
			"}",
			"inheritPrototype(SubType,SupperType);",
			"//自定义子类的原型方法",
			"subtype.protoType.name_function = function(){",
			"",
			"}"
		],
		"description": "寄生组合继承法"
	},
	" use as block": {
		"prefix": "block_imitate",
		"body": [
			"(function(){", 　"//这里是私有作用域，　一旦执行后没有任何引用，只会销毁",
			"$1",
			"})()"
		],
		"description": "imitate block environment"
	},
	"pagewidth and pageHeight": {
		"prefix": "pageWidth_pageHeight",
		"body": [
			"		// 窗口大小无法确认，只能确认页面的视口大小", 　
			"  var pageWidth = window.innerWidth;",
			"  var pageHeight = window.innerHeight;",
			"  /*针对ie8  以下的部分*/",
			"  if(typeof pageWidth != \"number\"){",
			"     //  标准模式",
			"      if(document.compatMode == \"CSS1Compat\"){",
			"          pageWidth = document.documentElement.clientWidth;",
			"          pageHeight = document.documentElement.clientHeight;",
			"      }else{",
			"         pageWidth = document.body.clientWidth;",
			"         pageHeight =document.body.clientHeight;",
			"      }",
			"  }"
		],
		"description": "viewport_width_height"
	},
	"getQueryStringArgs": {
		"prefix": "getQueryStringArgs",
		"body": [
			"function getQueryStringArgs() {                                             ",
			" //获取没有没有问号的字符串",
			" var qs = (location.search.length > 0) ? location.search.substring(1) : \"\",",
			"     //保存数据的对象，这是个全局的变量　　？？？？",
			"     args = {},",
			"     //取得每一项",
			"     items = qs.length ? qs.split(\"&\") : [],",
			"     item = null,",
			"     name = null,",
			"     value = null,",
			"     // 循环用",
			"     i = 0,",
			"     len = items.length;",
			"     // 取出每一项",
			"     for(i =0;i<len;i++){",
			"         item =items[i].split(\"=\");",
			"         name =decodeURIComponent(item[0]);",
			"         value = decodeURIComponent(item[1]);",
			"         if(name.length){",
			"            args[name] = value;",
			"         }",
			"     }",
			"     return args;",
			" }"
		],
		"description": "get the Args of queryStiing"
	},
	"isHostMethod": {
		"prefix": "isHostMethod",
		"body": [
			"//  不是最好的，需要修改可能                                                         ",
			"function isHostMethod(object,property){",
			"  var t = typeof object[property];",
			"    return t == 'function'||",
			"  (!!(t == 'object'&&object[property]) )||t == 'unknown';",
			"}"
		],
		"description": "check the object have property ,return bullean"
	}





}