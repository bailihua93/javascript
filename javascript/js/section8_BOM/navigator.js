window.onload　 = function () {
    function hasPlugin(name1) {
        var name = name1.toLowerCase();
        for (var i = 0; i < navigator.plugins.length; i++) {
            if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
                return true;
            }
        }
        return false;
    }
    console.log(hasPlugin("Flash"));
}