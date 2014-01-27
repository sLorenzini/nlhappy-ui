nl.controller('ArticleController', function($scope, $http) {
	
	$scope.article_types = ['default', 'footer']
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

	$http.get(apiURL('/articles/'+$scope.article.id+'/buttons'))
	.success(function(data) {
		$scope.buttons = data.data;
	});

	declareDelayedFunction($scope, 'updateArticle', 1000, function() {
		console.log("updateArticle");
		$http.post(apiURL('/articles/'+$scope.article.id), angular.toJson($scope.article));
	});

	$scope.addButton = function()
	{
		$http.post(apiURL('/articles/'+$scope.article.id+'/buttons'))
		.success(function (data){
			$scope.buttons.push(data.data);
		});
	};

	$scope.buttonOrderProp = function(button)
	{
		return parseInt(button.position);
	}

	$scope.moveUp = function()
	{
		$scope.move(-1);
	};

	$scope.moveDown = function()
	{
		$scope.move(1);
	};

	$scope.move = function(delta)
	{
		$http.post(apiURL('/articles/'+$scope.article.id+'/move'), {delta: delta})
		.success(function (data){
			if(data.success)
			{
				for(var a in $scope.articles)
				{
					var article = $scope.articles[a];
					for(var i in data.data)
					{
						if(article.id == data.data[i].id)
						{
							article.position = data.data[i].position;
						}
					}
				}
			}
		});
	};

});