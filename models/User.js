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
  }

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
