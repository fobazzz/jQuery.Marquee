
;(function($) {

	var handler = {
		element : 'js-marquee',
	};

	var defaults = {
		//speed in milliseconds of the marquee
		speed: 15000,
		//gap in pixels between the tickers
		gap: 30,
		//gap in pixels between the tickers
		delayBeforeStart: 1000,
		//'left' or 'right'
		direction: 'left',
		after  : function () {},
		before : function () {}
	};


	var animate = function(element, settings) {

		settings.after();
		console.time('start');
		

		//Start animating to wards left
		element.animate({
				'margin-left': settings.direction == 'left' ? '-' + settings.elWidth + 'px' : 0
			},
			settings.speed, 'linear',
			function () {
				settings.before();
				element.css('margin-left', settings.direction == 'left' ? 0 : '-' + settings.elWidth + 'px');
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
				} else {
					
				}
				
				settings.timerId = setTimeout(function() {
					self.find('.js-marquee:not(:first)').show();
					self.marquee('start');
				}, settings.delayBeforeStart);

				self.data('marquee',settings);
		   });
		},
		get   : function () {
			return $(this).find('.js-marquee-wrapper');
		},
		options : function () {
			return $(this).data('marquee');
		},
		start : function () {
			var self	= $(this),
				element = $(this).marquee('get');

			animate(element, self.data('marquee'));
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
			var data = $(this).marquee('options');
			clearInterval(data.timerId);
			$(this).marquee('pause');
			$(this).marquee('zero');
			$(this).find('.js-marquee:not(:first)').hide();
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
