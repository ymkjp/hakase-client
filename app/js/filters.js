'use strict';

/* Filters */
var hakaseFilters = angular.module('hakaseFilters', []);

hakaseFilters.filter('checkmark', function() {
    return function(input) {
        return input? '\u2713' : '\u2718';
    };
});

hakaseFilters.filter('convertToCountryCode', function () {
  return function (key) {
    var countryTable = {
        "en": "gb",
        "ja": "jp"
    };
    return (key in countryTable) ? countryTable[key] : '';
  };
});

hakaseFilters.filter('readabilityComment', function () {
  return function (score) {
    if (90 <= score) {
        return "Very Easy";
    } else if (80 <= score) {
        return "Easy";
    } else if (70 <= score) {
        return "Fairly Easy";
    } else if (60 <= score) {
        return "Standard";
    } else if (50 <= score) {
        return "Fairly Difficult";
    } else if (30 <= score) {
        return "Difficult";
    } else {
        return "Very Confusing";
    }
  };
});

hakaseFilters.filter('readabilityLevel', function () {
  return function (score) {
    if (80 <= score) {
      return 'success';
    } else if (60  <= score) {
      return  'info';
    } else if (30  <= score) {
      return 'warning';
    } else {
      return 'danger';
    }
  };
});
