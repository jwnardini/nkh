var Cookies = require('js-cookie');

// JS cookies https://github.com/js-cookie/js-cookie
(function ($) {
// DOC READY


    var $ctaCloseButton = $("button.toggle-close.icon-close");
    var $alertRegion = $(".entity-cta-text.view-cta-references");

    var $timer = 1;
    //uncomment the line below for testing. It will set the timer to one minute only.
    //var $timer = new Date(new Date().getTime() + 1 * 60 * 1000);

    //On click to toggle settings
    $ctaCloseButton.click(function() {

        Cookies.set('is-hidden', 'hidden', { expires: $timer, path: '/' });
        
        $alertRegion.slideToggle('slow')
        //slowly close it then hide it with css
        setTimeout(function(){
            $alertRegion.addClass('hide');
        },5000);
        return false;
    });
    
    var $isHidden = Cookies.get('is-hidden');
    if($isHidden === null || $isHidden === '' || $isHidden === 'null' || $isHidden === undefined || $isHidden === 'undefined'){
        $alertRegion.removeClass('hide');
        Cookies.set('is-hidden', 'null');
    }else{
       $alertRegion.addClass('hide');
    }


})(jQuery);
