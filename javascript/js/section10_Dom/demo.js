window.onload = function () {
    /**
     * NodeList
     */

    /* var ul_node = document.createElement("ul");
     var childnode =ul_node.childNodes;          //传递的是对象的指针
     var len = ul_node.childNodes.length;        //只传递的是数值
     for (i =0;i<5;i++){
        console.log(len);                        //不会变       
        console.log(ul_node.childNodes.length);  // 动态访问会实时更新
        console.log(childnode);                  //会实时更新
        console.log(ul_node.childNodes);         //会实时更新
        ul_node.appendChild(document.createElement("li"));
     }*/
    /*    var ul_node = document.createElement("ul");
        var childnode =ul_node.getElementsByTagName("li");          //传递的是对象的指针
        var len = childnode.length;        //只传递的是数值
        for (i =0;i<5;i++){
           console.log(len);                        //不会变       
           console.log(childnode.length);  // 动态访问会实时更新
           console.log(childnode);                  //会实时更新
           console.log(ul_node.getElementsByTagName("li"));         //会实时更新
           ul_node.appendChild(document.createElement("li"));
        }
        */
    /* var ul = document.getElementsByTagName("ul")[0];
     ul.childNodes[0].nodeValue = "<strong>哈哈</strong>" */
    /**
     * 转换为arrey的方法
     */
    /*function convertToArrey(args){
        var arr = null ;
        try{
            arr = Arrey.prototype.slice.call(args,0);//针对非ie浏览器
        }catch(err){
            arr = new Array();
            for (var i =0; i<arg.length;i++){
                arr.push(arg[i]);
            }
        }
        return arr;
    }


    var div1= document.getElementById("bai");
    console.log(div1.cloneNode(true));
    console.log(div1.cloneNode(false));*/

    /*    //table
        document.body.appendChild(table);
        var table = document.createElement("table");
        table.border = "1";
        table.width = "100%";
        //tbody
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        //row1
        var tr1 = document.createElement("tr");
        tbody.appendChild(tr1);
        var cell1_1 = document.createElement("td");
        cell1_1.appendChild(document.createTextNode("cell 1 1"));
        var cell1_2 = document.createElement("td");
        cell1_2.appendChild(document.createTextNode("cell 1 2"));
        tr1.appendChild(cell1_1);
        tr1.appendChild(cell1_2);
        //row2
        var tr2 = document.createElement("tr");
        tbody.appendChild(tr2);
        var cell2_1 = document.createElement("td");
        cell2_1.appendChild(document.createTextNode("cell 2 1"));
        var cell2_2 = document.createElement("td");
        cell2_2.appendChild(document.createTextNode("cell 2 2"));
        tr2.appendChild(cell2_1);
        tr2.appendChild(cell2_2);
    */
    //创建表格并添加
    var table = document.createElement("table");
    table.border = "1";
    table.width = "100%";
    document.body.appendChild(table);
    //  创建体
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    // 创建第一行

    tbody.insertRow(0);
    tbody.rows[0].insertCell(0);
    tbody.rows[0].cells[0].appendChild(document.createTextNode("cell 1_1"));
    tbody.rows[0].insertCell(1);
    tbody.rows[0].cells[1].appendChild(document.createTextNode("cell 1_2"));
    //创建第二行
    tbody.insertRow(1);
    tbody.rows[1].insertCell(0);
    tbody.rows[1].cells[0].appendChild(document.createTextNode("cell 2_1"));
    tbody.rows[1].insertCell(1);
    tbody.rows[1].cells[1].appendChild(document.createTextNode("cell 2_2"));








}