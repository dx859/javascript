## 自定义事件

观察者模式由两类对象组成：主体和观察者。主体负责发布事件，同时观察者通过订阅这些事件来
观察该主体。该模式的一个关键概念是主体并不知道观察者的任何事情，也就是说它可以独自存在并正
常运作即使观察者不存在。从另一方面来说，观察者知道主体并能注册事件的回调函数（事件处理程序）。
涉及 DOM 上时，DOM 元素便是主体，你的事件处理代码便是观察者。

事件是与 DOM 交互的最常见的方式，但它们也可以用于非 DOM 代码中——通过实现自定义事件。
自定义事件背后的概念是创建一个管理事件的对象，让其他对象监听那些事件。实现此功能的基本模式
可以如下定义：

```js
function EventTarget() {
    this.handlers = {};
}

EventTarget.prototype = {
    consturctor: EventTarget,
    addHandler: function(type, handler) {
        if (typeof this.handlers[type] == 'undefined') {
            this.handlers[type] = [];
        }

        this.handlers[type].push(handler);
    },
    fire: function(event) {
        if (!event.target) {
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i](event);
            }
        }
    },
    removeHandler: function(type, handler) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
};
```

addHandler()方法接受两个参数：事件类型和用于处理该事件的函数。当调用该方法时，会进行
一次检查，看看 handlers 属性中是否已经存在一个针对该事件类型的数组；如果没有，则创建一个新
的。然后使用 push()将该处理程序添加到数组的末尾。

如果要触发一个事件，要调用 fire()函数。该方法接受一个单独的参数，是一个至少包含 type
属性的对象。fire()方法先给 event 对象设置一个 target 属性，如果它尚未被指定的话。然后它就
查找对应该事件类型的一组处理程序，调用各个函数，并给出 event 对象。因为这些都是自定义事件，
所以 event 对象上还需要的额外信息由你自己决定。

removeHandler()方法是 addHandler()的辅助，它们接受的参数一样：事件的类型和事件处理
程序。这个方法搜索事件处理程序的数组找到要删除的处理程序的位置。如果找到了，则使用 break
操作符退出 for 循环。然后使用 splice()方法将该项目从数组中删除。