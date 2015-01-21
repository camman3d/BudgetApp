'use strict';

describe('Service: budget', function () {

  // load the service's module
  beforeEach(module('budgetApp2App'));

  // instantiate service
  var Budget;
  beforeEach(inject(function (_Budget_) {
    Budget = _Budget_;
  }));

  it('should do something', function () {
    expect(!!Budget).toBe(true);
  });

});
