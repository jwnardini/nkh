// import modernizr
require('!modernizr!./.modernizrrc');

// import toolkit scripts
require('./includes/eqheights');
require('./includes/accordion');
require('./includes/table');
require('./includes/throttle');
require('./includes/cookies');
require('./includes/viewport');
require('./includes/menu');
require('./includes/shorten');
require('./includes/skip-links');
require('./includes/form');
require('./includes/tabs');
require('./includes/sticky');
require('./includes/konami');

(function ($) {
  // DOC READY
  $(function () {
    // Place code here or place in a toolkit script file and require above

    // Example of using throttle
    // $(window).on('resize', throttle(function () {
    //   console.log('resize');
    // }));

  });
})(jQuery);
