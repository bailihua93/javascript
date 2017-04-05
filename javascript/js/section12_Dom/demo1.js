window.onload = function () {
    /*  var mydiv = document.getElementById("mydiv");
    mydiv.setUserData("name", "bai", function () {});
    var value = document.body.getUserData("name");
*/
    /*
        var div = document.createElement("div");
        div.setUserData("name", "Bailihua", function (operation, key, value, src, dest) {
            if (operation == 1) {
                dest.setUserData(key, value, function () {});
            }
        });
        var newDiv = div.cloneNode(true);
        console.log(newDiv.getUserData("name"));*/
    /**
     * shylesheets
    //  */
    // var sheet = null;
    // for (var i = 0, len = document.styleSheets.length; i < len; i++) {
    //     sheet = document.styleSheets[i];
    //     //    console.log(sheet.href);
    // }
    // var mydiv = document.getElementById("mydiv");
    // /**
    //  * 取得元素的styleSheet
    //  * @param {*} element 
    //  */
    // function getStyleSheet(element){
    //     return element.sheet||element.styleSheet;
    // }
    // var sheet = document.styleSheets[0];
    // var rules =sheet.cssRules||sheet.rules;
    // for(var rule in rules){

    //     console.log(rule.cssText);
    //     console.log(rule.selectorText);
    //     console.log(rule.style);
    // }
   
/*//nodeIterator                                                                                                 
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
 }*/
    


/*
    var nodeIterator = document.createNodeIterator(
        ul,
        NodeFilter.SHOW_ELEMENT,
        function (node) {
            return node.nodeName.toLowerCase() === 'p' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    );
    var pars = [];
    var currentNode;

    while (currentNode = nodeIterator.nextNode()) {
        pars.push(currentNode);
    // }*/
    // var ul = document.getElementsByTagName("ul")[0];
    // console.log(ul);
    // console.log(typeof document.createRange);
    // console.log(document.implementation.hasFeature("Range","2.0"));
    // var range = document.createRange();
    //  console.log(typeof range.selectNode);
    // range.selectNodeContents(ul);
  
    // // var child = range.selectNodeContents(ul);
    // var startContainer,
    //     startOffset,
    //     endContainer,
    //     endOffset,
    //     commonAncestorContainer;
    // startContainer = range.startContainer;
    // startOffset = range.startOffset;
    // endContainer = range.endContainer;
    // endOffset = range.endOffset;
    // console.log(startContainer.nodeName+ " "+ startOffset+" " +endContainer.nodeName+ " "+ endOffset );
    // startContainer = child.startContainer;
    // startOffset = child.startOffset;
    // endContainer = child.endContainer;
    // endOffset = child.endOffset;
    // console.log(startContainer+ " "+ startOffset+" " +endContainer+ " "+ endOffset );
    var a =  document.querySelectorAll("ul li a")[0].firstChild;
    var ul = document.getElementsByTagName("ul")[0];
    var p = document.querySelectorAll("ul li p")[1].firstChild;
    var range = document.createRange();
    range.setStart(a,2);
    range.setEnd(p,4);
    console.log(ul);
    console.log(range);
    range.deleteContents();
    console.log(ul);

}