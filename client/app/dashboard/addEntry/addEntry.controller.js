'use strict';

angular.module('budgetApp2App')
  .controller('AddentryCtrl', function ($scope, $modalInstance, $timeout) {
    $scope.entry = {
      date: new Date()
    };

    $timeout(function () {
      $('#entryAmount').focus();
    }, 250);

    $scope.create = function () {
      $modalInstance.close($scope.entry);
    };

    $scope.close = $modalInstance.dismiss;
  });
