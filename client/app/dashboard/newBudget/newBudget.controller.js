'use strict';

angular.module('budgetApp2App')
  .controller('NewbudgetCtrl', function ($scope, $modalInstance) {

    $scope.budget = {};

    $scope.create = function () {
      $modalInstance.close($scope.budget);
    };

    $scope.close = $modalInstance.dismiss;
  });
