var mongoose = require('mongoose');
var User = require('./User');

var Schema = mongoose.Schema;

var productSchema = Schema({
  _creator : { type: Schema.Types.ObjectId, ref: 'User' },
  name : String,
  price : Number,
  quantity : Number
});

var Product = module.exports = mongoose.model('Product', productSchema);

module.exports.createProducts = function (newProducts, userId, callback) {
  var productIds = [];
  for(var i = 0 ; i < newProducts.length ; i++) {
    productIds.push(newProducts[i]._id);
  }
  Product.insertMany(newProducts, function (err) {
    if(err){
      callback(err, null);
    }
  });
  console.log(productIds);
  User.addProducts(productIds, userId, function (err) {
    if(err){
      callback(err, null);
    }else{
      callback(null, null);
    }
  });
};
