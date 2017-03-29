var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var jade = require('jade');
var config = require('./config');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
var cookieSession = require('cookie-session');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
//var RedisStore =  require('connect-redis')(session);


module.exports = function () {

	var app = express();

	
	app.use(cookieSession({
		name:'session',
		keys:['key_1','key_2']
	}));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	 if(process.env.NODE_ENV === 'development'){
	 	app.use(morgan('dev'));
	 }
	 else{
	 	app.use(compression);
	 }
	 app.use(bodyParser.urlencoded({
	 	extrended:  true
	 }));

	 app.use(bodyParser.json());

	 app.set('views','./server/views');
	 app.set('view engine','jade');
	require('../server/routes/index.route')(app);
	require('../server/routes/user.route')(app);
	app.use(sass({
		src: './sass',
		dest: './public/css',
		debug: true,
		outputStyle: 'compressed',
		prefix: '/css'
	}));
	app.use(express.static('./public'));

	return app;
}
