define("#dialog/0.9.0/base-dialog-debug", ["#jquery/1.7.2/jquery-debug", "#overlay/0.9.7/overlay-debug", "#position/0.9.2/position-debug", "#iframe-shim/0.9.2/iframe-shim-debug", "#widget/0.9.16/widget-debug", "#base/0.9.16/base-debug", "#class/0.9.2/class-debug", "#events/0.9.1/events-debug", "#base/0.9.16/aspect-debug", "#base/0.9.16/attribute-debug", "#widget/0.9.16/daparser-debug", "#widget/0.9.16/auto-render-debug", "#overlay/0.9.7/mask-debug"], function(require, exports, module) {

    var $ = require("#jquery/1.7.2/jquery-debug"),
        Overlay = require("#overlay/0.9.7/overlay-debug"),
        mask = require("#overlay/0.9.7/mask-debug"),
        Events = require("#events/0.9.1/events-debug");


    // BaseDialog
    // -------
    // BaseDialog 是通用对话框组件，提供确定、取消、关闭、标题设置、内容区域自定义功能。
    // 是所有对话框类型组件的基类。

    var BaseDialog = Overlay.extend({

        attrs: {
            // 对话框触发点
            trigger: null,
            // 对话框触发方式
            triggerType: 'click',

            zIndex: 999,

            // 确定或提交按钮
            confirmElement: null,
            // 取消按钮
            cancelElement: null,
            // 关闭按钮
            closeElement: null,

            // 指定标题元素
            titleElement: null,
            // 指定标题内容
            title: '',

            // 指定内容元素
            contentElement: null,
            // 指定内容的 html
            content: '',

            // 是否有背景遮罩层
            hasMask: false,

            // 点击确定时触发的函数，供覆盖
            onConfirm: function() {},

            // 点击取消或关闭时触发的函数，供覆盖
            onClose: function() {}
        },

        parseElement: function() {
            BaseDialog.superclass.parseElement.call(this);

            // 绑定额外的 dom 元素
            this.set('trigger', $(this.get('trigger')));
            this.set('confirmElement', this.$(this.get('confirmElement')));
            this.set('cancelElement', this.$(this.get('cancelElement')));
            this.set('closeElement', this.$(this.get('closeElement')));
            this.set('titleElement', this.$(this.get('titleElement')));
            this.set('contentElement', this.$(this.get('contentElement')));
        },

        events : {
            'click {{attrs.confirmElement}}' : '_confirmHandler',
            'click {{attrs.cancelElement}}' : '_closeHandler',
            'click {{attrs.closeElement}}' : '_closeHandler'
        },

        _confirmHandler : function() {
            this.trigger('confirm');
        },

        _closeHandler : function() {
            this.trigger('close');
            this.hide();
            // 关于网页中浮层消失后的焦点处理
            // http://www.qt06.com/post/280/
            this.get('trigger').focus();
        },

        delegateEvents: function() {
            BaseDialog.superclass.delegateEvents.call(this);

            var that = this;
            
            // 绑定触发对话框出现的事件
            this.get('trigger').bind(this.get('triggerType'), function(e) {
                e.preventDefault();
                that.activeTrigger = this;
                that.show();
                // 在ie下依然有bug，解决不了，先注释掉
                //that.element.focus();
            });

            // 绑定确定和关闭事件到 dom 元素上，以供全局调用
            Events.mixTo(this.element[0]);
            this.element[0].on('confirm', this._confirmHandler, this);
            this.element[0].on('close cancel', this._closeHandler, this); 
        },

        show: function() {
            return BaseDialog.superclass.show.call(this);
        },

        hide: function() {
            return BaseDialog.superclass.hide.call(this);            
        },
        
        setup: function() {
            this._setupMask();
            toTabed(this.element);
            toTabed(this.get('trigger'));
        },

        _setupMask: function() {
            this.before('show', function() {
                this.get('hasMask') && mask.show();
            });
            this.before('hide', function() {
                this.get('hasMask') && mask.hide();
            });
        },

        _onRenderTitle: function(val) {
            if($.isFunction(val)) {
                this.get('titleElement').html(val.call(this));
            }
            else {
                this.get('titleElement').html(val);
            }
        },

        _onRenderContent: function(val) {
            if($.isFunction(val)) {
                this.get('contentElement').html(val.call(this));
            }
            else {
                this.get('contentElement').html(val);
            }
        },

        _onRenderAjaxUrl: function(val) {
            var that = this;
            // 若未指定回调函数，则将取得的数据直接填充到内容区域
            $.get(val, this.get('ajaxCallback') || function(data) {
                that.get('contentElement').html(data);
            });
        },

        _onRenderIframeUrl: function(val) {
            this.$('iframe').eq(0).attr('src', val);
        }

    });

    module.exports = BaseDialog;

    // Helpers
    // ----

    function toTabed(element) {
        if(element.attr('tabindex') == null) {
            element.attr('tabindex', '-1');
        }
    }

});

