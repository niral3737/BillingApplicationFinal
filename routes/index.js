var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send('Express app is live and good');
});

router.get('/isvalidtoken', function (req, res, next) {
  res.json({message : 'success'});
});

module.exports = router;
