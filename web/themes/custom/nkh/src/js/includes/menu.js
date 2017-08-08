(function ($) {
  // DOC READY
  $(function () {

    /**
     * ACCESSIBILITY
     * Menu and skip links
     */

    var nav = $('#navigation > ul.menu'),
      trig = $('#menu-trigger > a'),
      tomaincontentlink = $('#top'),
      backtotoplink = $('#bottom'),
      mobilemenuclass = 'show-menu',
      kids = nav.children();

    // add class for top level menu items
    kids.addClass('top-level-menu-item');


    // add class to first and last links in the menu
    nav.each(function () {
      $(this).find('a').first().addClass('first-menu-item');
      $(this).find('a').last().addClass('last-menu-item');
    });

    // tabbing out of the end menu items
    nav.find('a.last-menu-item').keydown(function (e) {
      // tabbed out no shift
      if (e.which == 9 && !e.shiftKey) {
        outofmenu();
      }
    });
    nav.find('a.first-menu-item').keydown(function (e) {
      // shift tabbed out
      if (e.which == 9 && e.shiftKey) {
        outofmenu();
      }
    });

    // remove focus from menu when you are clicking outside of it
    $(document).on('click', outofmenu());
    nav.click(function (e) {
      e.stopPropagation();
    });

    // add class on focus
    nav.find('a').on({
      focus: function () {
        $(this).closest('.top-level-menu-item').addClass('focus')
          .siblings().removeClass('focus');
      },
      mouseenter: function () {
        // let normal hovers override
        outofmenu();
      }
    });

    // removes focus class and focus from all menu items
    function outofmenu() {
      kids.each(function () {
        $(this).removeClass('focus');
        nav.find('a').blur();
      });
    }

    /**
     * Menu mobile trigger
     */

    // Menu trigger functionality
    // trig.click(function(e){
    //   e.preventDefault();
    //   $('body').toggleClass('no-scroll menu-open');
    //   $('#header nav, #header .menu-trigger').toggleClass('show-menu');
    // });
    //
    // trig.keydown(function(e){
    //   if (!trig.parent().hasClass(mobilemenuclass)) {
    //     if(e.which == 9 && !e.shiftKey) {
    //       $(this).trigger('click');
    //     }
    //   }
    // });
    // nav.find('a.first-menu-item').keydown(function(e){
    //   // shift tabbed out
    //   if(e.which == 9 && e.shiftKey) {
    //     trig.trigger('click');
    //   }
    // });
    // nav.find('a.last-menu-item').keydown(function(e){
    //   // shift tabbed out
    //   if(e.which == 9 && !e.shiftKey) {
    //     trig.trigger('click').addClass('return-check');
    //   }
    // }).on('focus', function(){
    //   if(trig.hasClass('return-check')) {
    //     trig.removeClass('return-check')
    //       .trigger('click');
    //     $(this).focus();
    //   }
    // });


    /**
     * Skip links
     */
    tomaincontentlink.on({
      focus: function () {
        trig.removeClass('return-check');
      },
      click: function () {
        trig.addClass('return-check');
      }
    });
    backtotoplink.on('focus', function () {
      // scroll back to top link into view
      window.scrollTo(0, document.body.scrollHeight);
    });

  });
})(jQuery);