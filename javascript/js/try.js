var DragDrop = function () {
    var dragdrop = new EventTarget(),
        dragging = null,
        diffX = 0,
        diffY = 0;

    function handleEvent(event) {

        //获取对象
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        //确定事件类型  

        switch (event.type) {
            case "mousedown":
                if (target.className.indexOf("draggable") > -1) {
                    dragging = target;
                    diffX = event.clientX - event.offsetLeft;
                    diffY = event.clientY - event.offsetTop;
                    dragdrop.fire({
                        type: "dragstart",
                        target: dragging,
                        x: clientX,
                        y: clientY
                    });

                }
                break;
            case "mousemove":
                if (dragging != null) {
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                    dragdrop.fire({
                        type: "drag",
                        target: dragging,
                        x: event.clientX,
                        y: event.clientY
                    });

                }
                break;
            case "mouseup":
                dragdrop.fire({
                    type: "dragend",
                    target: dragging,
                    x: event.clientX,
                    y: event.clientY
                });
                break;
        }
    };
    //公共接口  
   dragdrop.enable = function(){
       EventUtil.addHandler(document,"mousedown",handleEvent);
       EventUtil.addHandler(document,"mousemove",handleEvent);
       EventUtil.addHandler(document,"mouseup",handleEvent);
   }
   dragdrop.disable = function(){
       EventUtil.removeHandler(document,"mousedown",handleEvent);
       EventUtil.removeHandler(document,"mousemove",handleEvent);
       EventUtil.removeHandler(document,"mouseup",handleEvent);
   }
}();

//事件的触发还是依赖与原始的事件根据不同的条件来触发的，
//触发函数中的type名字是自己定义的，目的是在触发滚动的同时，可以添加其他的额外代码，进行不同的协作用的  
// var c = function(){return y}()  ==var c = (funcition(){})();最终c是函数的返回值