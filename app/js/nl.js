var nl = angular.module('nl', ['ngRoute']);

nl.directive('ngSafeClick', [
        function(){
            return {
            	restrict: 'A',
                link: function (scope, element, attr) {
                    var msg = attr.dataConfirm || "Are you sure?";
                    var clickAction = attr.ngSafeClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])

function apiURL(path)
{
	return apiRoot+path;
};

nl.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/index.html',
		controller: 'IndexController'
	})
	.when('/newsletters', {
		templateUrl: 'views/newsletters.html',
		controller: 'NewslettersController'
	})
	.when('/newsletters/:newsletter_id', {
		templateUrl: 'views/newsletter.html',
		controller: 'NewsletterController'
	})
	.when('/newsletters/:newsletter_id/:language_code', {
		templateUrl: 'views/newsletter.html',
		controller: 'NewsletterController'
	})
	.when('/messages', {
		templateUrl: 'views/messages.html',
		controller: 'MessagesController'
	});
}]);

