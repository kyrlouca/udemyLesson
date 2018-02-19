var express = require('express');
var router = express.Router();
var keys= require('../config/keys.js');

router.get('/',(req,res)=>{
  console.log(keys.googleSecret);
  res.render('myIndex',{name:keys.googleId});
});
module.exports= router;