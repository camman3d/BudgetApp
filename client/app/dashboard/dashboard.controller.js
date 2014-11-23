'use strict';

angular.module('budgetApp2App')
  .controller('DashboardCtrl', function ($scope, $modal, Auth, Budget) {
    $scope.message = 'Hello';
    $scope.user = Auth.getCurrentUser();

    $scope.budgets = Budget.query();

    $scope.createModel = function () {
      $modal.open({
        templateUrl: 'app/dashboard/newBudget/newBudget.html',
        controller: 'NewbudgetCtrl'
      }).result.then(function (data) {
          Budget.save({}, data).$promise.then(function (budget) {
            $scope.budgets.push(budget);
          });
        console.log(data);
      });
    };
  });
