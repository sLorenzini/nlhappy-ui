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

	$http.get(apiURL('/articles/'+$scope.article.id+'/buttons'))
	.success(function(data) {
		$scope.buttons = {};
		for(var b in data.data)
		{
			$scope.buttons[data.data[b].id] = data.data[b];
		}
	});

	declareDelayedFunction($scope, 'updateArticle', 1000, function() {
		$http.post(apiURL('/articles/'+$scope.article.id), angular.toJson($scope.article));
	});

	$scope.addButton = function()
	{
		$http.post(apiURL('/articles/'+$scope.article.id+'/buttons'))
		.success(function (data){
			$scope.buttons[data.data.id] = data.data;
		});
	};

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