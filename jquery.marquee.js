/**
 * jQuery.marquee - scrolling text horizontally
 * Date: 11/01/2013
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com | http://www.aamirafridi.com
 * @version 1.0
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
			var o = $.extend({}, defaults, options),
				$this = $(this),
				$marqueeWrapper,
				data = $this.data('marquee'),
				elWidth;

			//check if element has data attributes. They have top priority
			o = $.extend({}, o, $this.data());

	 
			// Если плагин не был инициализирован
			if (!data) {
				//wrap inner content into a div
				$this.wrapInner('<div class="js-marquee"></div>');
		  
				//Make copy of the element
				$this.find('.js-marquee').css({
					'margin-right': o.gap, 
					'float':'left'
				}).clone().appendTo($this);
		  
				//wrap both inner elements into one div
				$this.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
		  

			} 
				//Save the width of the each element so we can use it in animation
				elWidth = $this.find('.js-marquee:first').width() + o.gap;
				//Save the reference of the wrapper
				$marqueeWrapper = $this.find('.js-marquee-wrapper');


			var animate = function() {
				$marqueeWrapper.css('margin-left', o.direction == 'left' ? 0 : '-' + elWidth + 'px');
				//Start animating to wards left
				$marqueeWrapper.animate({
						'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : 0
					},
					o.speed, 'linear',
					function () {
						if ($this.data('marquee') === 'stop') {
							animate();
						}
					}
				);
			};

			var animId = requestAnimFrame(animate);

			$(this).data('marquee',{
				id : animId,
				wrap : $marqueeWrapper
			});


		   });
		},
		stop : function() {
	       return this.each(function(){
	 
	         var $this = $(this),
	             data = $this.data('marquee'),
	             $marqueeWrapper = data.wrap;

	             if (data && $this.data('marquee') !== 'stop') {
	             	$marqueeWrapper.stop(true, true);
	             	cancelRequestAnimFrame(data.id);
	             	$this.data('marquee','stop')
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
