nl.controller('NewsletterController', function($scope, $http, $routeParams, $location, $anchorScroll) {
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
		$scope.languages = [];
		for(var l in data.data)
		{
			$scope.languages.push({
				code: data.data[l].code,
				name: data.data[l].name,
				position: data.data[l].position,
				klass: language_code === data.data[l].code ? 'selected' : ''
			});
		}

		$scope.languages.sort(function(a, b) {
			return a.position - b.position;
		});

		if(language_code)
		{
			$scope.language_url = apiURL('/newsletters/'+$routeParams.newsletter_id+'/'+language_code);
			$scope.preview_url = $scope.language_url+'/render'

			$http.post($scope.language_url)
			.success(function(data) {
				$scope.newsletter_language = data.data;
				$scope.newsletter_language.title_size = parseInt(data.data.title_size);

				if($scope.newsletter_language.title_size < 24)
					$scope.newsletter_language.title_size = 24;
				
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

				$http.get($scope.articles_url).success(function(data) {
					$scope.articles = data.data;
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
		$http.post($scope.language_url, angular.toJson($scope.newsletter_language));
	});

	$scope.addArticle = function()
	{
		if ($scope.articles)
		{
			$http.post($scope.articles_url, {type: $scope.shared.default_article_type}).success(function (data){
				data.data.position = data.data.position+"";
				$scope.articles.push(data.data);
				/*
				$location.hash('article_'+data.data.id);
				$anchorScroll();
				*/
			});
		}
	};

	$scope.deleteNewsletter = function()
	{
		$scope.deleteNewsletterById($scope.newsletter.id);
	};

	$scope.articleOrderProp = function (article)
	{
		return article.type + ("0000000000"+parseInt(article.position)).slice(-10);
	};
});