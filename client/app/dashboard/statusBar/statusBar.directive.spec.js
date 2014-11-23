'use strict';

describe('Directive: statusBar', function () {

  // load the directive's module and view
  beforeEach(module('budgetApp2App'));
  beforeEach(module('app/dashboard/statusBar/statusBar.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<status-bar></status-bar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the statusBar directive');
  }));
});