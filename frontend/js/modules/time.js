'use strict';

angular.module('racecharts.rider', [])
  .factory('timeService', function() {

    var time = {};
    time.min = time.sec = time.milli = null;
    time.patt = new RegExp(/^[0-9]*\'[0-9][0-9].[0-9][0-9][0-9]/);

    time.getTime = function(unparsed) {
      time.min = unparsed.split('\'')[0];
      time.sec = unparsed.split('\'')[1].split('.')[0];
      time.milli = unparsed.split('\'')[1].split('.')[1];

      return parseInt(time.min) * 60 + parseInt(time.sec) + (parseInt(time.milli) / 1000);
    };

    time.getPattern = function() {
      return time.patt;
    };

    return time;
  })
  .factory('riderService', ['timeService', function(timeService) {
    var rider = {};
    rider.name = null;
    rider.times = [];

    rider.setTimes = function(times) {
      rider.times = [];
      var lines = times.split('\n');
      for (var i = 0; i < lines.length; i++) {

        if (!timeService.getPattern().test(lines[i])) {
          return false;
        }

        rider.times.push(timeService.getTime(lines[i]));
      }
      return true;
    };

    rider.getTimes = function() {
      return rider.times;
    };

    return rider;
  }]);
