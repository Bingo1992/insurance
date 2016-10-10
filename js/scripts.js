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
    $.fn.extend({
        // 生成弹窗html
        Tiphtml: function(className,text){
            var html = '<div class="tip-dialog show">\
            <div class="tip-content">\
                <i class="'+className+'"></i>\
                <p>'+text+'</p>\
            </div></div>';
            $('body').append(html);
            setTimeout(function() {
                $('.tip-dialog').remove();
            }, 1500);
        },
        //表单验证
        isWrong: function(text){
           return this.Tiphtml("icon-tip icon-cancel",text);
        },
        isEmpty: function(text){
           return this.Tiphtml("icon-tip icon-gantan",text);
        },
        isRight: function(text){
            return this.Tiphtml("icon-tip icon-hook",text);
        },
        //弹窗
        showTipDialog: function(){
            return this.each(function() {
                $('.tip-dialog').addClass('show');
                setTimeout(function() {
                    $('.tip-dialog').removeClass('show');
                }, 1500);
            });
        },
        //遮罩
        showUiDialog: function(option){
            return this.each(function() {
                $(option).addClass('show');
                $('.icon-cancel').add('.cancel').click(function() {
                    $(this).parents(option).removeClass('show');
                });
            });
        },
        //tabs
        switchTabs: function(option1,option2){
            return this.each(function() {
                var index = $(option1).index($(this));
                $(this).addClass('active').siblings().removeClass('active');
                $(option2).eq(index).addClass('show').siblings(option2).removeClass('show');   
            });
        }
    });

    //选择车牌号,省市
    function SlideDialog(option){
        var self = this;
        // var $dialogList = $('.dialog-list');
        // var $slideElm = $('.slideValue');
        // self.dialogList = $(dialogList);
        // self.slideElm = $slideElm;
        var $startLi = $('.dialog-start-list li');
        var $endLi = $('.dialog-end-list li');
        var $returnBack = $('.return-back');
       
        var slideValue = '';
        var opt = {
            dialogList : $('.dialog-list'),
            slideElm : $('.slideValue')
        };
        opt = $.extend(opt, option||{});
        
        self.opt = opt;
        self.dialogList = self.opt.dialogList;
        self.slideElm = self.opt.slideElm;
        self.startLi = $startLi;
        self.endLi = $endLi;
        self.returnBack = $returnBack;     
        self.slideValue = slideValue;

        self.init();
        self.dialogList.find('ul').css('height',document.documentElement.clientHeight -44 + 'px');
    };
    SlideDialog.prototype.init = function(){
        var self = this;
        self.dialogList.addClass('more-wp-open');
        $('body').addClass('fixed-body');
        //点击左边
        self.startLi.click(function(){
            $(this).switchTabs(self.startLi);
        });
        // 点击右边
        self.endLi.click(function(){
            self.startLi.each(function(){
                if($(this).hasClass('active')){
                    self.slideValue += $(this).html();
                }//获取左边的值
            });
            self.dialogList.removeClass('more-wp-open');
            $('body').removeClass('fixed-body');
            self.slideValue += $(this).html();
            // self.slideElm.val(self.slideValue);
            self.slideElm.html(self.slideValue);
        });
        // 返回按钮
        self.returnBack.click(function(){
            self.dialogList.removeClass('more-wp-open');
            $('body').removeClass('fixed-body');
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

$(function(){
    //日期
    $('.date').bind('input propertychange', function (){
        var dateValue = $(this).find('input').val();
        if(dateValue ==''){
           $(this).removeClass('getDate');
           $(this).find('span').html('请输入时间');
        }else {
            $(this).find('span').html(dateValue);
            $(this).addClass('getDate');
        }
    });   

    //是否显示checkbox下面的内容
    $('.slide-btn-check').click(function(){
       var $list = $(this).closest('ul');
       var $thisli = $(this).closest('li');
       var index = $('.border-list li').index($thisli);
       var $li = $list.find('li');
       var check = $(this).find(':checkbox').prop('checked');
       if(!check){
            //隐藏内容
            for(var i = index+1;i < $li.length; i++){
               $li.eq(i).addClass('hide');
           }
       }else {
            //显示内容
           for(var j = index+1;j < $li.length; j++){
               $li.eq(j).removeClass('hide');
           }
        }
    }); 
});