'use strict';

angular.module('budgetApp2App')
  .directive('statusBar', function () {
    return {
      templateUrl: 'app/dashboard/statusBar/statusBar.html',
      restrict: 'EA',
      scope: {
        'budget': '=statusBar'
      },
      link: function (scope, element, attrs) {

        scope.progressState = {
          'progress-bar-success': scope.budget.status.state == 'green',
          'progress-bar-warning': scope.budget.status.state == 'yellow',
          'progress-bar-danger': scope.budget.status.state == 'red'
        };

        scope.progressWidth = Math.min(100, scope.budget.status.percent);

      }
    };
  });
