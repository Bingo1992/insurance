//******************控制不同设备字体大小**************//
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//******************控制不同设备字体大小******结束**************//
//
//jquery插件
;(function($,win,doc,undefined){
     // 弹窗
    $.fn.showTipDiaolog = function() {
        return this.each(function() {
            $('.tip-dialog').addClass('show');
            setTimeout(function() {
                $('.tip-dialog').removeClass('show');
            }, 1500);
        });
    };

    // 遮罩
    $.fn.showUiDialog = function(option) {
        return this.each(function() {
            $(option).addClass('show');
            $('.icon-cancel').add('.cancel').click(function() {
                $(this).parents(option).removeClass('show');

            });
        });
    };

    //tabs
    $.fn.switchTabs = function(option1, option2) {
        return this.each(function() {
            var index = $(option1).index($(this));
            $(this).addClass('active').siblings().removeClass('active');
            $(option2).eq(index).addClass('show').siblings(option2).removeClass('show');   
        });
    };

    //选择车牌号,省市
    function SlideDialog(){
        var self = this;
        var $dialogList = $('.dialog-list');
        var $startLi = $('.dialog-start-list li');
        var $endLi = $('.dialog-end-list li');
        var $return = $('.return-back');

        var $slideElm = $('.slideValue');
        var slideValue = '';
        $dialogList.find('ul').css('height',document.documentElement.clientHeight -44 + 'px');
        self.dialogList = $dialogList;
        self.startLi = $startLi;
        self.endLi = $endLi;

        self.return = $return;
        self.slideElm = $slideElm;
        self.slideValue = slideValue;
        self.init();
    };
    SlideDialog.prototype.init = function(){
        var self = this;
        self.dialogList.addClass('more-wp-open');
        //点击左边
        self.startLi.click(function(){
            $(this).switchTabs(self.startLi);
        });
        // 点击右边
        self.endLi.click(function(){
            self.startLi.each(function(){
                if($(this).hasClass('active')){
                    self.slideValue = $(this).html();
                }//获取左边的值
            });
            self.dialogList.removeClass('more-wp-open');
            self.slideValue += $(this).html();
            // self.slideElm.val(self.slideValue);
            self.slideElm.html(self.slideValue);
        });
        // 返回按钮
        self.return.click(function(){
            self.dialogList.removeClass('more-wp-open');
        });
    };
    SlideDialog.init = function(){
        var self = this;
        this.each(function(){
            new self();
        })
    }
    window['SlideDialog'] = SlideDialog;

    //全选
    function AllCheck(option){
        var allCheck = $('.all-check');
        var allCheckbox = allCheck.find(':checkbox');
        var checkbox = $(option).find(':checkbox');
        
        var flag = 0;
        this.allCheck = allCheck;
        this.allCheckbox = allCheckbox;
        this.checkbox = checkbox;
        this.option = option;
        this.flag = flag;
        this.init();
    }
    AllCheck.prototype.init = function(){
        var self = this;
        //点击全选
        self.allCheck.click(function(){
            var check = self.allCheckbox.prop("checked");
             if(!check){
                self.checkbox.prop("checked",false);
            }else {
                self.checkbox.prop("checked",true);
            }
        });
           
        //点击各checkbox
        self.checkbox.click(function(){
            self.flag = 0;
            self.checkbox.each(function(i){
                var check2 = self.checkbox.eq(i).prop("checked");
                if(!check2){self.flag++;}
            });
            if(self.flag>=1){
                self.allCheckbox.prop("checked",false);
            }else{
                self.allCheckbox.prop("checked",true);
            }
        });
    }
     window['AllCheck'] = AllCheck;

})(jQuery,window,document);


    