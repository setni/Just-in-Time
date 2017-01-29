
(function () {
  'use strict';

    angular.module('justintime', [
        'ngRoute',
    ]).config(['$routeProvider',
        function($routeProvider, IdleProvider, KeepaliveProvider) {
            $routeProvider
            .when('/contact', {
                templateUrl: 'views/contact.html'
            })
            .when('/home', {
                templateUrl: 'views/home.html'
            })
            .when('/charts', {
                templateUrl: 'views/charts.html'
            })
            .when('/providers', {
                templateUrl: 'views/providers.html'
            })
            .when('/news', {
                templateUrl: 'views/news.html'
            })
            .when('/about', {
                templateUrl: 'views/about.html'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html'
            })
            .otherwise({
                templateUrl: 'views/home.html'
            });

        }
    ]);

})();
