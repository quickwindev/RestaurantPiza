jQuery(document).ready(function ($) {
    var $chooser = jQuery("#stylechooser");
    var $container = jQuery("#slideContainer");
    var $body = jQuery('body');

    var isLoaded = false;


    if (getCookie('ct_dish.switcher') == 'hide') {
        hideStyleswitcher();
    }

    /** style chooser show/hide **/
    jQuery("#stylechooser  #styleToggle, #stylechooser #vertical-title").click(function () {
        setCookie('ct_dish.switcher', $chooser.css('left') == '0px' || $chooser.css('left') == '-1px' ? 'hide' : 'show');

        hideStyleswitcher();
        return false;

    });

    jQuery('#demoReset').click(function () {
        setCookie('ct_dish', false);
        location.reload(true);
        return false;
    });

    /**
     * Store data
     */

    function store() {
        var r = '';
        jQuery('a[data-value].btn-primary, a[data-value].demoActive', $chooser).each(function () {
            var a = jQuery(this);
            r = r + a.attr('data-value') + '.';
        });
        setCookie('ct_dish', r);
    }

    function load() {
        d = getCookie('ct_dish');
        if (d) {
            var data = jQuery(d.split('.'));
            jQuery.each(data, function (e, val) {
                jQuery('a[data-value="' + val + '"]', $chooser).click();
            });
        }
        isLoaded = true;
    }


    function hideStyleswitcher() {
        var $switcher = jQuery("#stylechooser");

        //padding 4?
	    var left = -$switcher.outerWidth();

        var isVisible = false;
        if (parseInt($switcher.css("left")) == left) {
            left = 0;
            isVisible = true;
        }

        if (!isLoaded) {
            $switcher.css('left', left);
        } else {
            if(isVisible){
                $switcher.removeClass('hiddenSwitcher');
            }
            $switcher.animate({
                left: left
            },null,null,function(){

                if(!isVisible){
                    $switcher.addClass('hiddenSwitcher');
                }
            });
        }

    }


    load();

});


/**
 * Cookie handler - setter
 */
var setCookie = function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};


/**
 * Cookie handler -getter
 */
var getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};
