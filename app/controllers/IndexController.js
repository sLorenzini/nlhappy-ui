nl.controller('IndexController', function ($scope, $http, $location) {
	$scope.createNewsletter = function () {
		$http.post(apiURL('/newsletters')).success(function (data) {
			$location.path('/newsletters/'+data.data.id);	
		});
	};
});