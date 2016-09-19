var express = require('express');
var User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/', function (req, res, next) {
//
// });

// SignUp
router.post('/signup', function (req, res) {
  var newUser = new User({
    firstName: req.body.user.firstName,
    lastName : req.body.user.lastName,
    dob : req.body.user.dob,
    firmAddress : {
      shopNumber : req.body.user.shopNumber,
      street : req.body.user.street,
      pinCode : req.body.user.pinCode,
      city : req.body.user.city,
      stateProvince : req.body.user.stateProvince,
      country : req.body.user.country
    },
    email : req.body.user.email,
    password : req.body.user.password,
  });
  console.log(newUser);
  User.createUser(newUser, function (err, user) {
    if(err){
      console.log(err);
      res.json({message : 'failure'});
    }else{
      console.log(user);
      res.json({message : 'success'});
    }
  });
});

router.post('/signin', function (req, res) {
  console.log(req.body.email);
  console.log(req.body.password);
  res.json({token : '123'});
});

module.exports = router;
