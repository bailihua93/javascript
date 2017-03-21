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
     */
    var sheet = null;
    for (var i = 0, len = document.styleSheets.length; i < len; i++) {
        sheet = document.styleSheets[i];
        //    console.log(sheet.href);
    }
    var mydiv = document.getElementById("mydiv");
    /**
     * 取得元素的styleSheet
     * @param {*} element 
     */
    function getStyleSheet(element){
        return element.sheet||element.styleSheet;
    }
    var sheet = document.styleSheets[0];
    var rules =sheet.cssRules||sheet.rules;
    for(var rule in rules){
        
        console.log(rule.cssText);
        console.log(rule.selectorText);
        console.log(rule.style);
    }

}