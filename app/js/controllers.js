'use strict';

/* Controllers */
var hakaseControllers = angular.module('hakaseControllers', []);

hakaseControllers.controller('WordListCtrl', ['$scope', 'WordExample',
  function ($scope, WordExample) {
    $scope.words = WordExample.query();
}]);

hakaseControllers.controller('TargetFormCtrl', ['$scope', 'Word',
  function ($scope, Word) {
    $scope.target = {};
    $scope.alerts = [];
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.submit = function () {
        if ($scope.targetForm.$invalid) {
            $scope.targetForm.$setDirty();
            return;
        }
        $scope.loading = true;

        var target_url = $scope.targetForm.target_url.$modelValue;
        Word.get({target_url: target_url}).$promise.then(function(word) {
            $scope.words.unshift(word);
        }, function(reason) {
            console.log(reason);
            $scope.alerts.push({type: 'danger', msg: 'Something went wrong'});
        });
        $scope.loading = false;
    };
}]);

/**
hakaseControllers.controller('WordDetailCtrl', ['$scope', '$routeParams', 'Word',
  function ($scope, $routeParams, Word) {
    $scope.word = Phone.get({wordId: $routeParams.wordId}, function(word) {
        $scope.mainImageUrl = word.images[0];
    });

    $scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }
}]);
**/

hakaseControllers.controller('PanelCtrl', ['$scope',
  function ($scope) {
    $scope.gridOptions = {
        data: 'frequentWordData',
        enableColumnResize: true
    };
}]);
