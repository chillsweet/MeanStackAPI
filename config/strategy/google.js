var passport = require('passport');
var GoogelStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var user = require('../../server/controllers/user.controller');

module.exports = function(){
	passport.use(new GoogelStrategy({
		clientID: config.google.clientID,
		clientSecret: config.google.clientSecret,
		callbackURL: config.google.callbackURL,
		passReqToCallback: true
	},function(req, accessToken, refreshToken, profile, done){
		var providerData = profile._json;
		providerData.accessToken = accessToken;
		providerData.refreshToken = refreshToken;

		var provierUserProfile = {
			firstname: profile.name.givenName,
			lastname: profile.name.familyName,
			email: profile.emails[0].value,
			username: profile.username,
			provider:'google',
			providerId: profile.id,
			providerData: providerData
		};
		user.saveOAuthUserProfile(req,provierUserProfile, done);
	}));
}