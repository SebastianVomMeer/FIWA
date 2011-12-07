window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);(typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))}};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


/*
 * Menubar Widget jQuery Plugin
 * Author: Sebastian Gaul <sebastian@dev.mgvmedia.com>
 */
(function($){

	var animationSpeed = 'fast';

	var methods = {
		init : function(options) {
			return this.each(function(){
				$(this).menubar('contractAll');
				$(this).find('li > hr').parent().addClass('separator');
				$(this).find('ul ul').hide();
				$(this).addClass('menubar');
				$(this).find('> ul > li > div').click(function(){
					$(this).menubar('expand');
				});
				var $this = $(this);
				$(document).not($this).click(function(){
					$this.menubar('contractAll');
				});
			});
		},
		/*
		 * Contracts all submenus of the menubar
		 */
		contractAll : function() {
			return this.each(function(){
				$(this).find('>ul > li > div').menubar('contract');
				return false;
			});
		},
		/*
		 * Expands a submenu and contracts siblings
		 * NOTE: $(this) is .menubar > ul > li > div rather than
		 *       .menubar itself
		 */
		expand : function() {
			return this.each(function(){
				$(this)
					.unbind('mouseenter')
					.siblings('ul').fadeIn(animationSpeed);
				$(this).parent()
					.addClass('opened')
					.siblings().children('div')
					.mouseenter(function(){
						$(this).menubar('expand');
						return false;
					})
					.menubar('contract');
				$(this).unbind('click').click(function() {
					$(this).menubar('contract');
					return false;
				});
				$(this).closest('.menubar').addClass('expanded');
			});
		},
		/*
		 * Contracts a submenu
		 * NOTE: $(this) is .menubar > ul > li > div rather than
		 *       .menubar itself
		 */
		contract : function() {
			return this.each(function(){
				$(this).siblings('ul').fadeOut(animationSpeed);
				$(this).parent().removeClass('opened')
					.siblings().children('div').unbind('mouseenter');
				$(this).unbind('click').click(function() {
					$(this).menubar('expand');
					return false;
				});
				$(this).closest('.menubar').removeClass('expanded');
			});
		},
	};

	$.fn.menubar = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.menubar');
		}
	};

})(jQuery);

/*
 * Icon jQuery Plugin
 * Author: Sebastian Gaul <sebastian@dev.mgvmedia.com>
 */
(function($){

	var path = 'img/icons/';
	var fileExtension = '.png';
	var availableSizes = [16, 22];

	var methods = {
		init : function(options) {
			return this.each(function(){
				$(this).icon('prepend', options);
			});
		},
		prepend : function(options) {
			return this.each(function(){
				var path = $(this).icon('_findIcon', options);
				console.debug(path);
				$(this).prepend(
					$('<span/>')
						.html('&nbsp;')
						.addClass('icon')
						.css({
							backgroundImage : 'url(' + path + ')',
							display: 'inline-block',
							height: 22,
							width: 22,
						})
				);
			});
		},

		_findIcon : function(options) {
			var icon = options.icon;
			return path + icon.toString() + fileExtension;
		},

	}

	$.fn.icon = function(method) {
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.icon');
		}
	};

})(jQuery);


/*
 * Toolbar jQuery Plugin
 * Author: Sebastian Gaul <sebastian@dev.mgvmedia.com>
 */
(function($){

	var methods = {
		init : function(options) {
			return this.each(function(){
				$(this).addClass('toolbar');
			});
		},
	}

	$.fn.toolbar = function(method) {
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.toolbar');
		}
	};

})(jQuery);
