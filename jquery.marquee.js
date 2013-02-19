/**
* jQuery.marquee - scrolling text horizontally
* Date: 11/01/2013
* @author Aamir Afridi - aamirafridi(at)gmail(dot)com | http://www.aamirafridi.com
* @version 1.0
*/

;(function($) {

	var handler = {
		element : 'js-marquee',
	};

	var defaults = {
		//speed in milliseconds of the marquee
		speed: 10000,
		//gap in pixels between the tickers
		gap: 20,
		//gap in pixels between the tickers
		delayBeforeStart: 1000,
		//'left' or 'right'
		direction: 'left',
		after  : function () {},
		before : function () {}
	};

	var requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
				return window.setTimeout(callback, 1000 / 60);
			};
	})();

	var cancelRequestAnimFrame = (function() {
		return window.cancelAnimationFrame          ||
			window.webkitCancelRequestAnimationFrame    ||
			window.mozCancelRequestAnimationFrame       ||
			window.oCancelRequestAnimationFrame     ||
			window.msCancelRequestAnimationFrame        ||
			clearTimeout
	})();


	var animate = function(element, settings) {
		settings.after();
		element.css('margin-left', settings.direction == 'left' ? 0 : '-' + settings.elWidth + 'px');
		//Start animating to wards left
		element.animate({
				'margin-left': settings.direction == 'left' ? '-' + settings.elWidth + 'px' : 0
			},
			settings.speed, 'linear',
			function () {
				settings.before();
				animate(element, settings);
			}
		);
	};


	var methods = {
		init : function( options ) { 
		   return this.each(function(){
		   		var self = $(this),
		   			marqueeWrapper,
					elWidth;

				var settings = self.data('marquee');

				// initialization plugin 
				if (typeof settings === 'undefined') {
					// Extend the options if any provided
					settings	= $.extend({}, defaults, options);

					self.wrapInner('<div class="'+handler.element+'"></div>');

					//Make copy of the element
					self.find('.'+handler.element).css({
						'margin-right': settings.gap, 
						'float':'left'
					}).clone().appendTo(self);

					self.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
					settings.elWidth    = self.find('.js-marquee:first').width() + settings.gap;
				}

				self.data('marquee',settings);
				self.marquee('start');
		   });
		},
		get   : function () {
			return $(this).find('.js-marquee-wrapper');
		},
		start : function () {
			var self	= $(this),
				element = $(this).marquee('get');

			return requestAnimFrame(function () {
				console.log(self.data('marquee'));
				animate(element, self.data('marquee'));
			});
			
		},
		zero : function () {
			var self 		= $(this),
			 	element 	= self.marquee('get'),	
				settings	= self.data('marquee');

			element.css('margin-left', settings.direction == 'left' ? 0 : '-' + settings.elWidth + 'px');
		},
		pause : function () {
			var element = $(this).marquee('get');
			element.stop(true);
			element.clearQueue();
		},
		stop : function() {
			$(this).marquee('pause');
			$(this).marquee('zero');
		}
	};
		 
	$.fn.marquee = function( method ) {
		// Метод вызывающий логику
		if ( methods[method] ) {
		  return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return methods.init.apply( this, arguments );
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.marquee');
		}    

	};

})(jQuery);
