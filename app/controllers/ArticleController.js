nl.controller('ArticleController', function($scope, $http) {
	
	$scope.article.title_size = parseInt($scope.article.title_size);

	var first = true;
	$scope.$watch('article', function() {
		if(first)
		{
			first = false;
		}
		else
		{
			$scope.updateArticle();
		}
	}, true);

	declareDelayedFunction($scope, 'updateArticle', 1000, function() {
		$http.post(apiURL('/articles/'+$scope.article.id), angular.toJson($scope.article));
	});
});