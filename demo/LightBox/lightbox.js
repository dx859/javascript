;(function($){
    
var LightBox = function() {
    var self = this;

    // 创建遮罩和弹出框    
    this.popupMask = $('<div id="G-lightbox-mask">');
    this.popupWin = $('<div id="G-lightbox-popup">');

    // 保存BODY
    this.bodyNode = $(document.body);

    // 渲染剩余的DOM，并且插入到BODY
    this.renderDOM();

    this.picViewArea = this.popupWin.find('lightbox-pic-view'); // 图片预览区域
    this.popupPic = this.popupWin.find('img.lightbox-image'); // 图片
    this.picCaptionArea = this.popupWin.find('div.lightbox-pic-caption'); // 图片描述区域
    this.nextBtn = this.popupWin.find('span.lightbox-prev-btn');
    this.nextBtn = this.popupWin.find('span.lightbox-next-btn');
    this.captionText = this.popupWin.find('p.lightbox-pic-desc');
    this.currentIndex = this.popupWin.find('span.lightbox-of-index');// 
    this.closeBtn = this.popupWin.find('span.lightbox-close-btn'); //关闭按钮


    // 准备事件委托，获取数组数据
    this.groupName = null;
    this.groupData = [];
    this.bodyNode.delegate('.js-lightbox, *[data-role=lightbox]',"click", function(e) {
        // 阻止事件冒泡
        e.stopPropagation();
        
        var currentGroupName = $(this).attr("data-group");
        if (currentGroupName !== self.groupName) {
            self.groupName = currentGroupName;
            // 根据当前组名获取同一组数据
            self.getGroup();
        }

        // 初始化弹出
        self.initPopup($(this));

    });
}

LightBox.prototype = {
    constructor: LightBox,

    showMaskAndPopup: function(sourceScr, currentId) {
        var self = this;
        
        this.popupMask.fadeIn();
        
        var winWidth = $(window).width(),
            winHeight = $(window).height();

        this.picViewArea.css({
            width: winWidth/2,
            height: winHeight/2
        });
        this.popupWin.fadeIn();

        var viewHeight = winHeight/2 + 10;
        this.popupWin.css({
            width: winWidth/2 + 10,
            height: winHeight/2 + 10,
            marginLeft: -(winWidth/2 + 10)/2,
            top: -viewHeight
        })
        .animate({
            top: (winWidth - viewHeight)/2
        }, function() {
            
        });
    },

    initPopup: function(currentObj) {
        var self = this,
            sourceScr = currentObj.attr('data-source'),
            currentId = currentObj.attr('data-id');

        this.showMaskAndPopup(sourceScr, currentId);
    },

    getGroup: function() {
        var self = this;

        // 根据当前组别的名称获取页面中所有当前组别的对象
        var groupList = this.bodyNode.find('*[data-group='+this.groupName+']');
        // 清空数组数据
        this.groupData.length = 0;
        groupList.each(function() {
            self.groupData.push({
                src: $(this).attr('data-source'),
                id: $(this).attr('data-id'),
                caption: $(this).attr('data-caption')
            });
        });
    },

    renderDOM: function() {
        var strDom = '<div class="lightbox-pic-view">' +
            '<span class="lightbox-btn lightbox-prev-btn"></span>' +
            '<img class="lightbox-image" src="images/1-1.jpg">' +
            '<span class="lightbox-btn lightbox-next-btn"></span>' +
            '</div>' +
            '<div class="lightbox-pic-caption">' +
            '<div class="lightbox-caption-area">' +
            '<p class="lightbox-pic-desc">图片标题</p>' +
            '<span class="lightbox-of-index">当前索引：0 of 0</span>' +
            '</div>' +
            '<span class="lightbox-close-btn"></span>' +
            '</div>';

        // 插入到this.popupWin
        this.popupWin.html(strDom);
        // 把遮罩和弹出框插入到body
        this.bodyNode.append(this.popupMask,this.popupWin);
    }
}

window['LightBox'] = LightBox;


})(jQuery)