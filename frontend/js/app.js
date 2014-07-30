'use strict';

angular.module('RaceCharts', [
  'ngRoute',
  'racecharts.core',
  'racecharts.chart',
  'racecharts.rider',
  'myApp.filters',
  'myApp.directives'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/chart', {
        templateUrl: 'partials/chart',
        controller: 'ChartController'
      }).
      when('/about', {
        templateUrl: 'partials/about'
      }).
      when('/', {
        templateUrl: 'partials/chart',
        controller: 'ChartController'
      }).
      otherwise({
        redirectTo: '/chart'
      });

    $locationProvider.html5Mode(true);
  })
  .value('appname', 'Charts by Offbikes');
