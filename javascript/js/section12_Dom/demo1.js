window.onload = function () {
  /*  var mydiv = document.getElementById("mydiv");
    mydiv.setUserData("name", "bai", function () {});
    var value = document.body.getUserData("name");
*/

    var div = document.createElement("div");
    div.setUserData("name", "Bailihua", function (operation, key, value, src, dest) {
        if (operation == 1) {
            dest.setUserData(key, value, function () {});
        }
    });
    var newDiv = div.cloneNode(true);
    console.log(newDiv.getUserData("name"));
}