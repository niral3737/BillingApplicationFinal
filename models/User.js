var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

});

var User = module.exports = mongoose.model('User', UserSchema);
