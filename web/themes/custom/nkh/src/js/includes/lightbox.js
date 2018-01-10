(function ($, Drupal) {
    Drupal.behaviors.toggleVideoBehavior = {
        attach: function(context, settings) {

          //Code here

          // Click Play to open the lightbox and play the video
          // Click anywhere to close the video
          // Make sure there is a close button

          $('div.video-wrapper').attr({
              role: 'dialog', 
              'aria-labelledby': 'video_label',
              'aria-modal': 'true',
              'aria-hidden': 'true'
          });
          $('div.video-wrapper .video-embed-field-responsive-video').append('<p class="icon icon-close"><span class="element-invisible">close this video></span></p>');

          function videoToggle() {
              //only for the resource center
              $('.our-stories-wrapper a.icon-video').on('click', function(e) {
                $('div.video-wrapper').attr('aria-hidden', 'false');
                //mobile only
                  $(this).parents('.views-row').find('div div.video-wrapper').addClass('show');
              });
          };

          function closeVideo() {
              //only for the resource center
              $closeVideoButton = $('div.video-wrapper, div.video-wrapper .icon-close');
              $closeVideoButton.on('click', function(e) {
                $('div.video-wrapper').attr('aria-hidden', 'true');
                $(this).removeClass('show');
              });
          };

          videoToggle();
          closeVideo();
        }

    };
})(jQuery, Drupal);