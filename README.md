jQuery-Marquee
==============

Модифицированный плаги на основе 
**Blog post:** http://aamirafridi.com/jquery/jquery-marquee-plugin

Добавлен метод $('.marquee').marquee('stop');


Use:
----

###HTML:

```html
<div class='marquee'>Lorem ipsum dolor sit amet, consectetur adipiscing elit END.</div>
```

###CSS:
```css
.marquee {
  width: 300px; /* the plugin works for responsive layouts so if width is not necessary */
  overflow: hidden;
  border:1px solid #ccc;
}
```

###Apply plugin:
```javascript
/**
 * Example of starting a plugin with options.
 * I am just passing all the default options
 * so you can just start the plugin using $('.marquee').marquee();
*/
$('.marquee').marquee({
	//speed in milliseconds of the marquee
	speed: 15000,
	//gap in pixels between the tickers
	gap: 50,
	//time in milliseconds before the marquee will start animating
	delayBeforeStart: 0,
	//'left' or 'right'
	direction: 'left'
});

$('.play').on('click', function () {
	console.log(2)
	$('.marquee').marquee();
});


$('.stop').on('click', function () {
	console.log(1)
	$('.marquee').marquee('stop');
});

```
