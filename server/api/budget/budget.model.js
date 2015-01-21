'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BudgetSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,

  userId: String,
  amount: Number,
  start: String,
  duration: {
    timeValue: Number,
    timeUnit: String
  },
  entries: [{
    description: String,
    date: String,
    amount: Number
  }]
});

//BudgetSchema
//  .virtual('fullname')
//  .get(function() {
//    // TODO: Add moment.js and do real stuff
//    //var spent = Math.random() * 1.3 * this.amount;
//    //return {
//    //  spent: spent,
//    //  percent: (spent / this.amount) * 100
//    //};
//
//    //return 'Jim';
//  });

module.exports = mongoose.model('Budget', BudgetSchema);
