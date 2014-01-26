nl.controller('NewsletterController', function($scope, $http, $routeParams) {
	$http.get(apiURL('/newsletters/'+$routeParams.newsletter_id)).success(function(data) {
		$scope.newsletter = data.data;
		$scope.newsletter.number = parseInt($scope.newsletter.number);

		var firstTime = true;
		$scope.$watch('newsletter', function (){
			if (firstTime)
			{
				firstTime = false;
			}
			else
			{
				$scope.updateNewsletter();
			}
		}, true);
	});

	$http.get(apiURL('/languages')).success(function(data) {
		var language_code = $routeParams.language_code;
		$scope.languages = {};
		for(var l in data.data)
		{
			$scope.languages[data.data[l].code] = {
				name: data.data[l].name,
				klass: language_code === data.data[l].code ? 'selected' : ''
			};
		}

		if(language_code)
		{
			$scope.language_url = apiURL('/newsletters/'+$routeParams.newsletter_id+'/'+language_code);

			$http.post($scope.language_url)
			.success(function(data) {
				$scope.newsletter_language = data.data;
				$scope.newsletter_language.title_size = parseInt(data.data.title_size);
				
				var first = true;
				$scope.$watch('newsletter_language', function () {
					if (first)
					{
						first = false;
					}
					else
					{
						$scope.updateNewsletterLanguage();
					}
				}, true);

				$scope.articles_url = $scope.language_url+'/articles';

				$scope.articles = {};

				$http.get($scope.articles_url).success(function(data) {
					for(var a in data.data)
					{
						$scope.articles[data.data[a].id] = data.data[a];
					}
				});
			});
		}
	});

	declareDelayedFunction($scope, 'updateNewsletter', 1000, function () {
		$http.post(apiURL('/newsletters/'+$scope.newsletter.id), angular.toJson($scope.newsletter))
		.success(function(data) {
		});
	});

	declareDelayedFunction($scope, 'updateNewsletterLanguage', 1000, function () {
		$http.post($scope.update_language_url, angular.toJson($scope.newsletter_language));
	});

	$scope.addArticle = function()
	{
		if ($scope.articles)
		{
			$http.post($scope.articles_url).success(function (data){
				$scope.articles[data.data.id] = data.data;
			});
		}
	};

	$scope.deleteArticle = function(article_id)
	{
		$http.post(apiURL('/articles/'+article_id+'/delete'))
		.success(function(data) {
			if (data.success)
			{
				delete $scope.articles[article_id];
			}
		});
	}
});