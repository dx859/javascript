import Dialog from './dialog.js';


var d1 = new Dialog();

document.querySelector('.btn1').onclick = function() {

    d1.alert({
        title: '消息提示',
        width: 200,
        height: 'auto',
        content: 'Hello !',
        hasCloseBtn: true,
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
    }).addHandler('alert', function() {
       alert('alert')
    });

};
