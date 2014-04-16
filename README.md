# sidecart

sidecart is a jQuery plugin that builds a side collapsible window.

# Requirements
jQuery
Readmore.js
jslib/Styler.js

# Installation
	<link href="src/css/sidecart.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript" src="third_party/jslib/src/js/Styler.js"></script>
	<script type="text/javascript" src="src/js/sidecart.js"></script>
	<script type="text/javascript" src="third_party/Readmore.js/readmore.min.js"></script>

# Use
This should give you a sense of how it works.
Notice the two config options 'init' and 'refresh' accept custom callbacks.

		$(document).ready( function() {
			function init() {
				$('#annotations-1 .text').readmore({
					maxHeight: 200,
					moreLink: '<a href="#">More</a>',
					lessLink: '<a href="#">Less</a>'
				});
			}
			function refresh( _p1 ) {
				console.log( _p1 );
			}
			var p1 = 'argument1';
			var p2 = 'argument2';
			$('#sidecartTop').sidecart({
				side: 'top',
				views: [
					{
						id: 'annotations-1',
						type: 'annotations',
						link: 'A',
						src: '#content',
						init: function() { init( p1 ) },
						refresh: function() { refresh( p2 ) }
					},
					{
						id: 'annotations-2',
						type: 'annotations',
						link: 'B',
						src: '#content',
						init: function() {},
						refresh: function() {}
					}
				]
			});
		});
