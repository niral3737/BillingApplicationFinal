var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName : String,
  lastName : String,
  dob : Date,
  firmAddress : [{
    shopNumber : String,
    street : String,
    pinCode : String,
    city : String,
    stateProvince : String,
    country : String
  }],
  email : {
    type : String,
    required : true,
    lowercase : true,
    unique : true
  },
  password : {
    type : String,
		required : true,
		bcrypt : true
  },
  products : [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  clients : [{ type : Schema.Types.ObjectId, ref: 'Client'}]
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
  bcrypt.hash(newUser.password, null, null, function (err, hash) {
		if(err) throw err;
		newUser.password = hash;
		newUser.save(callback);
	});
};

module.exports.getUserByEmail = function (email, callback) {
	var query = { email : email };
	User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if(err) return callback(err);

		callback(null, isMatch);
	});
};

module.exports.addProducts = function (newProductIds, userId, callback){
  User.findById(userId, function (err, user) {
    if(err){
      console.log('in err', err);
      callback(err);
    }else{
      console.log(user);
      user.products.push(...newProductIds);
      user.save(callback);
    }
  });
};

module.exports.getAllProducts = function (userId, callback) {
  User.findById(userId)
  .populate('products')
  .exec(function (err, user) {
    if(err){
      callback(err, null);
    }else{
      console.log(user);
      callback(null, user.products);
    }
  });
};

module.exports.findProductAndDelete = function (userId, productId, callback) {
  User.findById(userId, function (err, user) {
    if(err){
      console.log(err);
      callback(err, null);
    }else{
      console.log(user);
      let index = user.products.indexOf(productId);
      if(index > -1){
        user.products.splice(index, 1);
        user.save(function (err) {
          if(err){
            callback(err, null);
          }else{
            callback(null, {message : 'deleted'})
          }
        });
      }else{
        callback(new Error('product not found'), null);
      }
    }
  });
};
