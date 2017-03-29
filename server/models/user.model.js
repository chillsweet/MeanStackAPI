var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	username: {
		type: String ,
		index: true,
		trim: true,
		required: "User name is required"
		},
	password: {
		type:String,
		required: true,
		validate: [function (password) {
			return password && password.length >= 6
		},'Password must be at least 6 charecter']
		
	},
	salt:{
		type: String
	},
	provider:{
		type: String,
		required: "Provider is required"
	},
	provierId:String,
	providerData:{},
	email:{ 
		type:String,
		match: /.+\@.+\.+/
	},
	created:{
		type: Date,
		default: Date.now
	}
});
UserSchema.pre('save',function(next){
	if(this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
		this.password = this.hashPassword(this.password);

	}
	next();
});
UserSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password, this.salt, 100, 64).toString('base64');
}
/*
 chek thrid party accunt by username in model

*/

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
	// set varibale _this by value unique  this pointer
	var _this = this; 
	var possibleUsername = username + (suffix || '');
	_this.findOne({username: possibleUsername},function(err,user){
			if(!err){
				if(!user) callback(possibleUsername);
				else return _this.findUniqueUsername(username,(suffix || 0)+ 1, callback); // set value by suffix push one 
			}else{
				callback(null);
			}
	});
}
UserSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
}
mongoose.model('User',UserSchema);

