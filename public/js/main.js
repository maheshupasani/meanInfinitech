var path = window.location.origin+"/";
var app = angular.module('main',['ngCookies']);

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

app.controller('menuCtrl',function($scope,$rootScope,getData,postData){
	getData.get("menu",function(result){
		$scope.cat = result;
	});
	$scope.filter_cat = function(cat_id){
		// alert(cat_id)
		postData.post('getProbyCat',{cat_id:cat_id},function(res){
			// $scope.products = res;
			$rootScope.$broadcast('pro',res)
		})
	}
	
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
app.controller('productCtrl',function($scope,$rootScope,getData,$cookies){
	getData.get("allProduct",function(result){
		$scope.products = result;
	})
	$rootScope.$on('pro',function(a,b){
		// console.log("data"+ b)
		console.log(b);
		$scope.products = b;
	})
	$scope.add_to_cart = function(event,id){
		var d = new Date()
			d.setFullYear(2019)
			console.log(d.getFullYear())
		if($cookies.get('pro_id')){
			var old_pro_id = $cookies.get('pro_id')
			var new_pro_id = old_pro_id+","+id
			$cookies.put('pro_id',new_pro_id,{expires:d})
		}else{
			$cookies.put('pro_id',id,{expires:d})
		}
	}
})
app.controller('cartCtrl', function ($scope,postData,$cookies) {
	var pro_id = $cookies.get('pro_id')
	postData.post("getCartProduct",{id:pro_id},function(result){
		console.log(result);
		$scope.products = result;
	})
	$scope.del_from_cart = function(e,pro_id){
		// $cookies.remove("pro_id");
		// e.target.parentNode.parentNode.style.display='none'
		id=$cookies.get('pro_id').split(',');
		pos = id.indexOf(pro_id.toString())
		id.splice(pos,1)
		var final_id = id.join(',')
		// console.log(final_id)
		var d = new Date()
			d.setFullYear(2019)

		$cookies.put('pro_id',final_id,{expires:d})
		e.target.parentNode.parentNode.style.display='none'

	}
});

app.controller('registerCtrl', function ($scope,postData) {
	$scope.register = function(){
		// console.log($scope.form);
		if(!$scope.form){
			$scope.err = 'Please enter all the records'
		}else{
			postData.post("registerAction",$scope.form,function(result){
				$scope.err = result;
			})
		}
	}
});

app.controller('loginCtrl',function($scope,postData,$window){
	$scope.signIn = function(){
		console.log($scope.loginForm)
		if(!$scope.loginForm){
			$scope.loginErr = 'please Enter correct credentials';
		}else{
			postData.post('loginAction',$scope.loginForm,function(result){

				// console.log(result);
				if(result == 'ok'){
					$window.location.href= path;
				}else{
					$scope.loginErr = result;
				}
			})
		}
	}
})