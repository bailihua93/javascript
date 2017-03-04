window.onload = function () {
    function getElement(id) {
        if (document.getElementById) {
            return document.getElementById('id');
        } else if (document.all) {
            return document.all[id];
        }
    }

   var client = function(){
       // 识别呈现引擎
       var engine = {
           ie : 0,
           gecko : 0,
           webkit : 0,
           khtml : 0,
           opera : 0,
           //具体的版本号
           ver : null
       };

       return {
           engine : engine
       };
   }();
   

}