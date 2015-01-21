'use strict';

angular.module('budgetApp2App')
  .factory('BudgetAnalyzer', function () {
    // Service logic
    // ...

    function parseDate(dateString) {
      return moment(dateString, "YYYY-MM-DDTHH:mm:ss.SSSZ");
    }

    function getDuration(budget) {
      return moment.duration(budget.duration.timeValue, budget.duration.timeUnit);
    }

    function getPeriod(budget) {
      var now = moment();
      var start = parseDate(budget.start);
      var duration = getDuration(budget);
      var end = start.clone().add(duration);

      while (end.isBefore(now)) {
        start.add(duration);
        end.add(duration);
      }

      return {
        start: start,
        end: end
      };
    }

    function getEntries(budget, period) {
      return budget.entries.filter(function (entry) {
        return parseDate(entry.date).isBetween(period.start, period.end);
      });
    }

    function analyze(budget) {

      var period = getPeriod(budget);
      var entries = getEntries(budget, period);
      var spent = entries.reduce(function(s, e) {return s + e.amount;}, 0);
      var percent = (spent / budget.amount);

      var timePercent =
        moment.duration(moment().diff(period.start)).asHours() /
        moment.duration(period.end.diff(period.start)).asHours();
      var state = 'green';
      if (percent > timePercent) {
        state = 'yellow';
      }
      if (percent > 1) {
        state = 'red';
      }

      return {
        period: period,
        entries: entries,
        spent: spent,
        percent: percent,
        state: state,

        timeLeft: moment.duration(period.end.diff(moment())).humanize(),
        moneyLeft: Math.max(0, budget.amount - spent)
      };

    }


    // Public API here
    return {
      analyze: analyze
    };
  });
