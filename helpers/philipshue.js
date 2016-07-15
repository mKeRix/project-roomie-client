var models  = require('../models');
var hue = require("node-hue-api");

function PhilipsHue(client) {
    if (typeof optionalArg === 'undefined') {
        this.sendNotifications = false;
    }
    else {
        this.sendNotifications = true;
        this.client = client;
    }
}

PhilipsHue.api = {
    getAuthenticatedClient: function (callback) {
        models.Setting.findOne({
            where: {
                key: {
                    in: ['hue-hostname', 'hue-username']
                }
            },
            order: 'hue-hostname'
        }).then(function (settings) {
            var hueClient = new hue.HueApi(settings[0].value, settings[1].value);
            callback(hueClient);
        })
    },

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

PhilipsHue.light = {
    cacheLights: function () {
        this.api.getAuthenticatedClient(function (hueClient) {
            hueClient.lights().then(function (lights) {
                console.log(lights);
            })
        })
    }
};

module.exports = PhilipsHue;