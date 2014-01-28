nl.controller('MainController', function ($scope) {
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
});