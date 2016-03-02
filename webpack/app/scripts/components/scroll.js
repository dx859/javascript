import * as utils from './util';


class Scroll {

    constructor(el, options) {

        this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
        this.scroller = this.wrapper.children[0];
        this.scrollerStyle = this.scroller.style;
        this.options = {

            // INSERT POINT: OPTIONS 
            startX: 0,
            startY: 0,
            scrollY: true,
            directionLockThreshold: 5,
            momentum: true,

            bounce: true,
            bounceTime: 600,
            bounceEasing: '',

            preventDefault: true,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

            HWCompositing: true,
            useTransition: true,
            useTransform: true
        };

        for (let i in options) {
            this.options[i] = options[i];
        }

        // 一些默认值
        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.directionY = 0;
        this._events = {};

        this.enabled = true;

        this._init();
        this.refresh();
    }

    _init() {

        this._initEvents();

        // if (this.options.scrollbars || this.options.indicators) {
        //     this._initIndicators();
        // }

        // if (this.options.mouseWheel) {
        //     this._initWheel();
        // }

        // if (this.options.snap) {
        //     this._initSnap();
        // }

        // if (this.options.keyBindings) {
        //     this._initKeys();
        // }
    }

    _initEvents(remove) {
        var eventType = remove ? utils.removeEvent : utils.addEvent,
            target = this.options.bindToWrapper ? this.wrapper : window;

        eventType(window, 'orientationchange', this);
        eventType(window, 'resize', this);

        if (utils.browser.hasTouch && !this.options.disableTouch) {
 
            eventType(this.wrapper, 'touchstart', this);
            eventType(target, 'touchmove', this);
            eventType(target, 'touchcancel', this);
            eventType(target, 'touchend', this);
        }

        eventType(this.scroller, 'transitionend', this);
        eventType(this.scroller, 'webkitTransitionEnd', this);
        eventType(this.scroller, 'oTransitionEnd', this);
        eventType(this.scroller, 'MSTransitionEnd', this);
    }



    _start(e) {

        if (utils.eventType[e.type] != 1) {
            if (e.button !== 0) {
                return;
            }
        }

        // if (!this.enabled || (this.initiated && eventType[e.type] !== this.initiated)) {
        //     return;
        // }

        let point = e.touches ? e.touches[0] : e,
            pos;

        this.initiated = utils.eventType[e.type];
        this.moved = false;
        this.distX = 0;
        this.distY = 0;
        this.directionX = 0;
        this.directionY = 0;
        this.directionLocked = 0;

        this._transitionTime();

        this.startTime = utils.getTime();

        // if (this.options.useTransition && this.isInTransition) {
        //     this.isInTransition = false;
        //     pos = this.getComputedPosition();
        //     this._translate(Math.round(pos.x), Math.round(pos.y));
        //     this._execEvent('scrollEnd');
        // } else if (!this.options.useTransition && this.isAnimating) {
        //     this.isAnimating = false;
        //     this._execEvent('scrollEnd');
        // }

        this.startX = this.x;
        this.startY = this.y;
        this.absStartX = this.x;
        this.absStartY = this.y;
        this.pointX = point.pageX;
        this.pointY = point.pageY;

        this._execEvent('beforeScrollStart');
        console.log(this.startX, this.startY, this.startTime,this.pointX , this.pointY );

    }

    _move(e) {

        var point = e.touches ? e.touches[0] : e,
            deltaX = point.pageX - this.pointX,
            deltaY = point.pageY - this.pointY,
            timestamp = utils.getTime(),
            newX, newY,
            absDistX, absDistY;

        this.pointX = point.pageX;
        this.pointY = point.pageY;

        this.distX += deltaX;
        this.distY += deltaY;
        absDistX = Math.abs(this.distX);
        absDistY = Math.abs(this.distY);

        if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
            return;
        }
        
        deltaX = this.hasHorizontalScroll ? deltaX : 0;
        // deltaY = this.hasVerticalScroll ? deltaY : 0;

        newX = this.x + deltaX;
        newY = this.y + deltaY;

        this._translate(newX, newY);

        /* REPLACE START: _move */

        if ( timestamp - this.startTime > 300 ) {
            this.startTime = timestamp;
            this.startX = this.x;
            this.startY = this.y;
        }

        /* REPLACE END: _move */
    }

    _end(e) {
        var point = e.changedTouches ? e.changedTouches[0] : e,
            momentumX,
            momentumY,
            duration = utils.getTime() - this.startTime,
            newX = Math.round(this.x),
            newY = Math.round(this.y),
            distanceX = Math.abs(newX - this.startX),
            distanceY = Math.abs(newY - this.startY),
            time = 0,
            easing = '';

        this.endTime = utils.getTime();

        this.scrollTo(newX, newY);

        if (this.options.momentum && duration < 300) {
            momentumY = utils.momentum(this.y, this.startY, duration, this.maxScrollY);
            newY = momentumY.destination;
            time = momentumY.duration;
        }

        this.scrollTo(newX, newY, time, easing);


    }

    _transitionTime(time) {
        time = time || 0;
        this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';
    }

    _transitionTimingFunction(easing) {
        this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
    }

    _translate(x, y) {
        
        this.scrollerStyle[utils.style.transform] = 'translate3d(' + x + 'px,' + y + 'px, 0)';

        this.x = x;
        this.y = y;
    }

    _execEvent(type) {
        // if (!_this.events[type]) {
        //     return;
        // }

        // let i = 0,
        //     l = this._events[type].l
    }

    scrollTo(x, y, time, easing) {
        easing = easing || utils.ease.circular;
        this._transitionTimingFunction(easing.style);
        this._transitionTime(time);
        this._translate(x, y);

    }



    refresh() {
        var rf = this.wrapper.offsetHeight;

        this.wrapperWidth   = this.wrapper.clientWidth;
        this.wrapperHeight  = this.wrapper.clientHeight;

        this.scrollerWidth  = this.scroller.offsetWidth;
        this.scrollerHeight = this.scroller.offsetHeight;

        this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
        this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

        this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
        this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;


    }

    handleEvent(e) {
        switch (e.type) {
            case 'touchstart':
            case 'mousedown':
                this._start(e);
                break;
            case 'touchmove':
            case 'moushdown':
                this._move(e);
                break;
            case 'touchend':
            case 'mouseup':
                this._end(e)
                break;
        }
    }

}



module.exports = Scroll;
