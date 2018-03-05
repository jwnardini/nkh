(function ($) {
    // Drupal.behaviors.newslettersearch_behavior = {
        //attach: function(context, settings) {

            // This was firing twice.
            // Ajax returns the entire page, so the script ran twice.
            // http://codekarate.com/blog/drupal-7-prevent-duplicating-javascript-behaviors

            //if (context == document) {

                $( '.block-exposedformsite-db-searchpage-form' ).prepend( '<button class="header-search-form__toggle"><span class="element-invisible">Open the Search Form</span></button>');
                $( '.block-exposedformsite-db-searchpage-form form' ).prepend( '<a class="icon icon-close"><span class="element-invisible">Close the search</span></a>');
                $( 'form.newsletter-signup' ).prepend( '<a class="icon icon-close"><span class="element-invisible">Close the search</span></a>');

                var $everything = $(window);
                // add class to this list for toggle class on the same page. Use this on footer/header sectionss.
                var $blocks = $('.block-mobilecommonssignup .text-formatted, .block-newslettersignupform, .block-newslettersignupform-2, .block-newslettersignupformfooter, .block-exposedformsite-db-searchpage-form');
                var $blocksButton = $('.block-mobilecommonssignup .mobile-alert-button, .block-newslettersignupform .text-formatted .header-newsletter-form__toggle, .block-newslettersignupform-2 .text-formatted .header-newsletter-form__toggle, .block-newslettersignupformfooter .text-formatted .header-newsletter-form__toggle, .block-exposedformsite-db-searchpage-form .header-search-form__toggle');
                var $blocksCloseButton = $('.block-exposedformsite-db-searchpage-form .icon-close, .block-newslettersignupform .icon-close, .block-newslettersignupform-2 .icon-close, .block-newslettersignupformfooter .icon-close');

                // give the classes above a common share class.
                $blocks.addClass('toggle-class');
                $blocksButton.addClass('toggle-button');


                $(document).on('click', function(e) {
                    // remove all the click listening by checking if it has toggle-class
                    if( !$(e.target).parents().hasClass('toggle-class') ) {
                        if( $('.open-item').is(':visible') ) {

                            $('.toggle-button').removeClass('toggled');
                            $('.open-item').removeClass('open-item');

                        }else{

                        }
                    }

                });


                $blocksButton.click(function(e) {

                    $('.open-item').removeClass('open-item');
                    $(this).toggleClass('toggled');


                    if($(this).hasClass('toggled')){
                        $(this).closest('.toggle-class').addClass('open-item');
                    }else{
                        $('.toggle-button').removeClass('toggled');
                        $(this).closest('.toggle-class').removeClass('open-item');

                    }

                });

                $blocksCloseButton.click(function(e) {
                    if( $('.open-item').is(':visible') ) {

                        $('.toggle-button').removeClass('toggled');
                        $('.open-item').removeClass('open-item');
                    }
                });
            //}

        //END CODE
        // }
    // };
// })(jQuery, Drupal, this, this.document);
})(jQuery);
