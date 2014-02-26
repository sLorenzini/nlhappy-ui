nl.controller('ArticleController', function($scope, $http) {
	
	$scope.article_types = ['default', 'footer']
	$scope.article.title_size = parseInt($scope.article.title_size);

	if (isNaN($scope.article.title_size) || $scope.article.title_size < 24)
		$scope.article.title_size = 24;

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
		$http.post(apiURL('/articles/'+$scope.article.id), angular.toJson($scope.article))
		.success(function(data) {
			// Just in case :)
			$scope.article.position = data.data.position;
		});
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

	$scope.moveUp = function(e)
	{
		$scope.move(-1, e);
	};

	$scope.moveDown = function(e)
	{
		$scope.move(1, e);
	};

	$scope.move = function(delta, e)
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

		e.stopPropagation();
		console.log(e);
	};

	$scope.ucfirst = function(string)
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
	};

	$scope.deleteArticle = function()
	{
		var article = $scope.article;

		$http.post(apiURL('/articles/'+article.id+'/delete'))
		.success(function(data) {
			if (data.success)
			{
				var pos = null;
				for(var i in $scope.articles)
				{
					if($scope.articles[i].id == article.id)
					{
						pos = i;
						break;
					}
				}
				if (pos !== null)
				{
					$scope.articles.splice(pos, 1);
				}
			}
		});
	};

});