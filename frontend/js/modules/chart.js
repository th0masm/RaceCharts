'use strict';

angular.module('racecharts.chart', ['highcharts-ng', 'racecharts.rider'])
.controller('ChartController', function($scope, riderService) {

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
    $scope.error = false;
    if (!$scope.rider.name || !$scope.rider.times) {
      return;
    }

    if (riderService.setTimes($scope.rider.times)) {
      $scope.highchartsNG.series.push({
        name: $scope.rider.name,
        data: riderService.getTimes()
      });

      $scope.rider.name = '';
      $scope.rider.times = '';
    }
    else {
      $scope.error = true;
      $scope.errmsg = 'Wrong times format';
    }
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
xAxis: {
	tickInterval:1,
	labels : {
	formatter: function() {
		return this.value+1;
		}
}
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
    }
  };
});
