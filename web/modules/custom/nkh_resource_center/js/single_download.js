/**
 * @file
 * JavaScript for Resource Clipboard Copy.
 */

(function (Drupal) {
  'use strict';
  Drupal.behaviors.nkhResourceCenterSingleDownload = function(fileUri) {
    event.preventDefault();
    window.open(fileUri, '_blank');
  }
}(Drupal));
