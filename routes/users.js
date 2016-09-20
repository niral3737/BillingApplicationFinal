var express = require('express');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var envFile = require('node-env-file');

try {
  envFile(path.join(__dirname, 'config/development.env' ))
} catch(e){

}
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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
    products : req.body.user.products,
    clients : req.body.user.clients
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
  User.findOne({email : req.body.email}, function (err, user) {
    if (err) {
      res.json({message : 'some error while searching'});
    }else if(!user){
      res.json({message : 'no user found'});
    }else if(user){
      User.comparePassword(req.body.password, user.password, function (err, isMatch) {
        if(err){
          res.json({message : 'some error occered'});
        }else if(isMatch){
          var token = jwt.sign({id : user.id} , process.env.SECRET, {
            expiresIn : '60m'
          });
          res.json({
            message : 'success',
            token : token,
            user : {
              firstName : user.firstName,
              lastName : user.lastName,
              email : user.email,
              firmAddress : user.firmAddress
            }
          })
        }else{
          res.json({message : 'passwords doesn\'t match'});
        }
      });
    }
  });
});

router.get('/products', function (req, res) {
  User.getAllProducts(req.userId, function (err, products) {
    if(err){
      console.log(err);
      res.json({success : false});
    }else{
      console.log(products);
      res.json({success : true, data : products});
    }
  });
});

module.exports = router;
