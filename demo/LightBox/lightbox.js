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

    this.picViewArea = this.popupWin.find('.lightbox-pic-view'); // 图片预览区域
    this.popupPic = this.popupWin.find('img.lightbox-image'); // 图片
    this.picCaptionArea = this.popupWin.find('div.lightbox-pic-caption'); // 图片描述区域
    this.prevBtn = this.popupWin.find('span.lightbox-prev-btn');
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

    // 关闭弹出
    this.popupMask.click(function() {
        $(this).fadeOut();
        self.popupWin.fadeOut();
    });
    this.closeBtn.click(function() {
        self.popupMask.fadeOut();
        self.popupWin.fadeOut();
    });

    // 绑定上下切换按钮事件
    this.flag = true;
    this.nextBtn.hover(function(){
        if(!$(this).hasClass('disabled') && self.groupData.length>1) {
            $(this).addClass('lightbox-next-btn-show');
        }
    },function(){
        if(!$(this).hasClass('disabled') && self.groupData.length>1) {
            $(this).removeClass('lightbox-next-btn-show');
        }
    }).click(function(e) {
        if(!$(this).hasClass('disabled') && self.flag) {
            self.flag = false;
            e.stopPropagation();
            self.goto('next')
        }
    });

    this.prevBtn.hover(function(){
        // console.log(self.index)
        if(!$(this).hasClass('disabled') && self.groupData.length>1) {
            $(this).addClass('lightbox-prev-btn-show');
        }
    },function(){
        if(!$(this).hasClass('disabled') && self.groupData.length>1) {
            $(this).removeClass('lightbox-prev-btn-show');
        }
    }).click(function(e) {
        if(!$(this).hasClass('disabled') && self.flag) {
            self.flag = false;
            e.stopPropagation();
            self.goto('prev');
        }
    });
}

LightBox.prototype = {
    constructor: LightBox,

    goto: function(dir) {
        if(dir === 'next') {
            this.index++;
            if (this.index >= this.groupData.length-1) {
                this.nextBtn.addClass('disabled').removeClass('lightbox-next-btn-show');
            };
            if (this.index != 0) {
                this.prevBtn.removeClass('disabled');
            };
            var src = this.groupData[this.index].src;
            this.loadPicSize(src)
        } else if(dir === 'prev') {
            this.index--;
            if (this.index <= 0) {
                this.prevBtn.addClass('disabled').removeClass('lightbox-prev-btn-show');
            };
            if (this.index != this.groupData.length-1) {
                this.nextBtn.removeClass('disabled');
            }
            var src = this.groupData[this.index].src;
            this.loadPicSize(src)
        }
    },

    showMaskAndPopup: function(sourceScr, currentId) {
        var self = this;
        
        this.popupPic.hide();
        this.picCaptionArea.hide();

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
            height: viewHeight,
            marginLeft: -(winWidth/2 + 10)/2,
            top: -viewHeight
        })
        .animate({
            top: (winHeight - viewHeight)/2
        }, function() {
            self.loadPicSize(sourceScr);
        });

        // 根据当前点击元素ID获取当前组别里面的索引
        this.index = this.getIndexOf(currentId);
        
        var groupDataLength = this.groupData.length;
        
        if (groupDataLength > 1) {
            if (this.index === 0) {
                this.prevBtn.addClass('disabled');
                this.nextBtn.removeClass('disabled');
            } else if (this.index === this.groupData.length-1) {
                this.nextBtn.addClass('disabled');
                this.prevBtn.removeClass('disabled');
            } else {
                this.nextBtn.removeClass('disabled');
                this.prevBtn.removeClass('disabled');
            }
        }
    },

    loadPicSize: function(sourceScr) {
        var self = this;
        self.popupPic.css({width: 'auto',height: 'auto'}).hide()

        this.preLoadImg(sourceScr, function() {
            self.popupPic.attr('src', sourceScr);
            var picWidth = self.popupPic.width(),
                picHeight = self.popupPic.height();

            self.changePic(picWidth, picHeight);
        })
    },

    changePic: function(width, height) {

        var self = this,
            winWidth = $(window).width(),
            winHeight = $(window).height();
        // 如果图片的宽高大于浏览器视口的宽高比例，看下是否溢出
        var scale = Math.min(winWidth/(width+10),winHeight/(height+10), 1);
        width = width*scale;
        height = height*scale;

        this.picViewArea.animate({
            width: width-10,
            height: height-10
        });
        this.popupWin.animate({
            width: width,
            height: height,
            marginLeft: -(width/2),
            top: (winHeight - height)/2
        }, function() {
            self.popupPic.css({
                width: width-10,
                height: height-10
            }).fadeIn();

            self.picCaptionArea.fadeIn();
            self.flag = true;
        });

        // 设置描述文字和当前索引
        this.captionText.text(this.groupData[this.index].caption);
        this.currentIndex.text("当前索引: "+(this.index+1)+" of "+this.groupData.length);

    },

    preLoadImg: function(src,callback) {
        var img = new Image();
        if (!!window.ActiveXObject) {
            img.onreadystatechange = function() {
                if (this.readyState == 'complete') {
                    callback();
                }
            }
        } else {
            img.onload = function() {
                callback();
            }
        }

        img.src = src;
    },

    getIndexOf: function(currentId) {
        var index = 0;

        $(this.groupData).each(function(i) {
            index = i;
            if (this.id === currentId)
                return false;
            
        });

        return index;
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
            '<img class="lightbox-image" src="">' +
            '<span class="lightbox-btn lightbox-next-btn"></span>' +
            '</div>' +
            '<div class="lightbox-pic-caption">' +
            '<div class="lightbox-caption-area">' +
            '<p class="lightbox-pic-desc"></p>' +
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