// Tab styling functionality and animation
(function ($) {
  // DOC READY
  $(function () {

    var tabcontainer = '.tm-tabs',
      tabcontent = '.tab-content',
      tablabel = '.tab-label';

    // prepare the tabs for interaction
    $(tabcontainer).each(function () {
      // add class to provide default state
      $(this).addClass('tm-tab-enabled');

      $(this).find(tablabel).addClass('tm-tab-label');

      // empty string to append tab links
      var tablinks = '';

      // loop through tab content
      $(this).find(tabcontent).each(function (i) {
        var tablink = '<a href="#" data-tab="tab-number-' + i + '">' + $(this).find(tablabel).text() + '</a>';

        if (i > 0) {
          // hide the tab content that is not the first one
          $(this).addClass('tm-tab-hide');
          tablink = '<li>' + tablink + '</li>';
        }
        else {
          // make the first tab link active
          tablink = '<li class="active">' + tablink + '</li>';
        }

        tablinks += tablink;

        // add an index specific class to content
        $(this).addClass('tm-tab-content').addClass('tab-number-' + i);
      });

      // add the tablinks to the markup
      $(this).prepend('<ul class="tm-tab-links">' + tablinks + '</ul>');
    });


    // trigger click events on the tabs we created
    $('.tm-tab-links a').click(function (e) {
      e.preventDefault();
      var tab = $(this).data('tab');

      // track active state of the tabcontent
      $(this).closest(tabcontainer).find(tabcontent).addClass('tm-tab-hide');
      $(this).closest(tabcontainer).find('.' + tab).removeClass('tm-tab-hide');

      // track active state of the links
      $(this).parent().siblings().removeClass('active');
      $(this).parent().addClass('active');

    });

  });
})(jQuery);