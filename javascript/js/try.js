 function SpecialArray(){
     var values = new Array();

     values.push.apply(values,arguments);//这里apply主要用于传递参数
     values.toPipeString = function(){
         console.log(this.join("|"));
     }
     return values;
 }
var calors = new SpecialArray("red","blue");
var colars = SpecialArray("red","blue");
calors.toPipeString();
colars.toPipeString();