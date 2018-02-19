var express = require('express');
var router = express.Router();

console.log('from auth user');

module.exports = passport => {
  var fn = pss => {
    router.get('/', pss.authenticate('google'), {
      scope: ['profile', 'email']
    });
  };
  fn(passport);
  return router;
};
