var PhilipsHue = require('../helpers/philipshue');

var handlers = function (client) {

    /* search for bridges on network */
    client.on('search bridges', function (data) {
        hue.api.findBridges();
    });

    /* register with the bridge */
    client.on('connect to bridge', function (data) {
        hue.api.registerUser(data, "Project Roomie server")
    })
};

module.exports = handlers;