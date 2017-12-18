(function ($) {// (function ($, Drupal, window, document, undefined) {
  // // To understand behaviors, see https://drupal.org/node/756722#behaviors
  //     Drupal.behaviors.accessiblemenu = {
  //         attach: function(context, settings) {

  //Code here
  //

  $( '.menu' ).on( 'mouseenter focus', '.menu-item--expanded > a', function( e ) {
    var el = $( this );
    el.toggleClass( 'has-focus' );
    // Show sub-menu
    el.parents( '.menu-item' ).attr( 'aria-expanded', 'true' );
  }).on( 'mouseleave blur', '.menu-item--expanded > a', function( e ) {
    var el = $( this );
    el.toggleClass( 'has-focus' );
    // Only hide sub-menu after a short delay, so links get a chance to catch focus from tabbing
    setTimeout( function() {
      if ( el.siblings( 'li.menu-item > .menu' ).attr( 'data-has-focus' ) !== 'true' ) {
        el.parents( 'li.menu-item' ).attr( 'aria-expanded', 'false' );
      }
    }, 100 );
  }).on( 'mouseenter focusin', 'li.menu-item > .menu', function( e ) {
    var el = $( this );
    el.attr( 'data-has-focus', 'true' );
  }).on( 'mouseleave focusout', 'li.menu-item > .menu', function( e ) {
    var el = $( this );
    setTimeout( function() {
      // Check if anything else has picked up focus (i.e. next link in sub-menu)
      if ( el.find( ':focus' ).length === 0 ) {
        el.attr( 'data-has-focus', 'false' );
        // Hide sub-menu on the way out if parent link doesn't have focus now
        if ( el.siblings( 'li.menu-item a.has-focus' ).length === 0 ) {
          el.parents( '.menu-item--expanded' ).attr( 'aria-expanded', 'false' );
        }
      }
    }, 100 );
  });


  //     }
  // };

  //
  // })(jQuery, Drupal, this, this.document);

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  /*!
   * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
   * http://briancherne.github.io/jquery-hoverIntent/
   *
   * You may use hoverIntent under the terms of the MIT license. Basically that
   * means you are free to use hoverIntent as long as this header is left intact.
   * Copyright 2007, 2014 Brian Cherne
   */

  /* hoverIntent is similar to jQuery's built-in "hover" method except that
   * instead of firing the handlerIn function immediately, hoverIntent checks
   * to see if the user's mouse has slowed down (beneath the sensitivity
   * threshold) before firing the event. The handlerOut function is only
   * called after a matching handlerIn.
   *
   * // basic usage ... just like .hover()
   * .hoverIntent( handlerIn, handlerOut )
   * .hoverIntent( handlerInOut )
   *
   * // basic usage ... with event delegation!
   * .hoverIntent( handlerIn, handlerOut, selector )
   * .hoverIntent( handlerInOut, selector )
   *
   * // using a basic configuration object
   * .hoverIntent( config )
   *
   * @param  handlerIn   function OR configuration object
   * @param  handlerOut  function OR selector for delegation OR undefined
   * @param  selector    selector OR undefined
   * @author Brian Cherne <brian(at)cherne(dot)net>
   */

  (function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
    } else if (jQuery && !jQuery.fn.hoverIntent) {
      factory(jQuery);
    }
  })(function($) {
    'use strict';

    // default configuration values
    var _cfg = {
      interval: 100,
      sensitivity: 6,
      timeout: 0
    };

    // counter used to generate an ID for each instance
    var INSTANCE_COUNT = 0;

    // current X and Y position of mouse, updated during mousemove tracking (shared across instances)
    var cX, cY;

    // saves the current pointer position coordinates based on the given mousemove event
    var track = function(ev) {
      cX = ev.pageX;
      cY = ev.pageY;
    };

    // compares current and previous mouse positions
    var compare = function(ev,$el,s,cfg) {
      // compare mouse positions to see if pointer has slowed enough to trigger `over` function
      if ( Math.sqrt( (s.pX-cX)*(s.pX-cX) + (s.pY-cY)*(s.pY-cY) ) < cfg.sensitivity ) {
        $el.off(s.event,track);
        delete s.timeoutId;
        // set hoverIntent state as active for this element (permits `out` handler to trigger)
        s.isActive = true;
        // overwrite old mouseenter event coordinates with most recent pointer position
        ev.pageX = cX; ev.pageY = cY;
        // clear coordinate data from state object
        delete s.pX; delete s.pY;
        return cfg.over.apply($el[0],[ev]);
      } else {
        // set previous coordinates for next comparison
        s.pX = cX; s.pY = cY;
        // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
        s.timeoutId = setTimeout( function(){compare(ev, $el, s, cfg);} , cfg.interval );
      }
    };

    // triggers given `out` function at configured `timeout` after a mouseleave and clears state
    var delay = function(ev,$el,s,out) {
      delete $el.data('hoverIntent')[s.id];
      return out.apply($el[0],[ev]);
    };

    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {
      // instance ID, used as a key to store and retrieve state information on an element
      var instanceId = INSTANCE_COUNT++;

      // extend the default configuration and parse parameters
      var cfg = $.extend({}, _cfg);
      if ( $.isPlainObject(handlerIn) ) {
        cfg = $.extend(cfg, handlerIn);
        if ( !$.isFunction(cfg.out) ) {
          cfg.out = cfg.over;
        }
      } else if ( $.isFunction(handlerOut) ) {
        cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
      } else {
        cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
      }

      // A private function for handling mouse 'hovering'
      var handleHover = function(e) {
        // cloned event to pass to handlers (copy required for event object to be passed in IE)
        var ev = $.extend({},e);

        // the current target of the mouse event, wrapped in a jQuery object
        var $el = $(this);

        // read hoverIntent data from element (or initialize if not present)
        var hoverIntentData = $el.data('hoverIntent');
        if (!hoverIntentData) { $el.data('hoverIntent', (hoverIntentData = {})); }

        // read per-instance state from element (or initialize if not present)
        var state = hoverIntentData[instanceId];
        if (!state) { hoverIntentData[instanceId] = state = { id: instanceId }; }

        // state properties:
        // id = instance ID, used to clean up data
        // timeoutId = timeout ID, reused for tracking mouse position and delaying "out" handler
        // isActive = plugin state, true after `over` is called just until `out` is called
        // pX, pY = previously-measured pointer coordinates, updated at each polling interval
        // event = string representing the namespaced event used for mouse tracking

        // clear any existing timeout
        if (state.timeoutId) { state.timeoutId = clearTimeout(state.timeoutId); }

        // namespaced event used to register and unregister mousemove tracking
        var mousemove = state.event = 'mousemove.hoverIntent.hoverIntent'+instanceId;

        // handle the event, based on its type
        if (e.type === 'mouseenter') {
          // do nothing if already active
          if (state.isActive) { return; }
          // set "previous" X and Y position based on initial entry point
          state.pX = ev.pageX; state.pY = ev.pageY;
          // update "current" X and Y position based on mousemove
          $el.off(mousemove,track).on(mousemove,track);
          // start polling interval (self-calling timeout) to compare mouse coordinates over time
          state.timeoutId = setTimeout( function(){compare(ev,$el,state,cfg);} , cfg.interval );
        } else { // "mouseleave"
          // do nothing if not already active
          if (!state.isActive) { return; }
          // unbind expensive mousemove event
          $el.off(mousemove,track);
          // if hoverIntent state is true, then call the mouseOut function after the specified delay
          state.timeoutId = setTimeout( function(){delay(ev,$el,state,cfg.out);} , cfg.timeout );
        }
      };

      // listen for mouseenter and mouseleave
      return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
  });

  //
  // (function ($, Drupal, window) {
  //     Drupal.behaviors.mobilenav_behavior = {
  //         attach: function(context, settings) {

  //Code here

  function nkhMobileMenuParts() {
    $('#block-nkh-main-menu li.menu-item a').addClass('menu-link');
    $('#block-nkh-main-menu li.menu-item--expanded').append('<a class="sub-nav-toggle"><span class="element-invisible">Open Sub-navigation</span></a>');
    $('#block-nkh-main-menu li.menu-item--expanded > .menu').append('<a class="sub-nav-toggle-back">' + 'Back' + '</a>');
  }


  function nkhMobileMenu() {


    var menutoggle = $('.menu-toggle');
    var menublock = $('#block-nkh-main-menu');
    var headergroup = $('.region-header');
    var header = $('#header');
    var isMobile = menutoggle.is(':visible');
    var framework = $('html, body');

    var subnavtoggle = $('.sub-nav-toggle');
    var subnavtoggleback = $('.sub-nav-toggle-back');
    var menulink = $('#block-nkh-main-menu .menu li.menu-item .menu-link');
    var menuset = $('#block-nkh-main-menu .menu .main-navigation');
    var subnav = $("#block-nkh-main-menu .menu li.menu-item--expanded .main-navigation");


    if (isMobile) {

      menublock.addClass('mobile-menu');
      headergroup.addClass('mobile');

      // Add in click open on the main nav with accessibility
      menutoggle.off('click keyup').on('click keyup', function() {
        if (menutoggle.hasClass('open')) {
          headergroup.removeClass('open').attr('aria-expanded', 'false');
          menutoggle.removeClass('open').attr('aria-expanded', 'false');
          menublock.removeClass('open').attr('aria-expanded', 'false');
          header.removeClass('stay-open stay-open-menu');
          framework.removeClass('open-menu');

        }
        else {
          headergroup.addClass('open').attr('aria-expanded', 'true');
          menutoggle.addClass('open').attr('aria-expanded', 'true');
          menublock.addClass('open').attr('aria-expanded', 'true');
          header.addClass('stay-open stay-open-menu');
          framework.addClass('open-menu')
        }
      });

      subnavtoggle.off('click keyup').on('click keyup', function() {
        if ( $(this).hasClass('open') ) {
          $(this).removeClass('open');
          $(this).siblings('.menu').removeClass('open').attr('aria-expanded', 'false');
          $(this).closest('.menu').removeClass('subnav');
        } else {
          subnavtoggleback.addClass('open');
          $(this).addClass('open');
          $(this).siblings('.menu').addClass('open').attr('aria-expanded', 'true');
          $(this).closest('.menu').addClass('subnav');
        }
        $('.stay-open-menu').animate({
          scrollTop: 0
        }, 400);
      });

      subnavtoggleback.off('click keyup').on('click keyup', function() {
        $(this).removeClass('open');
        $(this).parent().removeClass('open');
        $(this).parent().siblings(subnavtoggle).removeClass('open').attr('aria-expanded', 'false');
        $(this).closest('.subnav').removeClass('subnav');
        $('.stay-open-menu').animate({
          scrollTop: 0
        }, 400);
      });
    }
    else {
      headergroup.removeClass('open mobile').attr('aria-expanded', '');
      menutoggle.removeClass('open').attr('aria-expanded', '');
      menublock.removeClass('open mobile-menu').attr('aria-expanded', '');
      header.removeClass('stay-open stay-open-menu');
      framework.removeClass('open-menu');
      menuset.removeClass('subnav');
      subnavtoggle.removeClass('open').siblings('.menu').attr('aria-expanded', '').removeClass('open').closest('.menu').removeClass('subnav');
      // $('.menu.main-navigation.open a.sub-nav-toggle-back.menu-link.open').remove();
      // $('.sub-nav-toggle-back').remove();
      // $('.sub-nav-toggle').remove();
    }

    menulink.on('focus', function(){
      $(this).parents('.menu-item').addClass('open');
    });
    menulink.on('blur', function(){
      $(this).parents('.menu-item').removeClass('open');
    });

  }

  $( document ).ready( nkhMobileMenuParts );
  $( document ).ready( nkhMobileMenu );
  $( window ).resize( nkhMobileMenu );


  //     }
  // };
  // })(jQuery, Drupal, this);

  /**
   * @file
   * A JavaScript file for the theme.
   *
   * In order for this JavaScript to be loaded on pages, see the instructions in
   * the README.txt next to this file.
   */

  // JavaScript should be made compatible with libraries other than jQuery by
  // wrapping it with an "anonymous closure". See:
  // - https://drupal.org/node/1446420
  // - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
  // (function ($, Drupal) {
  // 'use strict';
  //   // To understand behaviors, see https://www.drupal.org/node/2269515
  //   Drupal.behaviors.basic = {
  //     attach: function (context, settings) {


  // Execute code once the DOM is ready. $(document).ready() not required within Drupal.behaviors.

  // $(window).load(function () {
  //   // Execute code once the window is fully loaded.

  // });

  // $(window).resize(function () {
  //   // Execute code when the window is resized.
  // });

  // $(window).scroll(function () {
  //   // Execute code when the window scrolls.
  // });

  //   }
  // };


  // })(jQuery, Drupal);
}(jQuery));
