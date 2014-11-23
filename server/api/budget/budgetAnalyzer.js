/**
 * Created by josh on 11/20/14.
 */

function calcStatus(budget) {
  // TODO: Add moment.js and do real stuff

  var spent = Math.random() * 1.3 * budget.amount;

  var percent = (spent / budget.amount);
  var timePercent = Math.random();

  var state = 'green';
  if (percent > timePercent) {
    state = 'yellow';
  }
  if (percent > 1) {
    state = 'red';
  }

  return {
    spent: spent,
    percent: percent * 100,
    state: state
  };
}

module.exports = {
  calcStatus: calcStatus
};
