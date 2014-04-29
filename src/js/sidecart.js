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
        //  Mark your territory
        //------------------------------------------------------------
        jQuery( self.elem ).addClass('sidecart')
        //------------------------------------------------------------
        //  User options 
        //------------------------------------------------------------
        self.config = jQuery.extend({
            side: 'right',
            inside: false,
            'bottom-space': 40,
            theme: null
        }, _config );
        //------------------------------------------------------------
        //  Get a styler object handy
        //------------------------------------------------------------
        self.styler = new Styler();
        //------------------------------------------------------------
        //  Start me up!
        //------------------------------------------------------------
        self.start();
    }
    
    /**
     * Start up sidecart.
     */
    sidecart.prototype.start = function() {
        this.theme();
        this.buildWrapper();
        this.buildViews();
        this.resize();
        this.hide();
    }
    
    /**
     *  Apply sidecart theme.
     */
    sidecart.prototype.theme = function() {
        if ( this.config['theme'] != null ) {
			console.log( this.config );
            jQuery( this.elem ).addClass( this.config['theme'] );
        }
    }
    
    /**
     * Build the application wrapper.
     */
    sidecart.prototype.buildWrapper = function() {
        //------------------------------------------------------------
        //  Hide initially
        //------------------------------------------------------------
        jQuery( this.elem ).addClass('hidden');
        //------------------------------------------------------------
        //  Left side
        //------------------------------------------------------------
        switch ( this.config['side'] ) {
            case 'left':
                this.buildTabsLast();
                jQuery( this.elem ).addClass('left');
                break;
            case 'top':
                this.buildTabsLast();
                jQuery( this.elem ).addClass('top');
                break;
            default: // right side
                jQuery( this.elem ).append( '\
                    <div class="tabs"></div>\
                    <div class="inner">\
                        <div class="views"></div>\
                    </div>\
                ');
        }
        //------------------------------------------------------------
        //  Inside parent?
        //------------------------------------------------------------
        this.fitToParent();
    }
    
    /**
     * Fit sidecart inside parent.
     */
    sidecart.prototype.fitToParent = function() {
        if ( this.config['inside'] == true ) {
            var parent = jQuery( this.elem ).parent();
            var position = parent.position();
            jQuery( this.elem ).css({ left: position.left });
            if ( this.config['side'] == 'top' ) {
                jQuery( this.elem ).width( parent.outerWidth() );
                var height = parent.height()-jQuery( '.tabs', this.elem ).height()-this.config['bottom-space'];
                var style = {};
                style[this.id+' .inner'] = 'height:'+height+'px';
                style[this.id+'.hidden .inner'] = 'height:0';
                this.styler.add( style );
            }
        }
    }
    
    /**
     * Build with tab after inner.
     */
    sidecart.prototype.buildTabsLast = function() {
        jQuery( this.elem ).append( '\
            <div class="inner">\
                <div class="views"></div>\
            </div>\
            <div class="tabs"></div>\
        ');
    }
    
    /**
     * Build with tab before inner.
     */
    sidecart.prototype.buildTabsFirst = function() {
        jQuery( this.elem ).append( '\
            <div class="tabs"></div>\
            <div class="inner">\
                <div class="views"></div>\
            </div>\
        ');
    }
    
    /**
     * Build all of the views.
     */
    sidecart.prototype.buildViews = function() {
        //------------------------------------------------------------
        //  No views?  Get outta there.
        //------------------------------------------------------------
        if ( this.config['views'] == undefined ) {
            return;
        }
        //------------------------------------------------------------
        //  Build each view.
        //------------------------------------------------------------
        for ( var i=0, ii=this.config['views'].length; i<ii; i++ ) {
            var view = this.config['views'][i];
            this.buildView( view );
        }
    }
    
    /**
     * Add a view.
     */
    sidecart.prototype.addView = function( _view ) {
        if ( this.config['views'] == undefined ) {
            this.config['views'] = [];
        }
        this.config['views'].push( _view );
        this.buildView( _view );
    }
    
    /**
     * Build a single view.
     *
     * @param { Object } _view      A single view config object.
     *                              See constructor.
     */
    sidecart.prototype.buildView = function( _view ) {
        //------------------------------------------------------------
        //  Build the view
        //------------------------------------------------------------
        jQuery( '.views', this.elem ).append('\
            <div id="'+ _view.id +'" class="'+ _view.type +'"></div>\
        ');
        //------------------------------------------------------------
        //  Already in the dom?
        //------------------------------------------------------------
        if ( _view.src != undefined && _view.src != '' ) {
            var src = jQuery( _view.src );
            //------------------------------------------------------------
            //  Move the source html
            //------------------------------------------------------------
            src.detach().appendTo( '#'+_view.id );
        }
        //------------------------------------------------------------
        //  Passed as a text string?
        //------------------------------------------------------------
        else if ( _view.text != undefined ) {
            jQuery( '#'+_view.id ).append( _view.text );
        }
        //------------------------------------------------------------
        //  Build the link
        //------------------------------------------------------------
        var link = '<a href="#'+ _view.id +'">'+ _view.link +'</a>';
        jQuery( '.tabs', this.elem ).append( link );
        //------------------------------------------------------------
        //  Run view init function
        //------------------------------------------------------------
        if ( _view['init'] != undefined ) {
            _view['init']( this );
        }
        //------------------------------------------------------------
        //  View events
        //------------------------------------------------------------
        this.viewEvents( _view );
        this.showView( _view.id );
        this.hide();
    }
    
    /**
     * Start event listeners.
     * @param { _obj } _view A view configuration object;
     */
    sidecart.prototype.viewEvents = function( _view ) {
        this.tabClick( _view );
    }
    
    /**
     * Start window resize listener.
     */
    sidecart.prototype.resize = function() {
        var self = this;
        jQuery( window ).resize( function() {
            self.fitToParent();
        })
    }
    
    /**
     * Click a tab and things happen.
     */
    sidecart.prototype.tabClick = function( _view ) {
        var self = this;
        jQuery( '.tabs a[href="#'+_view.id+'"]', self.elem ).on( 'touchstart click', function( _e ) {
            _e.preventDefault();
            var id = jQuery( this ).attr('href').replace('#','');
            self.showView( id );
        });
    }
    
    /**
     * Slide cart in and out.
     */
    sidecart.prototype.slide = function() {
        if ( this.hidden() ) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    
    /**
     * Check if sidecart is hidden.
     */
    sidecart.prototype.hidden = function() {
        return jQuery( this.elem ).hasClass('hidden')
    }
    
    /**
     * Show the cart.
     */
    sidecart.prototype.show = function() {
        jQuery( this.elem ).removeClass('hidden');
    }
    
    /**
     * Hide the cart.
     */
    sidecart.prototype.hide = function() {
        jQuery( this.elem ).addClass('hidden');
    }
    
    /**
     * Hide all the views.
     */
    sidecart.prototype.hideViews = function() {
        jQuery( '.views ', this.elem ).children().hide();
    }
    
    /**
     * Show a specific view and hide the others.
     *
     * @param { string } _id The id of the view.
     */
    sidecart.prototype.showView = function( _id ) {
        if ( _id !== this.last_tab ) {
            this.last_tab = _id;
            this.hideViews();
            jQuery( '#'+_id, this.elem ).show();
            jQuery( '.tabs a', this.elem ).removeClass('selected');
            jQuery( '.tabs a[href="#'+_id+'"]', this.elem ).addClass('selected');
            if ( this.hidden() ) {
                this.slide();
            }
        }
        else {
            this.slide();
        }
        //------------------------------------------------------------
        //  Run view refresh callback
        //------------------------------------------------------------
        this.refreshView( _id );
    }
    
    /**
     * Show a specific view and hide the others.
     *
     * @param { string } _id The id of the view.
     */
    sidecart.prototype.refreshView = function( _viewName ) {
        for ( var i=0, ii=this.config['views'].length; i<ii; i++ ) {
            var view = this.config['views'][i];
            if ( view.id == _viewName && view.refresh != undefined ) {
                view.refresh( this );
            }
        }
    }
    
    /**
     * Show the first tab. 
     */
    sidecart.prototype.showFirst = function() {
        var self = this;
        var first = this.config['views'][0];
        this.showView( first.id );
    }
    
    //----------------
    //  Extend JQuery 
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