// Append and restart cta animation on mouseenter
(function ($) {
  // DOC READY
  $(function () {

    $('#block-views-block-cta-references-basic-page').mouseenter(function() {
      var $div = $(this);

      var img = document.createElement('img');
      img.src = "/themes/custom/nkh/images/btn-bingo-loop.gif?" + new Date().getTime();

      $div.append('<div class="cta-animation"></div>');

      $(img).on('load', function(){
        $('.cta-animation').css({backgroundImage: "url("+img.src+")"});
      });
    });

    $('#block-views-block-cta-references-basic-page').mouseleave(function() {
      var animation = $(this).find('.cta-animation');
      if (animation) {
        animation.remove();
      }
    });

  });
})(jQuery);
