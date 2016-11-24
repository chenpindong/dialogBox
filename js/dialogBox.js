(function($, window, document, undefined) {
	"use strict";

	function DialogBox(options, $ele) {
		var defaults = {
			title: '提示', //弹框标题
			message: '', //弹框内容
			confirm: '确认', //确认按钮
			cancel: '取消', //取消按钮
			showMask: false, //是否显示遮盖层（只有loading弹框使用），默认值false
			maskCancel: false, //点击弹框外是否关闭，默认值false
			type: 'alert', //按钮类型   alert：提示；confirm：警告
			slide: true, //从上向下滚动显示:默认值true
			time: 0, //time>0(单位毫秒)弹窗在对应时间后自动关闭
			callback: null //按钮回调函数    result:0  点击取消按钮；1 点击确认按钮
		};

		if (options.type === 'alert') {
			//alert弹框： maskCancel默认值：true
			defaults.maskCancel = true;
		} else if (options.type === 'loading') {
			//loading弹框： message默认值：数据加载中；maskCancel默认值false
			defaults.message = '数据加载中';
			//loading弹框没有从上向下滚动显示模式
			options.slide = false;
		}

		//合并参数
		options = $.extend(defaults, options || {});

		this.$ele = $ele ? $ele : $('body');
		this.options = options;
		this.init();
	}

	DialogBox.prototype = {
		//初始化
		init: function() {
			var self = this;

			self.renderHtml();

			setTimeout(function() {
				self.$dialogBox.addClass('in');
				self.isShow = true;
			}, 50);

			self.bindEvent();
			self.setTimeout();
		},
		//加载html
		renderHtml: function() {
			var self = this,
				html = '';

			html += '<div class="dialog-box">';

			if (self.options.type === 'loading') {
				html += '<div class="mask' + (self.options.showMask ? '' : ' hide') + '"></div>';
				html += '<div class="toast"><div class="loading">';
				html += '<div class="loading-leaf loading-leaf-0"></div>';
				html += '<div class="loading-leaf loading-leaf-1"></div>';
				html += '<div class="loading-leaf loading-leaf-2"></div>';
				html += '<div class="loading-leaf loading-leaf-3"></div>';
				html += '<div class="loading-leaf loading-leaf-4"></div>';
				html += '<div class="loading-leaf loading-leaf-5"></div>';
				html += '<div class="loading-leaf loading-leaf-6"></div>';
				html += '<div class="loading-leaf loading-leaf-7"></div>';
				html += '<div class="loading-leaf loading-leaf-8"></div>';
				html += '<div class="loading-leaf loading-leaf-9"></div>';
				html += '<div class="loading-leaf loading-leaf-10"></div>';
				html += '<div class="loading-leaf loading-leaf-11"></div>';
				html += '</div><p class="toast-content">' + self.options.message + '</p></div>';
			} else {
				html += '<div class="mask"></div><div class="dialog ' + (self.options.type === 'confirm' ? 'dialog-confirm' : 'dialog-alert') + (self.options.slide ? ' slide' : '') + '">';
				html += '<div class="dialog-hd"><strong class="dialog-title">' + self.options.title + '</strong></div>';
				html += '<div class="dialog-bd">' + self.options.message + '</div><div class="dialog-ft">';

				if (self.options.type === 'alert') {
					html += '<a href="javascript:void(0);" class="btn-dialog primary cancel">' + self.options.confirm + '</a>';
				} else if (self.options.type === 'confirm') {
					html += '<a href="javascript:void(0);" class="btn-dialog default cancel">' + self.options.cancel + '</a>';
					html += '<a href="javascript:void(0);" class="btn-dialog primary confirm">' + self.options.confirm + '</a>';
				}

				html += '</div></div>';
			}

			html += '</div>';

			self.$ele.find('.dialog-box').remove();
			self.$ele.append(html);

			self.$dialogBox = self.$ele.find('.dialog-box');
		},
		//绑定事件
		bindEvent: function() {
			var self = this;

			self.$dialogBox.on('click', '.cancel', function() {
				self.close();
				if (self.options.callback) {
					self.options.callback(0);
				}
			}).on('click', '.confirm', function() {
				self.close();
				if (self.options.callback) {
					self.options.callback(1);
				}
			}).on('click', '.mask', function() {
				if (self.options.maskCancel) {
					self.close();
				}
			});
		},
		//关闭弹框
		close: function() {
			var self = this,
				$mask = self.$dialogBox.find('.mask');

			if (!self.isShow) return;
			
			self.$dialogBox.removeClass('in');
			self.$dialogBox.find('.mask');

			if (self.options.slide) {
				setTimeout(function() {
					if ($mask) {
						$mask.hide();
					}
				}, 400);
			} else {
				$mask.hide();
			}
			self.isShow = false;
		},
		setTimeout: function() {
			var self = this,
				time = self.options.time;
				
			if (typeof time === 'number' && time > 0) {
				setTimeout(function() {
					self.close();
				}, time);
			}
		}
	}

	//拓展到jQuery
	$.extend({
		dialogBox: function(options) {
			return new DialogBox(options);
		}
	});

	//拓展到jQuery
	/*$.fn.dialogBox = function(options) {
		return new DialogBox(options, $(this));
	}*/

	//拓展到window
	window.DialogBox = DialogBox;
})(jQuery, window, document);