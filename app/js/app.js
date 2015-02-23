'use strict';

/* App Module */
var hakaseApp = angular.module('hakaseApp', [
    'ngRoute',
    'ngGrid',
    'ui.bootstrap',
    'hakaseAnimations',
    'hakaseControllers',
    'hakaseFilters',
    'hakaseServices'
]);

hakaseApp.config(['$routeProvider',
    function($routeProvider, $httpProvider) {
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

hakaseApp.config(['$compileProvider', function ($compileProvider) {
  /**
  If you wish to debug an application with this information
  then you should open up a debug console in the browser
  then call this method directly in this console:
  `angular.reloadWithDebugInfo();`
  */
  $compileProvider.debugInfoEnabled(false);
}]);
