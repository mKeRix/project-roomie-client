$(function() {
    // bind idle timer to document
    $.idleTimer(300000);

    // screensaver popup
    $('#overlay-screensaver').popup({
        color: 'black',
        opacity: 1,
        transition: '0.3s',
        scrolllock: true
    });

    // flipclock
    $('.flip-clock').FlipClock({
        clockFace: 'TwentyFourHourClock'
    });

    // 
    $(document).on('idle.idleTimer', function (event, elem, obj) {
        $('#overlay-screensaver').popup('show')
    });
    
    $(document).on('active.idleTimer', function (event, elem, obj, triggerevent) {
        $('#overlay-screensaver').popup('hide')
    });
});