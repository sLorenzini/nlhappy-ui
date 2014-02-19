nl.controller('MainController', function ($scope, $http, $location, $route) {
	$scope.status = {
		message: '',
		klass: ''
	};

	$scope.shared = {
		focused_article_id: null,
		default_article_type: 'default'
	};

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
	}
});