var path = window.location.origin+"/";
var app = angular.module('main',[])
	app.service('getData',function($http){
		this.get= function(route,callback){
			// console.log(path+route);
			$http.get(path+route).then(function(res){
				callback(res.data)
				// console.log(res);
				// this.data = res.data;
			},function(err){
				console.log(err)
			})
		}
	})

	app.controller('menuCtrl',function($scope,getData){
		getData.get("menu",function(results){
			console.log(results);
		});
	})
	// alert(path);