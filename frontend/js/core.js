'use strict';

angular.module('racecharts.core', []).
  controller('AppCtrl', function($scope, $http, appname) {
    $http({
      method: 'GET',
      url: '/api/name'
    }).
      success(function(data, status, headers, config) {
        $scope.name = appname;
      }).
      error(function(data, status, headers, config) {
        $scope.name = 'Error!';
      });
  });
