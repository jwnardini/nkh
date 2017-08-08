// Responsive data tables with headers
(function ($) {
  // DOC READY
  $(function () {

    $('table.data').each(function () {
      var headertext = [],
        headers = $(this).find('thead th'),
        tablerows = $(this).find('tbody tr');

      if (headers.length) {
        // Grab headers and put them into array
        headers.each(function (i) {
          var current = headers[i];
          headertext.push(current.textContent.replace(/\r?\n|\r/, ""));
          // add class to empty header cells
          if (!current.textContent) {
            $(this).addClass('empty-header-cell');
          }
        });

        // set attribute on each cell within a row
        tablerows.each(function () {
          $(this).children().each(function (i) {
            if (headertext[i]) {
              $(this).attr('data-th', headertext[i]).addClass('labeled');
            }
          });
        });
      }
    });

  });
})(jQuery);