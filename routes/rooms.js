var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET room listing */
router.get('/', function (req, res, next) {
    models.Room.findAll().then(function (rooms) {
        res.render('rooms/index', { title: 'Rooms', description: 'list of all rooms', rooms: rooms });
    })
});

/* GET room creation form */
router.get('/create', function (req, res, next) {
    res.render('rooms/create', { title: 'Room Creation', description: 'add a room to your system' });
});

/* POST room creation */
router.post('/create', function (req, res, next) {
    models.Room.create({
        name: req.body.name,
        channel: req.body.channel
    }).then(function () {
        res.redirect('/rooms');
    })
});

module.exports = router;
