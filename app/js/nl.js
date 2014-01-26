var nl = angular.module('nl', ['ngRoute']);

var apiRoot = 'http://nlhappy.fmdj.fr';

function apiURL(path)
{
	return apiRoot+path;
};

nl.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/views/index.html',
		controller: 'IndexController'
	})
	.when('/newsletters', {
		templateUrl: '/views/newsletters.html',
		controller: 'NewslettersController'
	})
	.when('/newsletters/:newsletter_id', {
		templateUrl: '/views/newsletter.html',
		controller: 'NewsletterController'
	})
	.when('/newsletters/:newsletter_id/:language_code', {
		templateUrl: '/views/newsletter.html',
		controller: 'NewsletterController'
	});
}]);

