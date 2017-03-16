window.onload = function(){

   /* var div2 = document.getElementById("div2");
    div2.insertAdjacentHTML("beforebegin","<p>beforebegin</p>");  //前面的同辈元素
    div2.insertAdjacentHTML("afterbegin","<p>afterbegin</p>");    //第一个子元素
    div2.insertAdjacentHTML("beforeend","<p>beforeEnd</p>");      //最后一子元素
    div2.insertAdjacentHTML("afterend","<p>afterEnd</p>");        //后一个同辈元素*/
    // var scroll = document.getElementById("scroll");
    // setTimeout(function() {
    //     scroll.scrollIntoView();
    // }, 5000);
/*    var divf = document.getElementById("mydiv");
    console.log(divf.children.length);
    console.log("\n");

    console.log(divf.childNodes.length);*/
    var mydiv = document.getElementById("mydiv");
    var div1 = document.getElementById("div1");
    var div3 = document.getElementById("div3");
    var div2 = document.getElementById("div2");
    var hello = document.getElementById("hello");
    /*console.log(div2.compareDocumentPosition(div3));
    console.log(div2.compareDocumentPosition(div1));
    console.log(div1.compareDocumentPosition(mydiv));
    console.log(mydiv.compareDocumentPosition(div1));
    console.log(hello.compareDocumentPosition(div1));*/
    console.log(mydiv.innerText);
    mydiv.innerText = "hello 小白";
    setTimeout(function() {
        mydiv.innerText = "hello   ,<b>\"read\"</b>";
        mydiv.innerText = mydiv.innerText;

        console.log(mydiv.innerText);
    }, 5000);
    
}