/**
 * @file
 * JavaScript for Resource Clipboard Copy.
 */

(function (Drupal, $) {
  'use strict';
  Drupal.behaviors.nkhCollapseItems = function() {
    event.preventDefault();
    if ($('#nkh_resource_list').hasClass('closed')) {
      $('#nkh_resource_list').removeClass('closed');
      $('#nkh_resource_list').addClass('open');
    } else if ($('#nkh_resource_list').hasClass('open')) {
      $('#nkh_resource_list').removeClass('open');
      $('#nkh_resource_list').addClass('closed');
    }

    
  }
}(Drupal, jQuery));
