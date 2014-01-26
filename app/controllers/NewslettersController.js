nl.controller('NewslettersController', function ($scope, $http) {
	$http.get(apiURL('/newsletters')).success(function (data) {
		if (data.success)
		{
			$scope.newsletters = data.data;
		}
	});

});