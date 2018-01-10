// import modernizr
require('!modernizr!./.modernizrrc');

// import toolkit scripts
require('./includes/eqheights');
require('./includes/accordion');
require('./includes/table');
require('./includes/throttle');
require('./includes/header');
require('./includes/cookies');
require('./includes/viewport');
require('./includes/menu');
require('./includes/mobile-menu');
require('./includes/lightbox');
require('./includes/newsletter-search');
require('./includes/shorten');
require('./includes/skip-links');
require('./includes/form');
require('./includes/tabs');
require('./includes/sticky');
require('./includes/konami');
require('./includes/carousel');
require('./includes/cta-animation');

(function ($) {
  // DOC READY
  $(function () {
    // Place code here or place in a toolkit script file and require above
    $('.view-display-id-national_partners.view-core-partners .view-content').addClass('owl-carousel');

    $(".owl-carousel").owlCarousel({
      items:3,
      dots: false,
      nav: true,
      smartSpeed: 900,
      navText: ["<i class='icon icon-prev'></i>","<i class='icon icon-next'></i>"],
      lazyLoad: true
    });

//    $('.owl-carousel').owlCarousel();
    // Example of using throttle
    // $(window).on('resize', throttle(function () {
    //   console.log('resize');
    // }));

  });
})(jQuery);
