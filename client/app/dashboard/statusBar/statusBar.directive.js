'use strict';

angular.module('budgetApp2App')
  .directive('statusBar', function (BudgetAnalyzer) {
    return {
      templateUrl: 'app/dashboard/statusBar/statusBar.html',
      restrict: 'EA',
      scope: {
        'budget': '=statusBar'
      },
      link: function (scope, element, attrs) {

        function process() {
          scope.status = BudgetAnalyzer.analyze(scope.budget);

          scope.progressState = {
            'progress-bar-success': scope.status.state == 'green',
            'progress-bar-warning': scope.status.state == 'yellow',
            'progress-bar-danger': scope.status.state == 'red'
          };

          scope.progressWidth = Math.min(100, scope.status.percent * 100);
        }

        scope.$watch('budget.entries', process);
        process();

      }
    };
  });
