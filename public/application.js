'use strict';

var mainAppModule = angular.module('Hello',[]);

mainAppModule.filter('sayHello',function(){
	return function(name){
		return 'Hello'+ name;
	}
});