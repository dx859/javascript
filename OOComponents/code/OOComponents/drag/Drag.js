var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function(e) {
        return e ? e : window.event;
    },
    getTarget: function(e) {
        return e.target || e.srcElement;
    },
    preventDefault: function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    stopPropagation: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }
};

var DragDrop = function() {
    var dragdrop = new EventTarget(),
        dragging = null,
        diffX = 0,
        diffY = 0;

    function handlerEvent(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        switch (event.type) {
            case 'mousedown':
                if (target.className.indexOf('draggable') > -1) {
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    dragdrop.fire({ type: "dragstart", target: dragging, x: event.clientX, y: event.clientY });
                }
                break;
            case 'mousemove':
                if (dragging !== null) {
                    dragging.style.left = (event.clientX - diffX) + 'px';
                    dragging.style.top = (event.clientY - diffY) + 'px';
                    dragdrop.fire({ type: "drag", target: dragging, x: event.clientX, y: event.clientY });
                }
                break;
            case 'mouseup':
                dragdrop.fire({ type: "dragend", target: dragging, x: event.clientX, y: event.clientY });
                dragging = null;
                break;
        }
    }
    // 公共接口
    dragdrop.eable = function() {
        EventUtil.addHandler(document, "mousedown", handlerEvent);
        EventUtil.addHandler(document, "mousemove", handlerEvent);
        EventUtil.addHandler(document, "mouseup", handlerEvent);
    };
    dragdrop.disable = function() {
        EventUtil.removeHandler(document, "mousedown", handlerEvent);
        EventUtil.removeHandler(document, "mousemove", handlerEvent);
        EventUtil.removeHandler(document, "mouseup", handlerEvent);
    };

    return dragdrop;
}();

DragDrop.eable();

DragDrop.addHandler('dragstart', function(event) {
    var status = document.getElementById('status');
    status.innerHTML = "Start dragging" + event.target.id;
});

DragDrop.addHandler('drag', function(event) {
    var status = document.getElementById('status');
    status.innerHTML = "<br> Dragged " + event.target.id + " to(" + event.x + "," + event.y + ")";
});

DragDrop.addHandler('dragend', function(event) {
    var status = document.getElementById('status');
    status.innerHTML = "<br> Dropped " + event.target.id + " to(" + event.x + "," + event.y + ")";
});
