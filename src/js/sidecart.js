/*!
 * sidecart - sidecart
 * http://adamtavares.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
;( function( jQuery ) {
	
	/**
	 * Holds default options, adds user defined options, and initializes the plugin
	 *
	 * @param { obj } _elem The DOM element where the plugin will be drawn
	 * @param { obj } _config Key value pairs to hold the plugin's configuration
	 * @param { string } _id The id of the DOM element
	 */
	function sidecart( _elem, _config, _id ) {
		var self = this;
		self.elem = _elem;
		self.id = _id;
		self.init( _elem, _config );
	}
	
	/**
	 * Holds default options, adds user defined options, and initializes the plugin
	 *
	 * @param { obj } _elem The DOM element where the plugin will be drawn
	 * @param { obj } _config Key value pairs to hold the plugin's configuration
	 */
	sidecart.prototype.init = function( _elem, _config ) {
		var self = this;
		
		//------------------------------------------------------------
		//	Mark your territory
		//------------------------------------------------------------
		jQuery( self.elem ).addClass('sidecart')
		
		//------------------------------------------------------------
		//	User options 
		//------------------------------------------------------------
		self.config = jQuery.extend({}, _config );
		
		//------------------------------------------------------------
		//  Start me up!
		//------------------------------------------------------------
		self.start();
	}
	
	/**
	 * Start up sidecart.
	 */
	sidecart.prototype.start = function() {
		this.buildWrapper();
		this.buildViews();
		this.clickStart();
	}
	
	/**
	 * Build the application wrapper.
	 */
	sidecart.prototype.buildWrapper = function() {
		jQuery( this.elem ).append( '\
			<div class="tabs"></div>\
			<div class="inner">\
				<div class="views"></div>\
			</div>\
		');
	}
	
	/**
	 * Build the all views.
	 */
	sidecart.prototype.buildViews = function() {
		for ( var i=0, ii=this.config['views'].length; i<ii; i++ ) {
			var view = this.config['views'][i];
			this.buildView( view );
		}
	}
	
	/**
	 * Build a single view.
	 *
	 * @param { Object } _view 		A single view config object.
	 *								See constructor.
	 */
	sidecart.prototype.buildView = function( _view ) {
		//------------------------------------------------------------
		//  Build the view
		//------------------------------------------------------------
		console.log( _view );
		jQuery( '.views', this.elem ).append( '\
			<div id="'+ _view.id +'" class="'+ _view.type +'">\
			'+ jQuery( _view.src ).html() +'</div>\
		');
		//------------------------------------------------------------
		//  Build the link
		//------------------------------------------------------------
		//------------------------------------------------------------
		// Run view init function
		//------------------------------------------------------------
		_view['init']();
	}
	
	
	sidecart.prototype.clickStart = function() {
		var self = this;
		jQuery('.tabs a', self.elem ).click(function( _e ){
			_e.preventDefault();
			if ( jQuery( self.elem ).hasClass('hidden') ) {
				jQuery( self.elem ).removeClass('hidden');
			}
			else {
				jQuery( self.elem ).addClass('hidden');
			}
		});
	}
	
	//----------------
	//	Extend JQuery 
	//----------------
	jQuery( document ).ready( function( jQuery ) {
		jQuery.fn.sidecart = function( _config ) {
			var id = jQuery( this ).selector;
			return this.each( function() {
				jQuery.data( this, id, new sidecart( this, _config, id ) );
			});
		};
	})
})( jQuery );