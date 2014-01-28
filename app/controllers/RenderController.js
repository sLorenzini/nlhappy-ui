nl.controller('RenderController', function($scope, $http, $routeParams){
	$http.get(apiURL('/newsletters/'+$routeParams.newsletter_id+'/'+$routeParams.language_code))
	.success(function (data){
		if(data.success)
		{
			$scope.nl = data.data;
		}

	});
});