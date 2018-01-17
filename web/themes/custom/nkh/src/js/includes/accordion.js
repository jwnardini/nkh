(function ($, Drupal) {
  Drupal.behaviors.resourceFilters = {
    attach: function(context, settings) {
    
      // var accordioncontainer = '.custom-accordion',
      //   accordioncontent = '.accordion-content',
      //   accordiontrigger = '.accordion-trigger';

      // $(accordioncontainer).each(function (i) {
      //   $(this).addClass('tm-accordion-enabled');
      //   if (i > 0) {
      //     $(this).addClass('collapsed').find(accordioncontent).slideUp('fast');
      //   }
      // });

      // $(accordioncontainer + ' ' + accordiontrigger + ' a').click(function (e) {
      //   e.preventDefault();
      //   $(this).closest(accordioncontainer).toggleClass('collapsed');
      //   $(this).parent().next(accordioncontent).slideToggle('fast');
      // });
      $('.block-facet--checkbox, .block-exposedformdb-resource-centerpage-1 fieldset.form-wrapper').addClass('accordion-wrapper');
      $('.block-facet--checkbox ul, .block-exposedformdb-resource-centerpage-1 div.fieldset-wrapper').addClass('accordion-content');

      function resourceFiltersToggle() {
          //only for the resource center
          $('.block-exposedformdb-resource-centerpage-1 legend, .block-facet--checkbox h2').on('click', function(e) {
            //mobile only
            if ($(window).width() < 1024) {
              $(this).closest('.accordion-wrapper').toggleClass('collapsed');
              $(this).siblings('.accordion-content').toggleClass('mobile-show');
            };
          });
      };


      resourceFiltersToggle();
    }

  };
})(jQuery, Drupal);