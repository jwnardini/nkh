require('fancybox')($);
require('fancybox/dist/css/jquery.fancybox.css');

// http://fancyapps.com/fancybox/
(function ($) {
  // DOC READY
  $(function () {

    $('.fancybox').fancybox({
      // Accessibility
      // Set focus to the modal on show
      afterShow: function () {
        $(this.wrap).queue(function () {
          $(this).focus();
        });

        // trigger click of close buton if you tab out
        $('a.fancybox-close').keydown(function (e) {
          if (e.which == 9 && !e.shiftKey) {
            $(this).trigger('click');
          }
        });
      },
      // Set focus to the trigger on close
      afterClose: function () {
        $(this.element).focus();
      }
    });
  
  });
})(jQuery);
