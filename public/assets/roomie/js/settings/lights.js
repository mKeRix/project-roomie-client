var socket = io('/web');

$('.panel-action a[data-toggle="bridge-refresh"]').on('click',function(){
    var reloadIcon = $(this),
        par = reloadIcon.parents('.panel:first'),
        list = $('#list-bridges');

    reloadIcon.addClass("fa-spin");
    par.find('.panel-body').append('<div class="refresh-container"><div class="loading-bar indeterminate"></div></div>');
    list.empty();

    // tell the server to search for bridges
    socket.emit('search bridges');
});

// we found some, yay!
socket.on('bridges found', function(msg){
    var reloadIcon = $('.panel-action a[data-toggle="refresh"]'),
        refreshContainer = $('.refresh-container'),
        list = $('#list-bridges');

    refreshContainer.fadeOut(500, function () {
        refreshContainer.remove();
    });
    reloadIcon.removeClass('fa-spin');

    msg.forEach(function (bridge) {
        list.append(
            $('<li>').attr('class', 'has-action-right').append(
                $('<a>').attr('href', '#').attr('class', 'visible').append(
                    $('<div>').attr('class', 'list-content').append(
                        $('<span>').attr('class', 'title').append(bridge.ipaddress),
                        $('<span>').attr('class', 'caption').append('ID: ' + bridge.id)
                    ),
                    $('<div>').attr('class', 'list-action-right').append(
                        $('<i>').attr('class', 'ion-android-arrow-forward center')
                    )
                )
            )
        )
    });
});
