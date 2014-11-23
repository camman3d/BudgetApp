'use strict';

var _ = require('lodash');
var Budget = require('./budget.model');
var config = require('../../config/environment');
var budgetAnalyzer = require('./budgetAnalyzer');

function isOwner(user, budget) {
  return user._id == budget.userId;
}

function isAdmin(user) {
  return config.userRoles.indexOf(user.role) >= config.userRoles.indexOf("admin");
}

// Get list of budgets
exports.index = function (req, res) {
  var cond = {};
  if (!isAdmin(req.user)) {
    cond = {
      userId: req.user._id
    };
  }
  Budget.find(cond, function (err, budgets) {
    if (err) {
      return handleError(res, err);
    }
    budgets.forEach(function (budget) {
      budget._doc.status = budgetAnalyzer.calcStatus(budget);
    });
    return res.json(200, budgets);
  });
};

// Get a single budget
exports.show = function (req, res) {
  Budget.findById(req.params.id, function (err, budget) {
    if (!isOwner(req.user, budget) && !isAdmin(req.user)) {
      return res.send(403); // Forbidden
    }
    if (err) {
      return handleError(res, err);
    }
    if (!budget) {
      return res.send(404);
    }
    budgetAnalyzer.addStatus(budget);
    return res.json(budget);
  });
};

// Creates a new budget in the DB.
exports.create = function (req, res) {

  // Add the user id
  req.body.userId = req.user._id;

  Budget.create(req.body, function (err, budget) {
    if (err) {
      return handleError(res, err);
    }
    budgetAnalyzer.addStatus(budget);
    return res.json(201, budget);
  });
};

// Updates an existing budget in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Budget.findById(req.params.id, function (err, budget) {
    if (!isOwner(req.user, budget) && !isAdmin(req.user)) {
      return res.send(403); // Forbidden
    }
    if (err) {
      return handleError(res, err);
    }
    if (!budget) {
      return res.send(404);
    }
    var updated = _.merge(budget, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      budgetAnalyzer.addStatus(budget);
      return res.json(200, budget);
    });
  });
};

// Deletes a budget from the DB.
exports.destroy = function (req, res) {
  Budget.findById(req.params.id, function (err, budget) {
    if (!isOwner(req.user, budget) && !isAdmin(req.user)) {
      return res.send(403); // Forbidden
    }
    if (err) {
      return handleError(res, err);
    }
    if (!budget) {
      return res.send(404);
    }
    budget.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
