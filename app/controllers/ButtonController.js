nl.controller('ButtonController', function ($scope, $http) {

	var first = true;
	$scope.$watch('button', function() {
		if(first)
		{
			first = false;
		}
		else
		{
			$scope.updateButton();
		}
	}, true);

	$scope.deleteButton = function () {
		$http.post(apiURL('/buttons/'+$scope.button.id+'/delete'))
		.success(function(data){
			if (data.success)
			{
				delete $scope.buttons[$scope.button.id];
			}
		});
	};

	declareDelayedFunction($scope, 'updateButton', 1000, function () {
		$http.post(apiURL('/buttons/'+$scope.button.id), angular.toJson($scope.button));
	});
});