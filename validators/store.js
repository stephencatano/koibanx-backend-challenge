'use strict'

const { check } = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateStore = [
  check('name').exists().isString().isLength({ min: 5 }),
  check('cuit').exists().isString().isLength({ min: 5 }),
  check('concepts').exists().isArray(),
  check('currentBalance').exists().isNumeric(),
  check('active').exists().isBoolean(),
  check('lastSale').exists().isDate(),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

module.exports = { validateStore };

