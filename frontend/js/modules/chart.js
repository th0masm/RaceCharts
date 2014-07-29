'use strict';


angular.module('racecharts.chart', ['highcharts-ng'])
.controller('ChartController', function($scope) {

  var tooltip = function() {
    var time = this.y + '';
    var timesplitted = time.split('.');
    var mintemp = (timesplitted[0] / 60) + '';
    var minmod = parseInt(timesplitted[0]) % 60;
    var min = mintemp.split(',');
    if (minmod < 10) {
      min = mintemp[0] + '\'0' + minmod;
      return 'Lap ' + (parseInt(this.x) + 1) + ': ' + min + '.' + timesplitted[1];
    } else {
      min = mintemp[0] + '\'' + minmod;
      return 'Lap ' + (parseInt(this.x) + 1) + ': ' + min + '.' + timesplitted[1];
    }
  };

  var labels = function() {
    var time = this.value + '';
    var timesplitted = time.split('.');
    var mintemp = (timesplitted[0] / 60) + '';
    var minmod = parseInt(timesplitted[0]) % 60;
    var min = mintemp.split(',');
    if (minmod < 10) {
      min = mintemp[0] + '\'0' + minmod;
    }
    else {
      min = mintemp[0] + '\'' + minmod;
    }
    return min;
  };

  $scope.addSeries = function() {

    if(!$scope.rider.name || !$scope.rider.times){
      return;
    }

    var rnd = [];

    var lines = $scope.rider.times.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var min = lines[i].split('\'')[0];
      var sec = lines[i].split('\'')[1].split('.')[0];
      var milli = lines[i].split('\'')[1].split('.')[1];
      rnd.push(parseInt(min) * 60 + parseInt(sec) + (parseInt(milli) / 1000));
    }

    console.log(rnd);

    $scope.highchartsNG.series.push({
      name: $scope.rider.name,
      data: rnd
    });
  };

  $scope.highchartsNG = {
    options: {
      chart: {
        type: 'line',
        zoomType: 'x',
        spacingRight: 20,
        marginRight: 40,
        marginBottom: 50
      },
      yAxis: {
        title: {
          text: ''
        },
        plotLines: [{
          width: 1,
          color: 'red'
        }],
        labels: {
          formatter: labels
        }
      },
      tooltip: {
        formatter: tooltip
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 100,
        borderWidth: 0
      },
      exporting: {
        enabled: true
      }
    },
    series: [],
    title: {
      text: 'Title'
    },
    subtitle: {
      text: 'Analysis'
    },

    loading: false
  };
});
