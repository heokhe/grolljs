/*
    Groll.js - v1.0-alpha
    Copyright 2017 Hosein Khansari
    Licensed under MIT license
    github: https://github.com/hkh12/grolljs
*/
(function() {
    'use strict';
    if ('undefined' === typeof jQuery) {
        $error('jQuery is not defined! :|')
    };
    if ( 'undefined' === typeof _ ) {
        $error('lodash is required for groll.')
    }
    var _version = '1.0-alpha',
    errorstart = 'Groll(' + _version + '): ';
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
    $.fn.grollTranslate3d = function (depth) {
        var el = $(this),
        d = arguments.length === 0 ? 3 : depth;
        $(window).scroll(function () {
            var s = $(this).getGrolled();
            el.css({
                'transform': 'translate3d(0, ' + s/d + 'px, 0)'
            })
        })
    };
    $.fn.grollLiveEffect = function (func, time) {
        var el = $(this);
        if (arguments.length < 1){
            $error('grollLiveEffect needs 1 arguments. (function)')
        }
        var wait = time || 100;
        // $(window).scroll(function () {
        //     var t = $(this);
        //     var e = t.getGrolled();
        //     func(e)
        // })
        $(window).on('scroll', _.throttle( func( $(window).getGrolled() ), wait ))
    };
    $.fn.grollToTop = function (sp) {
        var el = $(this),
        speed = sp || 0;
        el.animate({
            scrollTop: 0
        }, speed)
    };
    $.fn.grollToPositionOf = function (target, sp, m) {
        var el = $(this),
        speed = sp || 0,
        margin = m || 10,
        tarElem = $(target),
        offset = tarElem.offset().top;
        el.animate({
            scrollTop: offset
        }, speed)
    };
    $.fn.grollTo = function (tar, sp) {
        var el = $(this),
        speed = sp || 0;
        el.animate({
            scrollTop: tar
        }, speed)
    }
}());
