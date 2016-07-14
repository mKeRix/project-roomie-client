var models  = require('../models');
var hue = require("node-hue-api");

PhilipsHue = {
    findBridges: function (client) {
        hue.nupnpSearch().then(function (bridges) {
            client.emit('bridges found', bridges);
        });
    },

    registerUser: function (client, hostname, description) {
        var api = new hue.HueApi();
        api.registerUser(hostname, description)
            .then(function (result) {
                models.Setting.bulkCreate([
                    { key: 'hue-hostname', value: hostname },
                    { key: 'hue-username', value: result }
                ]).then(function () {
                    client.emit('bridge connection successful', hostname);
                })
            })
            .fail(function (error) {
                client.emit('bridge connection failed', error);
            });
    }
};

module.exports = PhilipsHue;