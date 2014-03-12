nl.controller('MainController', function ($scope, $http, $location, $route) {
	$scope.status = {
		message: '',
		klass: ''
	};

	$scope.shared = {
		focused_article_id: null,
		default_article_type: 'default'
	};

	var feedback_messages = {};
	$scope.feedback_messages = [];

	$scope.toggleFocusedArticle = function (id)
	{
		if($scope.shared.focused_article_id == id)
		{
			$scope.shared.focused_article_id = null;
		}
		else
		{
			$scope.shared.focused_article_id = id;
		}
	};

	$scope.deleteNewsletterById = function(id)
	{
		$http.post(apiURL('/newsletters/'+id+'/delete'))
		.success(function (data) {
			if(data.success)
			{
				$location.path('/newsletters');
			}
		});
	};

	$scope.reload = function()
	{
		$route.reload();
	};

	$scope.pushMessage = function (message)
	{
		if (!feedback_messages[message])
		{
			var m = {message: message, status: 'primary'};
			$scope.feedback_messages.push(m);
			feedback_messages[message] = m;
		}
	};

	$scope.clearMessage = function (message, success)
	{
		var m = feedback_messages[message];
		if (m)
		{
			delete feedback_messages[message];
			if (success)
			{
				m.status = 'success';
				m.message = 'OK: '+m.message;
				window.setTimeout(function(){
					var i = $scope.feedback_messages.indexOf(m);
					$scope.feedback_messages.splice(i, 1);
					if(!$scope.$$phase)
					{
						$scope.$apply();
					}
				}, 2000);
			}
			else
			{
				m.status = 'danger';
				m.message = 'Failed: '+m.message;
			}
		}
	};

	$scope.removeMessage = function(index)
	{
		$scope.feedback_messages.splice(index, 1);
	};
});