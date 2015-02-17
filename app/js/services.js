'use strict';

/* Services */

var hakaseServices = angular.module('hakaseServices', ['ngResource']);

hakaseServices.factory('Word', ['$resource',
    function($resource) {
        // http://localhost:5000/api/v1/teach?target_url=
        return $resource('http://localhost:5000/api/v1/teach', {}, {
        });
}]);

hakaseServices.factory('WordExample', ['$resource',
    function($resource) {
        return $resource('words/:wordId.json', {}, {
            query: {method: 'GET', params: {wordId: 'words'}, isArray: true}
        });
}]);

