/*
    Groll.js - v1.0-alpha
    Copyright 2017 Hosein Khansari
    Licensed under MIT license
    github: https://github.com/hkh12/grolljs
*/
(function() {
    'use strict';
    if ('undefined' === typeof jQuery) {
        $error('jQuery is required for groll')
    };
    if ( 'undefined' === typeof _ ) {
        $error('lodash is required for groll.')
    }
    var _version = '1.0-alpha',
    errorstart = 'Groll (' + _version + '): ';
    function $error(str) {
        console.error(errorstart + str);
    };
    $.fn.getGrolled = function () {
        var el = $(this);
        return el.scrollTop()
    };
    $.fn.grollEvent = function(p) {
        var el = $(this);
        if (arguments.length < 1) {
            $error('grollEvent method needs at least 1 argument.')
        } else if ( p && typeof p === 'object' && arguments.length === 1 ){
            if ( !('offset' in p) || !(typeof p.offset === 'number') ) {
                $error('offset is required for grollEvent method (number)')
            } else {
                $(window).scroll(function () {
                    if ($(this).getGrolled() >= p.offset ){
                        el.removeClass( p.removeClass );
                        el.addClass( p.addClass );
                        if ( p.func && typeof p.func === 'function' ) {
                            p.func()
                        }
                    } else {
                        el.addClass( p.removeClass );
                        el.removeClass( p.addClass );
                    }
                })
            }
        }
    };
    $.fn.grollTranslate3d = function (depth, time) {
        var el = $(this),
        wait = time || 100,
        s = $(window).getGrolled(),
        d = arguments.length === 0 ? 3 : depth;
        $(el).grollLiveEffect(function (e) {
            $(el).css('transform', 'translate3d(0, ' + s/d + 'px,0)')
        }, wait)
    };
    $.fn.grollLiveEffect = function (func, time) {
        var el = $(this);
        if (arguments.length < 1){
            $error('grollLiveEffect needs 1 arguments. (function)')
        }
        var wait = time || 100,
        to_do = function () {
            func( $(window).scrollTop() )
        };
        jQuery(window).on('scroll', _.throttle( to_do , wait));
    };
    $.fn.grollToTop = function (sp) {
        var el = $(this),
        speed = sp || 0;
        el.grollTo(0, speed)
    };
    $.fn.grollToBottom = function (sp) {
        var el = $(this),
        speed = sp || 0;
        el.grollTo( el.height() , speed)
    };
    $.fn.grollToPositionOf = function (target, sp, m) {
        var el = $(this),
        speed = sp || 0,
        margin = m || 10,
        tarElem = $(target),
        offset = tarElem.offset().top;
        el.grollTo( offset - margin, speed )
    };
    $.fn.grollTo = function (tar, sp) {
        var el = $(this),
        speed = sp || 0;
        el.animate({
            scrollTop: tar
        }, speed)
    };
}());
