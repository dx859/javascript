import { addEvent, removeEvent, tap, click, browser, eventType, getTime } from './util';


class Scroll {

    constructor(wrapper, options) {
        this.wrapper = wrapper;
        this.scroller = this.wrapper.children[0];
        this.scrollerStyle = this.scroller.style;
        this.options = {
            resizeIndicator: true,
            mouseWheelSpeed: 20,
            snapThreshold: 0.334,

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

        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.directionY = 0;
        this._events = {};

        this._init();
    }

    _init() {

        this._initEvents();

        if (this.options.scrollbars || this.options.indicators) {
            this._initIndicators();
        }

        if (this.options.mouseWheel) {
            this._initWheel();
        }

        if (this.options.snap) {
            this._initSnap();
        }

        if (this.options.keyBindings) {
            this._initKeys();
        }
    }

    _initEvents(remove) {
        var eventType = remove ? removeEvent : addEvent,
            target = this.options.bindToWrapper ? this.wrapper : window;

        eventType(window, 'orientationchange', this);
        eventType(window, 'resize', this);

        if (browser.hasTouch && !this.options.disableTouch) {
            eventType(this.wrapper, 'touchstart', this._start);
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

        if (eventType[e.type] != 1) {
            if (e.button !== 0) {
                return;
            }
        }

        // if (!this.enabled || (this.initiated && eventType[e.type] !== this.initiated)) {
        //     return;
        // }

        let point = e.touches ? e.touches[0] : e,
            pos;

        this.initiated = eventType[e.type];
        this.moved = false;
        this.distX = 0;
        this.distY = 0;
        this.directionX = 0;
        this.directionY = 0;
        this.directionLocked = 0;

        // this._transitionTime();

        this.startTime = getTime();

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

        // this._execEvent('beforeScrollStart');


    }

}



module.exports = Scroll;
