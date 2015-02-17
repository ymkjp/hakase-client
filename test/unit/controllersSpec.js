'use strict';

/* jasmine specs for controllers go here */

describe('Hakase controllers', function() {

  beforeEach(function() {
    this.addMatchers({
        toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
        }
    });
  });
  beforeEach(module('hakaseApp'));
  beforeEach(module('hakaseServices'));

  describe('WordListCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
        respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller('WordListCtrl', {$scope:scope});
    }));

    it('should create "frequentWords" model with 2 words from xhr' , function() {
          expect(scope.frequentWords).toEqualData([]);
          $httpBackend.flush();

          expect(scope.frequentWords).toEqualData(
            [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });

    it('should set the default value of orderProp model' , inject(function($controller) {
          expect(scope.orderProp).toBe('age');
    }));
  });

  describe('WordDetailCtrl', function() {
    var scope, $httpBackend, ctrl,
        xyzPhoneData = function() {
            return {
                name: 'phone xyz',
                images: ['image/url1.png', 'image/url2.png']
            }
        };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('WordDetailCtrl', {$scope: scope});
    }));

    it('should fetch word detail', function() {
        expect(scope.phone).toEqualData({});
        $httpBackend.flush();

        expect(scope.phone).toEqualData(xyzPhoneData());
    });
  });

});
