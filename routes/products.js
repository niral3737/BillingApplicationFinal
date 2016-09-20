var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Product = require('../models/Product');
var User = require('../models/User');

router.post('/', function (req, res) {
  var products = req.body.products;
  var productEntities = [];
  for(var i=0; i<products.length; i++){
    productEntities.push(new Product({
      _creator : mongoose.Types.ObjectId(req.userId),
      name : products[i].name,
      price : products[i].price,
      quantity : products[i].quantity
    }));
  }
  Product.createProducts(productEntities, req.userId,  function (err, products) {
    if (err){
      console.log(err);
      res.json({success : false});
    }else{
      res.json({success : true});
    }
  });
});

router.put('/:id', function (req, res) {
  Product.findOneAndUpdate({_id : req.params.id}, req.body.updatedProduct, function (err, product) {
    if(err){
      console.log(err);
      res.json({success : false});
    }else{
      console.log(product);
      res.json({success : true, data : product});
    }
  });
});

router.delete('/:id', function (req, res) {
  Product.findOneAndRemove({_id : req.params.id}, function (err, product) {
    if(err){
      console.log(err);
      res.json({success : false});
    }else{
      console.log(product);
      User.findProductAndDelete(req.userId, req.params.id, function (err, productId) {
        if(err){
          res.json({success : false});
        }else{
          console.log(productId);
          res.json({success : true , data : product});
        }
      });
    }
  });
});

module.exports = router;
