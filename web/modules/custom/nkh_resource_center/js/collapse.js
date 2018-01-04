/**
 * @file
 * JavaScript for Resource Clipboard Copy.
 */

(function ($) {
  'use strict';

  Drupal.behaviors.nkhToggleResources = {
    attach: function (context, settings) {
      $(document, context).once().on('click', '#nkh_toggle_resource_container', function(e) {
        e.preventDefault();
        if ($('#nkh_resource_list').hasClass('closed')) {
          $('#nkh_toggle_resource_container').html('Collapse Items');
          $('#nkh_toggle_resource_container').addClass('collapsed');
          $('#nkh_resource_list').removeClass('closed').addClass('open');
        } else {
          $('#nkh_toggle_resource_container').html('View All Items');
          $('#nkh_toggle_resource_container').removeClass('collapsed');
          $('#nkh_resource_list').removeClass('open').addClass('closed');
        }
      })
      
    }
  }
})(jQuery);
