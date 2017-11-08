(function ($) {
    // Drupal.behaviors.newslettersearch_behavior = {
        //attach: function(context, settings) {

            // This was firing twice.
            // Ajax returns the entire page, so the script ran twice.
            // http://codekarate.com/blog/drupal-7-prevent-duplicating-javascript-behaviors

            //if (context == document) {

                $( '.block-search' ).prepend( '<button class="header-search-form__toggle"><span class="element-invisible">Open the Search Form</span></button>');


                $('#block-newslettersignupform, .block-search')

                //$('.header-newsletter-form__toggle, .header-search-form__toggle')
                    .off('mousedown').on('mousedown', function() {
                        if ( $(this).hasClass( 'open' ) ) {
                            $(this).removeClass( 'open' ).addClass( 'closed' );
                            //console.log('It had the open class, and on click closed');
                        }
                        else if ( $(this).siblings().hasClass( 'open' ) ) {
                            $(this).siblings().removeClass( 'open' ).addClass( 'closed' );
                            $(this).addClass( 'open' ).removeClass( 'closed' );
                            //console.log('The sibling had the open class, and on click closed');
                        }
                        else {
                            $(this).addClass( 'open' ).removeClass( 'closed' );
                            //console.log('It opened on click');
                        }
                    })

                    .on( 'focusin', function() {
                        if ( $(this).siblings().hasClass( 'open' ) ) {
                            $(this).siblings().removeClass( 'open' ).addClass( 'closed' );
                            $(this).addClass( 'open' ).removeClass( 'closed' );
                            //console.log('It got focus, and the sibling had the open class, so sibling was closed and this was opened.');
                        }
                        else if ( $(this).hasClass( 'open' ) ) {
                            //do nothing
                            //console.log('It had the open class, and so on focus didnt change');
                        }
                        else {
                            $(this).addClass( 'open' ).removeClass( 'closed' );
                            //console.log('It opened when the focus went to it.');
                        }
                    })

                    .on( 'focusout blur', function() {
                        $(this).removeClass( 'open' ).addClass( 'closed' );
                        console.log('It closed on blur');
                    });

            //}

        //END CODE
        // }
    // };
// })(jQuery, Drupal, this, this.document);
})(jQuery);
