window.onload = function() {
    var aInput = document.getElementsByTagName('input');

    aInput[0].onclick = function() {
        var d1 = new Model({
            title: '登陆'
        });

    };
    aInput[1].onclick = function() {

        var d2 = new Model({
            width: 200,
            height: 100,
            direction: 'right',
        });

    };
};

function extend(newObj, oldObj) {
    for (var attr in oldObj) {
        newObj[attr] = oldObj[attr];
    }
}

function Model(opts) {
    // this.wrap = typeof select === 'string' ? document.querySelector(select) : select;
    this.wrap = null;
    // 默认配置参数
    this.setting = {
        width: 300,
        height: 300,
        direction: 'center',
        title: ''
    };
    opts = opts !== undefined ? opts : {};

    this.init(opts);
}

function viewWidth() {
    return document.documentElement.clientWidth;
}

function viewHeight() {
    return document.documentElement.clientHeight;
}

Model.prototype.init = function(opts) {
    extend(this.setting, opts);
    this.create();
};

Model.prototype.create = function() {
    this.wrap = document.createElement('div');
    this.wrap.className = 'login';
    this.wrap.innerHTML = '<div class="title">' +
        '<span>' + this.setting.title + '</span><span class="close">X</span>' +
        '</div>' +
        '<div class="content"></div>';

    this.setData();
    document.body.appendChild(this.wrap);
};

Model.prototype.setData = function() {
    this.wrap.style.width = this.setting.width + "px";
    this.wrap.style.height = this.setting.height + "px";
    switch (this.setting.direction) {
        case 'center':
            this.wrap.style.top = (viewHeight() - this.setting.height) / 2 + 'px';
            this.wrap.style.left = (viewWidth() - this.setting.width) / 2 + 'px';
            break;
        case 'right':
            this.wrap.style.right = 0;
            this.wrap.style.bottom = 0;
            break;
    }
};
