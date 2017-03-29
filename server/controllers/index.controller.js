exports.render = function(req,res){
	
	req.logout();
	
	res.render('index',{
		title:"Hello word  ",
		username: req.user ? req.user.password: ''

	});
}
