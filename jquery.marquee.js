/**
 * jQuery.marquee - scrolling text horizontally
 * 
 */

;(function($) {

	var defaults = {
		//speed in milliseconds of the marquee
		speed: 10000,
		//gap in pixels between the tickers
		gap: 20,
		//gap in pixels between the tickers
		delayBeforeStart: 1000,
		//'left' or 'right'
		direction: 'left'
	};

	var requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
				// console.log(222);
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


	var methods = {
		init : function( options ) { 
		   return this.each(function(){

				// Extend the options if any provided
				var options	= $.extend({}, defaults, options),
					self 	= $(this),
					data	= self.data('marquee'),
					marqueeWrapper,
					elWidth;

				//check if element has data attributes. They have top priority
				options = $.extend({}, options, self.data());


				// Если плагин не был инициализирован
				if (!data) {
					//wrap inner content into a div
					self.wrapInner('<div class="js-marquee"></div>');

					//Make copy of the element
					self.find('.js-marquee').css({
						'margin-right': options.gap, 
						'float':'left'
					}).clone().appendTo(self);

					//wrap both inner elements into one div
					self.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
				}

				//Save the width of the each element so we can use it in animation
				elWidth 		= self.find('.js-marquee:first').width() + options.gap;

				//Save the reference of the wrapper
				marqueeWrapper	= self.find('.js-marquee-wrapper');


				var animate = function() {

					marqueeWrapper.css('margin-left', options.direction == 'left' ? 0 : '-' + elWidth + 'px');
					//Start animating to wards left
					marqueeWrapper.animate({
							'margin-left': options.direction == 'left' ? '-' + elWidth + 'px' : 0
						},
						options.speed, 'linear',
						function () {
							if (self.data('marquee').status !== 'stop') {
								animate();
							}
						}
					);
				};

				var animId = requestAnimFrame(animate);

				$(this).data('marquee',{
					id 		: animId,
					wrap 	: marqueeWrapper,
					status 	: 'play'
				});
		   });
		},
		// stop animation
		stop : function() {
	       return this.each(function(){
	 		 
	         var self = $(this),
	             data = self.data('marquee'),
	             marqueeWrapper = data.wrap;
	             // 
	            
	             // 
	             if (data && data.status === 'play') {
	             	self.data('marquee', {'status' : 'stop'});
	             	cancelRequestAnimFrame(data.id);
	             	marqueeWrapper.stop(true,true);
	             	

	             	


	             }
	       });
		}
	};
		 
	$.fn.marquee = function( method ) {
		// Метод вызывающий логику
		if ( methods[method] ) {
		  return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return methods.init.apply( this, arguments );
		} else {
		  $.error( 'Метод ' +  method + ' не существует в jQuery.marquee' );
		}    

	};

})(jQuery);
