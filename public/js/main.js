var path = window.location.origin+"/";
var app = angular.module('main',[]);

app.service('getData',function($http){
	this.get = function(route,callback){

		$http.get(path+route).then(function(res){
			callback(res.data);
		},function(err){
			console.log(err);
		})
	}
})

app.service('postData',function($http){
	this.post = function(route,userData,callback){

		$http.post(path+route,userData).then(function(res){
			callback(res.data);
		},function(err){
			console.log(err);
		})
	}
})

app.controller('menuCtrl',function($scope,getData){
	getData.get("menu",function(result){
		$scope.cat = result;
	})
})

app.controller('catCtrl',function($scope,postData){
	$scope.add = function(){
		if ($scope.cat_name) {
			postData.post("category/add",{cat_name:$scope.cat_name},function(result){
		if (result == "ok") {
			$scope.err = "Record Added";
		}
	})
		}else{
			$scope.err = "Please Enter Record";
		}
	}
})
app.controller('productCtrl',function($scope,getData){
	getData.get("allProduct",function(result){
		$scope.products = result;
	})
})



