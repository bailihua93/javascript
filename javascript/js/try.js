var indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB; //新的浏览器已经支持第一个

// 打开数据库
var request, database;
request = indexDB.open("DBName");
request.onerror = function (event) {
    console.log(event.target.errorCode);
}
request.onsuccess = function (event) {
    database = event.target.result;
    //所有的event.Target都指向request
}
//设置版本
var dbVersion;
if (database.version != "1.0") {
    request = database.setVersion("1.0");
    request.onerror = function (event) {
        console.log(event.target.errorCode);
    };
    request.onsuccess = function (event) {
        dbversion = database.version;
    }
} else {
    dbversion = database.version;
};




//对象
var user1 = {
    username: "001",
    firstName: "lihua",
    lastName: "bai",
    password: "foo"
}
var user2 = {
    username: "002",
    firstName: "lihua",
    lastName: "bai",
    password: "foo"
}
//创建表,这里传入的第一个参数是表名，存储空间名，第二个参数指定了猪键
var store = database.createObjectStore("users", {
    keyPath: "username"
});

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

//键范围
var IDBKeyRange = window.IDBKeyRange||window.webkitIDBKeyRang;

var lowerRange = IDBKeyRange.lowerBound("key");//从键key开始，然后可以移动到最后
//var lowerRange = IDBKeyRange.lowerBound("key"，true);//从键key的下一项开始，然后可以移动到最后
//var upperRange = IDBKeyRange.upperBound("key"[,true]);//从头开始，到（前一项）key为止 
//var boundRange = IDBKeyRange.bound(key1,key2[,true[,true]); 范围
// 使用游标
// request = store.openCursor(range);


// 使用游标
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