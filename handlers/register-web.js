var hue = require('../helpers/philipshue');

module.exports = function (client) {
    /* search for bridges on network */
    client.on('search bridges', function (data) {
        hue.findBridges(client);
    })
};