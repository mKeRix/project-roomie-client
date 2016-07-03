var models  = require('../models/index');

function onRoomUpdate(socket) {
    /* hook for room creation */
    models.Room.afterCreate(function (room, options) {
        socket.emit('system update', {
            entity: 'room',
            operation: 'create',
            object: room.toJSON()
        });
    });
    
    /* hook for room update */
    models.Room.afterUpdate(function (room, options) {
        socket.emit('system update', {
            entity: 'room',
            operation: 'update',
            object: room.toJSON()
        });
    });
}

module.exports = onRoomUpdate;
