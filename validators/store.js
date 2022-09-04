'use strict'

const { body } = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateStore = [
  body('name').exists().isString().isLength({ min: 5 }),
  body('cuit').exists().isString().isLength({ min: 5 }),
  body('concepts').exists().isArray(),
  body('currentBalance').exists().isNumeric(),
  body('active').exists().isBoolean(),
  body('lastSale').exists().isDate(),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

module.exports = { validateStore };

