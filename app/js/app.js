'use strict';

/* App Module */
var hakaseApp = angular.module('hakaseApp', [
    'ngRoute',
    'ui.bootstrap',
    'hakaseAnimations',
    'hakaseControllers',
    'hakaseFilters',
    'hakaseServices'
]);

hakaseApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/words', {
                templateUrl: 'partials/word-list.html',
                controller: 'WordListCtrl'
            }).
            when('/words/:wordId', {
                templateUrl: 'partials/word-detail.html',
                controller: 'WordDetailCtrl'
            }).
            otherwise({
                redirectTo: '/words'
            });
    }
]);
