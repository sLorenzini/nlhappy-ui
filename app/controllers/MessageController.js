nl.controller('MessageController', function($scope, $http){

	$scope.message.translations = {};

	$scope.toggleMe = function()
	{
		if($scope.shared.focused_message_id !== $scope.message.id)
		{
			$http.get(apiURL('/messages/'+$scope.message.id+'/translations')).success(function(data){
				for (var i in data.data)
				{
					var translation = data.data[i].translation;
					var code = data.data[i].language.code;
					$scope.message.translations[code] = translation;
				}
				$scope.shared.focused_message_id = $scope.message.id;
			});
		}
		else
		{
			$scope.shared.focused_message_id = null;
		}
	}
});