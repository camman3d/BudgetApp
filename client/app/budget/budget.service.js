'use strict';

angular.module('budgetApp2App')
  .factory('Budget', function ($resource) {
    return $resource('/api/budgets/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
