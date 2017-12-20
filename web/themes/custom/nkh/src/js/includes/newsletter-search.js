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
                var $blocks = $('.block-mobilecommonssignup .text-formatted, .block-newslettersignupform, .block-newslettersignupform-2, .block-search');
                var $blocksButton = $('.block-mobilecommonssignup .mobile-alert-button, .block-newslettersignupform .text-formatted .header-newsletter-form__toggle, .block-newslettersignupform-2 .text-formatted .header-newsletter-form__toggle, .block-search .header-search-form__toggle');

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

            //}

        //END CODE
        // }
    // };
// })(jQuery, Drupal, this, this.document);
})(jQuery);
