'use strict';

describe('Service: BudgetAnalyzer', function () {

  // load the service's module
  beforeEach(module('budgetApp2App'));

  // instantiate service
  var BudgetAnalyzer;
  beforeEach(inject(function (_BudgetAnalyzer_) {
    BudgetAnalyzer = _BudgetAnalyzer_;
  }));

  it('should do something', function () {
    expect(!!BudgetAnalyzer).toBe(true);
  });

});
