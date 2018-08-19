$(document).ready(() => {
    const $button = $('.button');
    const $body = $('body');
    const $popUp = $('.popUp');
    const $close = $('.popUp__close');
    const $uninst =  $('.btn--uninst');
    const $path = $('.alert__p--1');
    const $path2 = $('.alert__p--2');
    const length = $path[0].getTotalLength();
    let open = false;
    $button.on('mousemove', (e) => {
        const $e = $(e.target);
        const el = e.target;
        const x = e.pageX -el.offsetLeft;
        const y = e.pageY -  el.offsetTop;
        $e.css('--x', `${ x }px`);
        $e.css('--y', `${ y }px`);
    });

    $button.on('click', () => {
        open = true;
        $body.addClass('body-blurred');
        let tl = new TimelineLite();
        tl
            .to($button, 0.5, { scaleX:0, scaleY:0, y:-500,  ease: Power1.easeInOut, onComplete: showPopUp, onCompleteParams: [$button, '+=1']})
            .set($path, { strokeDashoffset : `${length}`,  ease: Power1.easeInOut});
    });

    $(document).on("mouseup", (e)=>{
        if (open && !$popUp.is(e.target) && ($(e.target).closest('.popUp').length === 0)) {
            closePopUp();
            open = false;
        }
        else if ($(e.target).is('.btn--cancel') || $(e.target).is('.popUp__close img')){
            closePopUp();
            open = false;
        }
    });

    $uninst.on('click', ()=> {
        open = false;
        closePopUp(setTimeout( ()=> {
            alert('DONE')
        }, 500 ))
    });

    function closePopUp() {
        $body.removeClass('body-blurred');
        let tl = new TimelineLite();
        tl
            .set($path, { fill : '#fff'})
            .set($path, { strokeDashoffset : `${length}`})
            .set($path2, { autoAlpha: 0 })
            .to($popUp, 0.5, { scaleX:0, scaleY:0, y:-500,  ease: Power1.easeInOut, onComplete: () => {$popUp.addClass('hidden')}})
            .to($button, 0.5, { scaleX:1, scaleY:1, y:0,  ease: Power1.easeInOut});
    }

    function showPopUp(){
        $popUp.removeClass('hidden');
        drawSVG();
        let tl = new TimelineLite();
        tl
          .fromTo($popUp, 0.5, { scaleX:0, scaleY:0, y:-500,  ease: Power1.easeInOut},{scaleX:1, scaleY:1, y:0})
          .from('.popUp__alert', 1, {autoAlpha:0})
          .from('p', 0.5, {opacity:0, y:20})
          .staggerFrom($('.btn'), 0.5, {opacity:0, y:15}, 0.2)
          .from($close, 0.5, {autoAlpha:0, scaleX :0.5, scaleY:0.5, ease: Back.easeOut.config(1.7)})
    }

    function drawSVG(){
        let tl = new TimelineLite();
        tl
            .to($path2, 0.5, { autoAlpha: 1 })
            .to($path, 0.7, { strokeDashoffset : 0,  ease: Power1.easeInOut})
            .to($path, 0.4, { fill : '#FF3B30'}, '-=0.3');
    }

});