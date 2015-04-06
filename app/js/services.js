'use strict';

/* Services */

var hakaseServices = angular.module('hakaseServices', ['ngResource']);

hakaseServices.factory('Word', ['$resource',
    function($resource) {
        /*
         ?target_url=
         */
        return $resource('http://192.168.59.103:8000/api/v1/teach', {}, {
        });
}]);

hakaseServices.factory('WordExample', ['$resource',
    function($resource) {
        return $resource('sample/:wordId.json', {}, {
            query: {method: 'GET', params: {wordId: 'words'}, isArray: true}
        });
}]);

