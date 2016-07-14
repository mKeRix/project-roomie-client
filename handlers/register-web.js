var hue = require('../helpers/philipshue');

var handlers = function (client) {
    /* search for bridges on network */
    client.on('search bridges', function (data) {
        hue.findBridges(client);
    });

    /* register with the bridge */
    client.on('connect to bridge', function (data) {
        hue.registerUser(client, data, "Project Roomie server")
    })
};

module.exports = handlers;