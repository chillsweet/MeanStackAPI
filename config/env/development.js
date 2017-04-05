module.exports = {
	debug: true,
	mongoUri : 'mongodb://localhost/tweet',
	sessionSecret: 'dev_secret_key',
	facebook:{
		clientID: '#',
		clientSecret: '#',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	google:{
		clientID: '#',
		clientSecret: '#',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};
