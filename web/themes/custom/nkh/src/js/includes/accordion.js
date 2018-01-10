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

      function resourceFiltersToggle() {
          //only for the resource center
          $('#views-exposed-form-resource-view-page-1 legend').on('click', function(e) {
            //mobile only
            if ($(window).width() < 1024) {
              $(this).closest('fieldset.form-wrapper').toggleClass('collapsed');
              $(this).siblings('div.fieldset-wrapper').toggleClass('mobile-hide');
            };
          });
      };


      resourceFiltersToggle();
    }

  };
})(jQuery, Drupal);