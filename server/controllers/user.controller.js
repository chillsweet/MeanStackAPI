/*
 aveOAuthUserProfile creat becase use with third party as facboook , google, tweeter other
*/
exports.saveOAuthUserProfile = function(req,profile, done){
	var User = require('mongoose').model('User');
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	},function(err,user){
		if(err) return done(err);
		else{
			if(!user){
				var prossibleUsername = profile.username || (profile.email ? profile.email.split('@')[0] : '');
				User.findUniqueUsername(prossibleUsername, null, function(availableUsername){
					profile.username = availableUsername;
					user = new User(profile);
					user.save(function (err) {
						if(err){
							var massage = getErrorMassage(err);
							req.flash('error',massage);
							return done(err);
						}
						else{
							return done(err,user);
						}

					});
				});
			}else{
				return done(err,user);
			}
		}
	});
}

exports.renderLogin = function(req, res, next){
	if(!req.user){
		return res.render('login',{
			title:'Log in',
			massages: req.flash('error') || req.flash('info')
		});
	}else{
		return res.redirect('/')
	}
}
exports.delete = function(req,res, next){
	
	req.user.remove(function(err){
		if(err)
			return next(err);
		else
			return res.json(req.user);
	});	
}
exports.update = function(req,res, next){
	var User = require('mongoose').model('User');
	User.findOneAndUpdate({
		username: req.user.username
	},req.body,function(err, users){
		if(err)
			return next(err);
		else
			return res.json(users);
	});
}
function getErrorMassage(err) {
	var massage ="";
	if(err.code){
		switch(err.code){
			case 11000:
			case 11001:
				massage = "Usernmae already exits";
			 	break;
			default:
				massage = "Somthing went wrong";
		}
	}else{
		for(var errName in err.errors){
			if(err.errors[errName].massage){
				massage = err.errors[errName].massage;
			}
		}
	}
return massage;
}
exports.signup = function(req, res, next){
	
	if(!req.user){
		var User = require('mongoose').model('User');
		var user = new User(req.body);
		user.provider = 'local';
		user.save(function (err) {
			if(err){
				var massage = getErrorMassage(err);
				req.flash('error',massage);
				console.log('error con signup by render index');
			return res.redirect('/signup');
			} 

			req.login(user,function (err) {
				if(err){
					console.log("errpr req.login");
					return next(err);
				} 
				console.log('success render by index');
				return res.redirect('/');
			})
		});
	}else{
		return res.redirect('/');
	}
}
exports.renderSignup = function(req, res){

	res.render('signup',{
		title:'Sign Up',
		massages:req.flash('error')
	});
}
exports.read = function(req,res){
	res.json(req.user);
}
exports.userByUsername = function(req,res,next,username){
	var User = require('mongoose').model('User');
	User.findOne({
		username: username
	},function(err,user){
		if(err){
			return next(err);
		}
		else{
			req.user = user;
			next();
		}
	});
}
exports.create = function (req,res,next) {
	var User = require('mongoose').model('User');
	var user = new User(req.body);
	
	user.save(function (err) {
		if(err){
			return next(err);
		}
		else
			return res.json(user);
	}); 
}
exports.list = function(req,res,next){
	var User = require('mongoose').model('User');
	User.find({},'firstName username password created',function (err,users) {
		if(err){
			return next(err);
		}
		else
			return res.json(users);
	});
}
exports.logout = function(req,res){
	 req.logout();
	 res.redirect('/');
}