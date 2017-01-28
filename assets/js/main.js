
(function () {
  'use strict';

    angular.module('justintime', [
        'ngRoute',
    ]).config(['$routeProvider',
        function($routeProvider, IdleProvider, KeepaliveProvider) {
            $routeProvider
            /*
            .when('/login', {
                templateUrl: 'login/login.html',
                controller: 'loginCtrl'
            })
            */
            .when('/contact', {
                templateUrl: 'views/contact.html'
            })
            /*.when('/register', {
                templateUrl: 'login/register.html',
                controller: 'loginCtrl'
            })*/
            .when('/home', {
                templateUrl: 'views/home.html'
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
            .otherwise({
                templateUrl: 'views/home.html'
            });

        }
    ]);

})();
