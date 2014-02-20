nl.controller('MessagesController', function($scope, $http){
	$scope.new_message = '';

	$http.get(apiURL('/messages')).success(function(data){
		$scope.messages = data.data;
	});

	$http.get(apiURL('/languages')).success(function(data){
		$scope.languages = data.data;
	});

	$scope.shared = {
		focused_message_id: null
	};

	$scope.addMessage = function()
	{
		$http.post(apiURL('/messages'), {mkey: $scope.new_message})
		.success(function(data){
			$scope.messages.push(data.data);
		});
	};

	function saveTranslation(message_id, language_code, translation)
	{
		console.log(arguments);

		$http.post(apiURL('/messages/'+message_id+'/'+language_code), {
			translation: translation
		})
		.success(function(data){

		});

		$scope.status.message = '';
		$scope.$apply();
	}

	var toSave = {};

	$scope.saveTranslation = function(message_id, language_code, translation)
	{
		$scope.status.message = 'Saving translation...';

		var key = message_id+":"+language_code;
		var cb = toSave[key];

		if (cb)
		{
			window.clearTimeout(cb);
		}

		toSave[key] = window.setTimeout(saveTranslation.bind(null, message_id, language_code, translation), 1000);
	};

	$scope.deleteMessage = function(message_id)
	{
		for(var i in $scope.messages)
		{
			if($scope.messages[i].id === message_id)
			{
				(function (i) {
					$http.post(apiURL('/messages/'+message_id+'/delete'))
					.success(function(data){
						if (data.success)
						{
							$scope.messages.splice(i, 1);
						}
					});
				})(i);
				break;
			}
		}
	}
});