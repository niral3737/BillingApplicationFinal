var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// SignUp
router.post('/signup', function (req, res) {
  
});

module.exports = router;
