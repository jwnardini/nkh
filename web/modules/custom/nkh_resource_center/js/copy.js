/**
 * @file
 * JavaScript for Resource Clipboard Copy.
 */

(function (Drupal) {
  'use strict';
  Drupal.behaviors.nkhResourceCenterCopy = function() {
    event.preventDefault();
    var copyPath = document.getElementById('resource_center_file');
    copyPath.select();
    document.execCommand("copy");
    alert("Copied the text: " + copyPath.value)
  }
}(Drupal));
