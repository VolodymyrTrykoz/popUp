'use strict';

$(document).ready(function () {
    var $button = $('.button');
    var $body = $('body');
    var $popUp = $('.popUp');
    var $close = $('.popUp__close');
    var $uninst = $('.btn--uninst');
    var $path = $('.alert__p--1');
    var $path2 = $('.alert__p--2');
    var length = $path[0].getTotalLength();
    var open = false;

    // dynamically set css properties of gradient position with help of css variables depending on mouse movement
    $button.on('mousemove', function (e) {
        var $e = $(e.target);
        var el = e.target;
        var x = e.pageX - el.offsetLeft;
        var y = e.pageY - el.offsetTop;
        $e.css('--x', x + 'px');
        $e.css('--y', y + 'px');
    });

    $button.on('click', function () {
        open = true;
        $body.addClass('body-blurred');
        var tl = new TimelineLite();
        tl.to($button, 0.5, { scaleX: 0, scaleY: 0, ease: Power1.easeInOut, onComplete: showPopUp, onCompleteParams: [$button, '+=1'] }).set($path, { strokeDashoffset: '' + length, ease: Power1.easeInOut });
    });

    $(document).on("mouseup", function (e) {
        //checking here whether event occurred when popUp is visible (open flag)
        //but clicked target is outside popUp div
        //or event was triggered with wto next elements
        if (open && !$popUp.is(e.target) || $(e.target).is('.btn--cancel, .popUp__close img')) {
            closePopUp();
        }
    });

    $uninst.on('click', function () {
        closePopUp(setTimeout(function () {
            alert('DONE');
        }, 500));
    });

    function closePopUp() {
        $body.removeClass('body-blurred');
        open = false;
        var tl = new TimelineLite();
        // setting initial properties to element for further animation
        tl.set($path, { fill: '#fff' }).set($path, { strokeDashoffset: '' + length }).set($path2, { autoAlpha: 0 }).to($popUp, 0.5, { scaleX: 0, scaleY: 0, ease: Power1.easeInOut, onComplete: function onComplete() {
                $popUp.addClass('hidden');
            } }).to($button, 0.5, { scaleX: 1, scaleY: 1, y: 0, ease: Power1.easeInOut });
    }

    function showPopUp() {
        $popUp.removeClass('hidden');
        drawSVG();
        var tl = new TimelineLite();
        tl.fromTo($popUp, 0.5, { scaleX: 0, scaleY: 0, ease: Power1.easeInOut }, { scaleX: 1, scaleY: 1 }).from('.popUp__alert', 1, { autoAlpha: 0 }).from('p', 0.5, { opacity: 0, y: 20 }).staggerFrom($('.btn'), 0.5, { opacity: 0, y: 15 }, 0.2).from($close, 0.5, { autoAlpha: 0, scaleX: 0.5, scaleY: 0.5, ease: Back.easeOut.config(1.7) });
    }

    function drawSVG() {
        var tl = new TimelineLite();
        //animate stroke-dashoffset svg attribute to create drawing effect
        tl.to($path2, 0.5, { autoAlpha: 1 }).to($path, 0.7, { strokeDashoffset: 0, ease: Power1.easeInOut }).to($path, 0.4, { fill: '#FF3B30' }, '-=0.3');
    }
});