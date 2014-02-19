nl.controller('NewslettersController', function ($scope, $http, $location, $controller) {

	// Inherit MainController
	$controller('MainController', {$scope: $scope});

	$http.get(apiURL('/newsletters')).success(function (data) {
		if (data.success)
		{
			$scope.newsletters = data.data;
		}
	});

	$scope.createNewsletter = function () {
		$http.post(apiURL('/newsletters')).success(function (data) {
			$location.path('/newsletters/'+data.data.id);	
		});
	};
});