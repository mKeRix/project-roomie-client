var hue = require("node-hue-api");

PhilipsHue = {
    findBridges: function (client) {
        hue.nupnpSearch().then(function (bridges) {
            client.emit('bridges found', bridges);
        });
    }
};

module.exports = PhilipsHue;