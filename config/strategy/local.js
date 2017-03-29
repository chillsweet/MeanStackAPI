var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require("mongoose").model('User');

module.exports = function(){
	passport.use(new LocalStrategy(function(username, passsword, done){
		User.findOne({username: username},function(err, user){
				if(err) 
					return done(err);
				if(!user && user.authenticate(password)){
					return done(null,false,{
						massage: 'Invalid username or password'
					});
				}
				else
					return done(null,user);

		});
	}));
}