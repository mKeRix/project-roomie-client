var models  = require('../models');
var hue = require("node-hue-api");

function PhilipsHue(client) {
    this.client = client;
}

PhilipsHue.api = {

    findBridges: function () {
        hue.nupnpSearch().then(function (bridges) {
            this.client.emit('bridges found', bridges);
        });
    },

    registerUser: function (hostname, description) {
        var api = new hue.HueApi();
        api.registerUser(hostname, description)
            .then(function (result) {
                models.Setting.bulkCreate([
                    { key: 'hue-hostname', value: hostname },
                    { key: 'hue-username', value: result }
                ]).then(function () {
                    this.client.emit('bridge connection successful', hostname);
                })
            })
            .fail(function (error) {
                this.client.emit('bridge connection failed', error);
            });
    }
};

module.exports = PhilipsHue;