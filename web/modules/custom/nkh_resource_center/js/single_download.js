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
})(jQuery);
