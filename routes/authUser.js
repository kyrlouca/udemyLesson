var express = require('express');
var router = express.Router();
module.exports = passport => {
  router.get(
    '/auth/user',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
};
