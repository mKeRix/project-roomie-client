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
                $('<a>').attr('href', '#')
                    .attr('data-toggle', 'modal')
                    .attr('data-target', '#push-link-modal')
                    .attr('data-hostname', bridge.ipaddress)
                    .attr('class', 'visible').append(
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

// carry ip to our modal
$('#push-link-modal').on('show.bs.modal', function (event) {
    // link that trigger the modal
    var link = $(event.relatedTarget);
    // get the associated IP
    var hostname = link.data('hostname');
    // grab the connect button and save the ip an anotehr attribute
    var modal = $(this);
    modal.find('#push-link-connect').attr('data-hostname', hostname);
});

// if connect button is clicked send request to server
$('#push-link-connect').click(function () {
    // grab the data from the button
    var button = $(this),
        par = button.parents('.modal-dialog:first');

    socket.emit('connect to bridge', button.data('hostname'));

    // visual cues
    button.attr('disabled', true);
});

// bridge connection worked
socket.on('bridge connection successful', function (msg) {
    toastr.success('Successfully connected to ' + msg);
    setTimeout(function () {
        location.reload(true);
    }, 1000);
});

// bridge connection failed
socket.on('bridge connection failed', function (msg) {
    toastr.error('Error when connecting to the bridge: ' + msg);
    $('#push-link-connect').removeAttr('disabled');
});
