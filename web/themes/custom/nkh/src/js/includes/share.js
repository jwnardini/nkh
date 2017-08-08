(function ($) {
    Drupal.behaviors.share = {
        attach: function (context, settings) {

            var socialShare = $(".share-buttons > a.social-share");
            var numberOfServices = socialShare.length;
            var resizeTimer;

            function socialWidth() {
                if ($(window).width() < 910) {
                    socialShare.css("width", "calc(100%/" + numberOfServices + ")");
                } else {
                    socialShare.css("width", "inherit");
                }
            };

            $(window).resize(function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(socialWidth, 100);
            });

            socialWidth();
            setShareLinks();

            function socialWindow(url) {
                window.open(url, "NewWindow");
            }

            function setShareLinks() {
                var pageUrl = encodeURIComponent(document.URL);
                var metaName = encodeURIComponent($("meta[property='og:site_name']").attr("content"));
                var metaImg = encodeURIComponent($("meta[property='og:image']").attr("content"));

                $(".social-share.linkedin").on("click", function () {
                    url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
                    socialWindow(url);
                });

                $(".social-share.linkedin").on("keyup", function () {
                    if (event.keyCode == 13) {
                        $(this).click();
                    }
                });

                $(".social-share.pinterest").on("click", function () {
                    url = "http://pinterest.com/pin/create/link/?url=" + pageUrl + "&media=" + metaImg + "&description=" + metaName;
                    socialWindow(url);
                });

                $(".social-share.pinterest").on("keyup", function () {
                    if (event.keyCode == 13) {
                        $(this).click();
                    }
                });

                $(".social-share.google").on("click", function () {
                    url = "https://plus.google.com/share?url=" + pageUrl;
                    socialWindow(url);
                });

                $(".social-share.google").on("keyup", function () {
                    if (event.keyCode == 13) {
                        $(this).click();
                    }
                });

                $(".social-share.facebook").on("click", function () {
                    url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
                    socialWindow(url);
                });

                $(".social-share.facebook").on("keyup", function () {
                    if (event.keyCode == 13) {
                        $(this).click();
                    }
                });

                $(".social-share.twitter").on("click", function () {
                    url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + metaName;
                    socialWindow(url);
                });

                $(".social-share.twitter").on("keyup", function () {
                    if (event.keyCode == 13) {
                        $(this).click();
                    }
                });

                $(".social-share.email").on("click", function () {
                    window.location = "mailto:?subject=" + metaName + "&body=" + pageUrl;
                });

                $(".social-share.email").on("keyup", function () {
                    if (event.keyCode == 13) {
                        $(this).click();
                    }
                });
            }
        }
    };
})(jQuery);
