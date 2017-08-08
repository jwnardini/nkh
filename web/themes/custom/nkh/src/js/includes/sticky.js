require('sticky-kit');

// Sticky Kit
// Config options here https://github.com/leafo/sticky-kit/
(function ($) {
  // DOC READY
  $(function () {

    // sticky elements within a container scope
    $('.make-sticky h2').stick_in_parent({
      parent: '.f-container'
    }).on("sticky_kit:stick", function(e) {
      // add z-index value to be on top
      $(this).css({
        'z-index': 1
      })
    });

  });
})(jQuery);