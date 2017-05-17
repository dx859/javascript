import './dialog.css';

import * as Tools from '../tools/tools';
import EventTarget from '../tools/eventTarget';

function Dialog() {
    EventTarget.call(this);
    this.box = null;
    this.opts = {
        title: '系统消息',
        width: 500,
        height: 'auto',
        content: '',
        hasCloseBtn: false,
        hasMask: true,
        isDraggable: true,
        dragHandle: null,
        //设置alert的文案
        textForAlertBtn: '确定',
        //设置confirm的文案
        textForConfirmBtn: '确定',
        textForCancelBtn: '取消',
        //设置prompt的文案
        textForPromptBtn: '确定',
        defaultValueForPrompt: '',
        isPromptInputPassword: false,
        maxlengthForPrompt: 10,
        skinClassName: null,
        handlerForAlert: function(){},
        handlerForClose: function(){},
        handlerForConfirm: function(){},
        handlerForCancel: function(){},
        handlerForPrompt: function(){}
    };
}

Dialog.prototype = Tools.extend(EventTarget.prototype, {
    constructor: Dialog,
    render: function(container) {
        this.renderUI();
        this.bindUI();
        this.syncUI();
        (container || document.body).appendChild(this.box);
    },

    renderUI: function() {
        var html = '';
        switch (this.opts.type) {
            case 'alert':
                html = `
                <div class="window_boundingBox">
                    <div class="window_header">${this.opts.title}</div>
                    <div class="window_body">${this.opts.content}</div>
                    <div class="window_footer">
                        <input type="button" value="${this.opts.textForAlertBtn}" class="window_alertBtn">
                    </div>
                </div>
                `;
                break;
            case 'confirm':
                footerContent = `
                
                `;
                break;
        }

        this.box = Tools.buildDOM(html);

        if (this.opts.hasMask) {
            this._mask = document.createElement('div');
            this._mask.className = 'window_mask';
            document.body.appendChild(this._mask);
        }

        if (this.opts.hasCloseBtn) {
            this.closeBtn = Tools.buildDOM('<span class="window_closeBtn">×</span>');
            this.box.appendChild(this.closeBtn);
        }

    },

    bindUI: function() {
        this.box.addEventListener('click', this, false);
    },

    syncUI: function() {
        this.box.style.width = this.opts.width + 'px';
        this.box.style.height = this.opts.height + 'px';
        this.box.style.left = (window.innerWidth - this.opts.width) / 2 + 'px';
        this.box.style.top = (window.innerHeight - this.opts.height) / 2 + 'px';

        if (this.opts.skinClassName) {
            Tools.addClass(this.box, this.opts.skinClassName);
        }
    },
    destory: function() {
        if (this._mask) this._mask.remove();
        this.box.removeEventListener('click', this, false);
        this.box.parentNode.removeChild(this.box);
        this.handlers = {};
    },

    handleEvent: function(event) {
   
        if (Tools.hasClass(event.target, 'window_alertBtn')) {
            this.opts.handlerForAlert();
            this.fire('alert');
            this.destory();
        } else if (Tools.hasClass(event.target, 'window_closeBtn')) {
            this.opts.handlerForClose();
            this.fire('close');
            this.destory();
        }
    },

    alert: function(opts) {
        Tools.extend(this.opts, opts);
        this.opts.type = 'alert';
        this.render();
        return this;
    }
});





























module.exports = Dialog;
