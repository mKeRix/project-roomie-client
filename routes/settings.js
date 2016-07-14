var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET lights settings page. */
router.get('/lights', function(req, res, next) {
    models.Setting.findOne({
        where: {
            key: 'hue-hostname'
        }
    }).then(function (setting) {
        res.render('settings/lights', { 
            title: 'Light Settings', 
            description: 'configure your lighting system', 
            hostname: setting 
        });
    });
});

module.exports = router;