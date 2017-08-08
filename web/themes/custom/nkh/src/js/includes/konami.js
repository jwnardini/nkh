(function ($) {
  // Keycode commands
  $.fn.codeAction = function(code, action) {
    var curr = 0;
    jQuery(this).keydown(function(event) {
      if (event.keyCode == code[curr]) {
        curr++;
      }
      else {
        curr = 0;
        return;
      }
      if (curr == 10) {
        action();
        curr = 0;
      }
    });
    return this;
  };

  // DOC READY
  $(function () {

    // Konami Code U-U-D-D-L-R-L-R-B-A
    $('body').codeAction([38,38,40,40,37,39,37,39,66,65], function() {
      alert('Konami Mode Enabled!');
      var KICKASSVERSION = '2.0';
      var s = document.createElement('script');
      s.type = 'text/javascript';
      document.body.appendChild(s);
      s.src = '//hi.kickassapp.com/kickass.js';
    });

  });
})(jQuery);