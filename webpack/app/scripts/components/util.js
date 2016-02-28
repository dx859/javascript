var _elementStyle = document.createElement('div').style;
var _vendor = (function() {
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
        transform, i;

    for (let i = 0, l = vendors.length; i < l; i++) {
        transform = vendors[i] + 'ransform';
        if (transform in _elementStyle) {
            return vendors[i].substr(0, vendors[i].length - 1);
        }
    }
    return false;
})();

function _prefixStyle(style) {
    if (_vendor === false) return false;
    if (_vendor === "") return style;
    return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

var getTime = Date.now || new Date().getTime();

function extend(target, obj) {
    for (let x in obj) {
        target[x] = obj[x];
    }
}

function addEvent(el, type, fn, capture = false) {
    el.addEventListener(type, fn, capture);
}

function removeEvent(el, type, fn, capture = false) {
    el.removeEventListener(typem, fn, capture);
}

function momentum(current, start, time, lowerMargin, wrapperSize) {
    var distance = current - start,
        speed = Math.abs(distance) / time,
        destination,
        duration,
        deceleration = 0.00006;

    destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
    duration = speed / deceleration;

    if (destination < lowerMargin) {
        destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
    } else if (destination > 0) {
        destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
    }

    return {
        destination: Math.round(destination),
        duration: duration
    };
}

var _transform = _prefixStyle('transform');

var browser = {
    hasTransform: _transform !== false,
    hasPerspective: _prefixStyle('perspective') in _elementStyle,
    hasTouch: 'ontouchstart' in window,
    hasPointer: navigator.msPointerEnabled,
    hasTransition: _prefixStyle('transition') in _elementStyle
};

var style = {
    transform: _transform,
    transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
    transitionDuration: _prefixStyle('transitionDuration'),
    transitionDelay: _prefixStyle('transitionDelay'),
    transformOrigin: _prefixStyle('transformOrigin')
};

function hasClass(e, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
    return re.test(e.className);
}

function addClass(e, c) {
    if (hasClass(e, c)) return;

    let newclass = e.className.splice(' ');
    newclass.push(c);
    e.className = newclass.join(' ');
}

function removeClass(e, c) {
    if (!hasClass(e, c)) return;

    let re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
    e.className = e.className.replace(re, ' ');
}

// 获取元素的真正的位置
function offset(el) {
    var left = -el.offsetLeft,
        top = -el.offsetTop;

    // jshint -W084
    while (el = el.offsetParent) {
        left -= el.offsetLeft;
        top -= el.offsetTop;
    }
    // jshint +W084

    return {
        left: left,
        top: top
    };
}

var eventType = {
    touchstart: 1,
    touchmove: 1,
    touchend: 1,

    mousedown: 2,
    mousemove: 2,
    mouseup: 2,

    MSPointerDown: 3,
    MSPointerMove: 3,
    MSPointerUp: 3
};

// 动画曲线
var ease = {
    quadratic: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn: function(k) {
            return k * (2 - k);
        }
    },
    circular: {
        style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
        fn: function(k) {
            return Math.sqrt(1 - (--k * k));
        }
    },
    back: {
        style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        fn: function(k) {
            var b = 4;
            return (k = k - 1) * k * ((b + 1) * k + b) + 1;
        }
    },
    bounce: {
        style: '',
        fn: function(k) {
            if ((k /= 1) < (1 / 2.75)) {
                return 7.5625 * k * k;
            } else if (k < (2 / 2.75)) {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            } else if (k < (2.5 / 2.75)) {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            } else {
                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }
        }
    },
    elastic: {
        style: '',
        fn: function(k) {
            var f = 0.22,
                e = 0.4;

            if (k === 0) {
                return 0;
            }
            if (k == 1) {
                return 1;
            }

            return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
        }
    }
};

// 自定义点击事件
function tap(e, eventName) {
    var ev = document.createEvent('Event');
    ev.initEvent(eventName, true, true);
    ev.pageX = e.pageX;
    ev.pageY = e.pageY;
    e.target.dispatchEvent(ev);
}

function click(e) {
   var target = e.target,
       ev;

   if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
       ev = document.createEvent('MouseEvents');
       ev.initMouseEvent('click', true, true, e.view, 1,
           target.screenX, target.screenY, target.clientX, target.clientY,
           e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
           0, null);

       ev._constructed = true;
       target.dispatchEvent(ev);
   }
}

export {
    browser,
    style,
    extend,
    hasClass,
    removeClass,
    addEvent,
    removeEvent,
    getTime,
    extend,
    momentum,
    offset,
    tap,
    click,
    eventType,
    ease
};