'use strict';

// Declare app level module which depends on filters, and services

angular.module('RaceCharts', [
  'ngRoute',
  'myApp.controllers',
  'racecharts.chart',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/chart', {
      templateUrl: 'partials/chart',
      controller: 'ChartController'
    }).
    when('/about', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/chart'
    });

  $locationProvider.html5Mode(true);
});
