/**
 * @file
 * JavaScript for Resource Clipboard Copy.
 */

(function (Drupal) {
  'use strict';
  Drupal.behaviors.nkhResourceCenterCopy = function(e, id) {
    var e = window.event || e;
    var targ = e.target || e.srcElement;
    e.preventDefault();
    var copyPath = document.getElementById('resource_center_file_' + id);
    copyPath.select();
    document.execCommand("copy");
    alert("Copied the text: " + copyPath.value)
  }
}(Drupal));
