;(function($, undefined){
  var prefix = '', eventPrefix,
    vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
    testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    transform,
    transitionProperty, transitionDuration, transitionTiming, transitionDelay,
    animationName, animationDuration, animationTiming, animationDelay,
    cssReset = {}

  function dasherize(str) { return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() }

  $.each(vendors, function(vendor, event){
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + vendor.toLowerCase() + '-'
      eventPrefix = event
      return false
    }
  })

  transform = prefix + 'transform'
  cssReset[transitionProperty = prefix + 'transition-property'] =
  cssReset[transitionDuration = prefix + 'transition-duration'] =
  cssReset[transitionDelay    = prefix + 'transition-delay'] =
  cssReset[transitionTiming   = prefix + 'transition-timing-function'] =
  cssReset[animationName      = prefix + 'animation-name'] =
  cssReset[animationDuration  = prefix + 'animation-duration'] =
  cssReset[animationDelay     = prefix + 'animation-delay'] =
  cssReset[animationTiming    = prefix + 'animation-timing-function'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback, delay){
    if ($.isFunction(duration))
      callback = duration, ease = undefined, duration = undefined
    if ($.isFunction(ease))
      callback = ease, ease = undefined
    if ($.isPlainObject(duration))
      ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
    if (duration) duration = (typeof duration == 'number' ? duration :
                    ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
    if (delay) delay = parseFloat(delay) / 1000
    return this.anim(properties, duration, ease, callback, delay)
  }

  $.fn.anim = function(properties, duration, ease, callback, delay){
    var key, cssValues = {}, cssProperties, transforms = '',
        that = this, wrappedCallback, endEvent = $.fx.transitionEnd,
        fired = false

    if (duration === undefined) duration = $.fx.speeds._default / 1000
    if (delay === undefined) delay = 0
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 's'
      cssValues[animationDelay] = delay + 's'
      cssValues[animationTiming] = (ease || 'linear')
      endEvent = $.fx.animationEnd
    } else {
      cssProperties = []
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
        else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

      if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
      if (duration > 0 && typeof properties === 'object') {
        cssValues[transitionProperty] = cssProperties.join(', ')
        cssValues[transitionDuration] = duration + 's'
        cssValues[transitionDelay] = delay + 's'
        cssValues[transitionTiming] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, wrappedCallback)
      } else
        $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout

      fired = true
      $(this).css(cssReset)
      callback && callback.call(this)
    }
    if (duration > 0){
      this.bind(endEvent, wrappedCallback)
      // transitionEnd is not always firing on older Android phones
      // so make sure it gets fired
      setTimeout(function(){
        if (fired) return
        wrappedCallback.call(that)
      }, ((duration + delay) * 1000) + 25)
    }

    // trigger page reflow so new elements can animate
    this.size() && this.get(0).clientLeft

    this.css(cssValues)

    if (duration <= 0) setTimeout(function() {
      that.each(function(){ wrappedCallback.call(this) })
    }, 0)

    return this
  }

  testEl = null
})(Zepto)
var Scroll = function(opts) {
    opts = opts || {};
    //检测设备事件支持，确定使用鼠标事件或者touch事件
    this._checkEventCompatibility();
    this._setBaseParam(opts);
    this._addEvent();

    this._initScrollBar();
};

Scroll.prototype = {
    constructor: Scroll,
    //检测设备事件兼容
    _checkEventCompatibility: function() {
        var isTouch = 'ontouchstart' in document.documentElement;

        this.start = isTouch ? 'touchstart' : 'mousedown';
        this.move = isTouch ? 'touchmove' : 'mousemove';
        this.end = isTouch ? 'touchend' : 'mouseup';
        this.startFn;
        this.moveFn;
        this.endFn;
    },
    //基本参数设置
    _setBaseParam: function(opts) {
        this.timeGap = 0; //时间间隔
        this.touchTime = 0; //开始时间
        this.isMoveing = false; //是否正在移动
        this.moveState = 'up'; //移动状态，up right down left
        this.oTop = 0; //拖动前的top值
        this.curTop = 0; //当前容器top
        this.mouseY = 0; //鼠标第一次点下时相对父容器的位置
        this.animateParam = opts.animateParam || [10, 8, 6, 5, 4, 3, 2, 1, 0, 0, 0]; //动画参数
        this.cooling = true; //是否处于冷却时间
        this.steplen = 25; //动画步长

        this.wrapper = opts.wrapper || $('body');
        this.dragEl = opts.body;
        this.wrapper.css({ 'position': 'absolute', 'overflow': 'hidden' });
        this.dragEl.css('position', 'absolute');
        this.wrapper.append(this.dragEl);
    },
    _initScrollBar: function() {
        if (!this.dragHeight) {
            this.dragHeight = this.dragEl.offset().height; //拖动元素高度
            this.wrapperHeight = this.wrapper.offset().height;
        }
        //滚动条缩放比例
        this.scrollProportion = this.wrapperHeight / this.dragHeight;
        this.isNeedScrollBar = true;
        //该种情况无需滚动条
        if (this.scrollProportion >= 1) {
            this.isNeedScrollBar = false;;
            return false;
        }
        //滚动条
        this.scrollBar = $('<div style="background-color: rgba(0, 0, 0, 0.498039);border: 1px solid rgba(255, 255, 255, 0.901961); width: 5px; border-radius: 3px;  position: absolute; right: 1px; opacity: 0.2;  "></div>');
        this.wrapper.append(this.scrollBar);
        this.scrollHeight = parseInt(this.scrollProportion * this.wrapperHeight);
        this.scrollBar.css('height', this.scrollHeight);
    },
    _setScrollTop: function(top, duration) {
        //滚动条高度
        if (this.isNeedScrollBar) {
            top = this._getResetData(top).sTop;
            top = top < 0 ? (top + 10) : top;

            var scrollTop = top * (-1);
            if (typeof duration == 'number') {
                var _top = parseInt(scrollTop * this.scrollProportion) + 'px';
                this.scrollBar.animate({
                    '-webkit-transform': 'translate3d(0, ' + _top + ', 0)'
                }, duration, 'linear');

            } else {
                var _st = parseInt(scrollTop * this.scrollProportion)
                this.scrollBar.css('-webkit-transform', 'translate3d(0, ' + _st + 'px, 0)');
            }
            this.scrollBar.css('opacity', '0.8');
        }
    },
    _hideScroll: function() {
        if (this.isNeedScrollBar) {
            this.scrollBar.css({ 'opacity': '0.2' });
        }
    },
    _addEvent: function() {
        var scope = this;
        this.startFn = function(e) {
            scope._touchStart.call(scope, e);
        };
        this.moveFn = function(e) {
            scope._touchMove.call(scope, e);
        };
        this.endFn = function(e) {
            scope._touchEnd.call(scope, e);
        };
        this.dragEl[0].addEventListener(this.start, this.startFn, false);
        document.addEventListener(this.move, this.moveFn, false);
        document.addEventListener(this.end, this.endFn, false);
    },
    removeEvent: function() {
        this.dragEl[0].removeEventListener(this.start, this.startFn);
        document.removeEventListener(this.move, this.moveFn);
        document.removeEventListener(this.end, this.endFn);
    },
    _touchStart: function(e) {
        var scope = this;
        if (this.isMoveing) { e.preventDefault();
            return false; }

        this.clickEl = e.target;

        //非运动情况关闭冷却时间
        this.cooling = false;
        this.touchTime = e.timeStamp;
        var pos = this.getMousePos((e.changedTouches && e.changedTouches[0]) || e);
        //        var top = parseFloat(this.dragEl.css('top')) || 0;
        var top = this._cssTranslate(this.dragEl);
        this.mouseY = pos.top - top;
    },
    _touchMove: function(e) {
        if (this.cooling) { e.preventDefault();
            return false; }

        this.isMoveing = true;

        var pos = this.getMousePos((e.changedTouches && e.changedTouches[0]) || e);

        //防止点击时候跳动
        if (Math.abs((pos.top - this.mouseY) - this.curTop) < 10) { e.preventDefault();
            return false; }

        //先获取相对容器的位置，在将两个鼠标位置相减
        this.curTop = pos.top - this.mouseY;

        var resetData = this._getResetData(this.curTop);
        if (resetData.needReset) {
            this.curTop = this._resetEdge(this.curTop);
        }

        //        this.dragEl.css('top', this.curTop + 'px');
        this._cssTranslate(this.dragEl, this.curTop);

        this._setScrollTop(this.curTop);
        e.preventDefault();

    },
    _touchEnd: function(e) {

        if (this._needFocus(this.clickEl)) {
            $(this.clickEl).focus();
            return;
        }


        if (this.cooling) { e.preventDefault();
            return false; }
        if (Math.abs(this.oTop - this.curTop) < 10) { e.preventDefault();
            return false; }
        //一次动作结束，开启冷却时间
        this.cooling = true;
        var scope = this;
        this.timeGap = e.timeStamp - this.touchTime;
        var flag = this.oTop < this.curTop ? 1 : -1; //判断是向上还是向下滚动
        this.moveState = flag > 0 ? 'up' : 'down';

        var step = parseInt(this.timeGap / 10 - 10);
        step = step > 0 ? step : 0;
        var speed = this.animateParam[step] || 0;
        var increment = speed * this.steplen * flag;
        var top = this.curTop;
        top += increment;

        var resetData = this._getResetData(top);
        if (resetData.needReset) {
            top = this._resetEdge(top);
            speed = 0;
        }

        //！！！此处动画可能导致数据不同步，后期改造需要加入冷却时间
        if (this.oTop != this.curTop && this.curTop != top) {
            var duration = 100 + (speed * 20);
            top += increment;
            this.dragEl.animate({
                '-webkit-transform': 'translate3d(0, ' + top + 'px, 0)'
            }, duration, 'linear', function() {
                scope.reset.call(scope, top);

            });
            this._setScrollTop(top, duration);
        } else {
            this.isMoveing = false;
            this.oTop = top;
            this.reset(top);
            this.cooling = false; //关闭冷却时间
        }
        this._hideScroll();
        e.preventDefault();
    },
    _resetEdge: function(top) {
        var h1 = parseInt(this.wrapperHeight / 3);
        var h2 = parseInt(this.dragHeight * (-1) + this.wrapperHeight * (2 / 3));
        if (top > 0 && top > h1) top = h1;
        if (top < 0 && top < h2) top = h2;
        return top;
    },
    _getResetData: function(top) {
        var needReset = false;
        var sTop = top;
        if (top < (-1) * (this.dragHeight - this.wrapperHeight)) { top = (-1) * (this.dragHeight - this.wrapperHeight);
            needReset = true; }
        if (top > 0) { top = 0;
            needReset = true; }

        return {
            top: top,
            sTop: sTop,
            needReset: needReset
        };
    },
    //超出限制后位置还原
    reset: function(top) {
        var scope = this;
        var needReset = this._getResetData(top).needReset;
        var top = this._getResetData(top).top;

        if (needReset) {
            scope.dragEl.animate({
                '-webkit-transform': 'translate3d(0, ' + top + 'px, 0)'

            }, 50, 'linear', function() {
                scope._reset(top);
                scope._setScrollTop(top);

            });
        } else {
            scope._reset(top);
        }
    },
    _reset: function(top) {
        this.oTop = top;
        this.curTop = top;
        this.isMoveing = false;
        this.cooling = false; //关闭冷却时间
    },
    //暂时仅用于，操作Y值
    _cssTranslate: function(el, y) {
        if (!el) return 0;
        if (typeof y == 'number') {
            el.css('-webkit-transform', 'translate3d(0, ' + y + 'px, 0)');
        }
        var data = /\((.*)\)/.exec(el.css('-webkit-transform'));
        if (data && typeof data[1] == 'string') data = data[1].split(',');
        if (data && typeof data[1] == 'string') return parseInt(data[1]);
        return 0;
    },
    _needFocus: function(el) {
        switch (el.nodeName.toLowerCase()) {
            case 'textarea':
            case 'select':
                return true;
            case 'input':
                switch (el.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }
                return !el.disabled && !el.readOnly;
            default:
                return (/\bneedfocus\b/).test(el.className);
        }
    },
    //获取鼠标信息
    getMousePos: function(event) {
        var top, left;
        top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        left = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
        return {
            top: top + event.clientY,
            left: left + event.clientX
        };
    }
};

module.exports = Scroll;
