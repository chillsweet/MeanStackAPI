
module.exports = function(app){
	var passport = require('passport');
	var user = require('../controllers/user.controller');

	app.route('/login')
		.get(user.renderLogin)
		.post(passport.authenticate('local',{
			successRedirect:'/',
			failureRedirect:'/login',
			failureFlash: true
		}));
	app.post('/logout',user.logout);
	app.route('/user')
		.post(user.create)
		.get(user.list);
	app.route('/user/:username')
		.get(user.read)
		.put(user.update)
		.delete(user.delete);
	app.param('username',user.userByUsername);
	app.get('/oauth/facebook',passport.authenticate('facebook',{
			failureRedirect:'/login'
		}));
	app.get('/oauth/google',passport.authenticate('google',{
			scope:['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'],
			failureRedirect:'/login'
		}));
	app.get('/oauth/facebook/callback',passport.authenticate('facebook',{
		failureRedirect:'/login',
		successRedirect:'/'
	}));
	app.get('/oauth/google/callback',passport.authenticate('google',{
		failureRedirect:'/login',
		successRedirect:'/'
	}));
	app.route('/signup')
		.get(user.renderSignup)
		.post(user.signup);
}