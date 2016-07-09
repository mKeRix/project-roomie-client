var express = require('express');
var router = express.Router();

/* GET lights settings page. */
router.get('/lights', function(req, res, next) {
    res.render('settings/lights', { title: 'Light Settings', description: 'configure your lighting system' });
});

module.exports = router;