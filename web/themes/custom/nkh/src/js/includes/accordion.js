// Accordion styling functionality and animation
(function ($) {
  // DOC READY
  $(function () {
    
    var accordioncontainer = '.custom-accordion',
      accordioncontent = '.accordion-content',
      accordiontrigger = '.accordion-trigger';

    $(accordioncontainer).each(function (i) {
      $(this).addClass('tm-accordion-enabled');
      if (i > 0) {
        $(this).addClass('collapsed').find(accordioncontent).slideUp('fast');
      }
    });

    $(accordioncontainer + ' ' + accordiontrigger + ' a').click(function (e) {
      e.preventDefault();
      $(this).closest(accordioncontainer).toggleClass('collapsed');
      $(this).parent().next(accordioncontent).slideToggle('fast');
    });

  });
})(jQuery);