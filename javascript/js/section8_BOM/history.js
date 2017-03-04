window.onload = function(){
     location.href = "http://192.168.1.102:8080/section8_BOM/navigation.html/#1";
     location.href = "http://192.168.1.102:8080/section8_BOM/navigation.html/?i=hello2";
     location.assign( "http://192.168.1.102:8080/section8_BOM/navigation.html/?i=hello3");
     location.href = "http://192.168.1.102:8080/section8_BOM/navigation.html/?i=htllo&j=hhaha4";
     
     setTimeout(function() {
         history.go(-2);
     }, 5000);

     
}