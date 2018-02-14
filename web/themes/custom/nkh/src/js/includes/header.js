(function ($, Drupal) {
    Drupal.behaviors.headerBehavior = {
        attach: function(context, settings) {

            //Code here

            //http://agencychiefjira.com:8080/browse/NKH-1064 
            // add a check here to make sure that this function only fires
            // when it's not on resource center
            if(!$('body').hasClass('path-resource-center')){
              // Start hide header on scroll down
              var didScroll = false;
              var veryTop = 0;
              var delta = 5;

              $(window).scroll(function(event){
                  didScroll = true;
              });

              setInterval(function() {
                  if (didScroll) {
                      hasScrolled();
                      didScroll = false;
                  }

              }, 100);
              $('#header').addClass('top').css({'position' : 'fixed'});

              function hasScrolled() {
                var header = jQuery('#header');
                var st = jQuery(this).scrollTop();
                var navbarHeight = header.outerHeight();
                var height = jQuery(window).scrollTop();
                var atTop = ( height < (navbarHeight * 2 ) );
                var scrolldown = (st > veryTop && st > (navbarHeight * 2 ));
                var scrollup = (st + jQuery(window).height() < jQuery(document).height());
                // var top = 0;


                // if mobile menu is open, don't do anything -
                // this avoids a lot of weird scrolling behavior
                if ( $( '.menu--main' ).hasClass( 'mobile-menu' ) ) {
                  return;
                }

                // Make sure they scroll more than delta
                if(Math.abs(veryTop - st) <= delta){
                  return;                
                }

                if ( atTop ) {
                  header.css({
                    'top' : '',
                    'position' : 'absolute',
                    'box-shadow' : 'none',
                  })
                    .addClass('top')
                    .removeClass('top-sticky')
                    .removeClass( 'top-sticky-hidden');
                }
                else if ( scrolldown && ( height < ((navbarHeight * 2 ) + 300 )) ) {
                  // Scroll Down
                  header.css({
                    'top' : - navbarHeight,
                    'position' : 'absolute',
                    'box-shadow' : 'none',
                  })
                    .removeClass('top')
                    .addClass('top-sticky')
                    .addClass( 'top-sticky-hidden');
                }
                else if ( scrolldown ) {

                  // Scroll Down
                  header.css({
                    'top' : - navbarHeight,
                    'position' : 'fixed',
                    'box-shadow' : 'none',
                  })
                    .removeClass('top')
                    .addClass('top-sticky')
                    .addClass( 'top-sticky-hidden');

                }
                else if ( scrollup && ( height < ((navbarHeight * 2 ) + 300 )) )  {
                  //Scroll Up almost at the top, hide the bar again
                  header.css({
                    'top' : - navbarHeight,
                    'position' : 'fixed',
                    'box-shadow' : 'none',
                  })
                    .removeClass( 'top-sticky-hidden');

                    // .removeClass('top')
                    // .addClass('top-sticky');
                }
                else if ( scrollup )  {
                  //Scroll Up
                  header.css({
                    'top' : '',
                    'position' : 'fixed',
                    'box-shadow' : '0 0 1rem #383d44',
                  })
                    .removeClass('top')
                    .removeClass( 'top-sticky-hidden')
                    .addClass('top-sticky'); // slow down the animation
                }

                veryTop = st;
              }
              // End of hide header on on scroll down

              $( window ).resize(function(event){

                hasScrolled();

              });              
            }


         }

    };
})(jQuery, Drupal);