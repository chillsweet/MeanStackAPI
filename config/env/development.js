module.exports = {
	debug: true,
	mongoUri : 'mongodb://localhost/tweet',
	sessionSecret: 'dev_secret_key',
	facebook:{
		clientID: '1065348796855482',
		clientSecret: '25449343e94b9597a020a81981df1b48',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	google:{
		clientID: '375902756284-6ejh17375qjj8kf5aimlnns9amt90cod.apps.googleusercontent.com',
		clientSecret: 'D58JOx25nbJbzWgOWHda89ly',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};