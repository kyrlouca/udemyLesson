//after it came back from Google
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('authGoogleCallback', { name: 'From  z Callback' });
});

module.exports = router;
