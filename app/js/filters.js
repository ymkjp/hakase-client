'use strict';

/* Filters */
angular.module('hakaseFilters', []).filter('checkmark', function() {
    return function(input) {
        return input? '\u2713' : '\u2718';
    };
});
