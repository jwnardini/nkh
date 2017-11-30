(function ($) {
    // Drupal.behaviors.newslettersearch_behavior = {
        //attach: function(context, settings) {

            // This was firing twice.
            // Ajax returns the entire page, so the script ran twice.
            // http://codekarate.com/blog/drupal-7-prevent-duplicating-javascript-behaviors

            //if (context == document) {

                $( '.block-search' ).prepend( '<button class="header-search-form__toggle"><span class="element-invisible">Open the Search Form</span></button>');

                var $everything = $(window);
                // add class to this list for toggle class on the same page. Use this on footer/header sectionss.
                var $blocks = $('.block-mobilecommonssignup .text-formatted, .block-newslettersignupform, .block-newslettersignupform-2, .block-search')

                // give the classes above a common share class.
                $blocks.addClass('toggle-class');


                $(document).on('click', function(e) {
                    // remove all the click listening by checking if it has toggle-class
                    if( !$(e.target).parents().hasClass('toggle-class') ) {
                        if( $('.open').is(':visible') ) {
                            $('.open').removeClass('open');
                        }else{
                          //nothing.
                        }
                    }
                });
                $blocks.click(function() {
                    // this removes all the slibings open class
                    if( $('.open').is(':visible') ) {
                        $('.open').removeClass('open');
                    }
                    // this add the open class to the specific clicked object.
                    $(this).addClass('open');
                });

                $('.cta-form__toggle').on('click keyup', function() {
                  $(this).parents('.cta-form').toggleClass('visible');
                });

      					$( '.cta-form__fields' ).on('focusin', function() {
      						$(this).parents('.cta-form').addClass( 'visible' );
      					});

            //}

        //END CODE
        // }
    // };
// })(jQuery, Drupal, this, this.document);
})(jQuery);
