var config = require('./config.js');
var mongoose = require('mongoose');

module.exports = function(){
	mongoose.set('debug',config.debug);

	var db = mongoose.connect(config.mongoUri);
	require('../server/models/user.model.js');
	require('../server/models/post.model.js');

	return db;	
}