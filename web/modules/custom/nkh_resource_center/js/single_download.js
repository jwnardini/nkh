/**
 * @file
 * JavaScript for File Download.
 */

(function (Drupal) {
  'use strict';
  Drupal.behaviors.nkhResourceCenterSingleDownload = function(e, fileUri) {
    var e = window.event || e;
    var targ = e.target || e.srcElement;
    e.preventDefault();
    window.open(fileUri, '_blank');
  }
}(Drupal));

(function ($) {
  'use strict';
  $.fn.downloadZip = function(path) {
    window.open(path, '_blank');
  }
  
  $.fn.myTest = function(data) {
    //document.getElementById('edit-resource-container-rebuild');
    document.getElementsByName('edit-resource-container-rebuild')[0].click()
    Drupal.behaviors.awesome = {
      attach: function(context, settings) {
        // $('#block-sessionblock').find('#nkh-resource-download-form').html(data);
        

      }
    };
  }
})(jQuery);
