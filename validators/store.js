'use strict'

const { body } = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateStore = [
  body('name').exists().custom(value => {
    if (typeof(value) !== 'string') {
      throw new Error('name should be a string');
    } else if (value.length < 5) {
      throw new Error('the name must have a minimum of 5 letters');
    }

    return true;
  }),
  body('cuit').exists().custom(value => {
    if (typeof(value) !== 'string') {
      throw new Error('cuit must be a string');
    } else if (value.length < 5) {
      throw new Error('cuit must have a minimum of 5 characters');
    }

    return true;
  }),
  body('concepts').exists().isArray({ max: 5 }).custom(value => {
    if (typeof(value) !== 'object') {
      throw new Error('concepts must be an array');
    } else if (value.length > 5) {
      throw new Error('concepts must have a maximum of 5 concepts');
    }

    return true;
  }),
  body('currentBalance').exists().custom(value => {
    if (typeof(value) !== 'number') {
      throw new Error('currentBalance must be number');
    }

    return true;
  }),
  body('active').exists().isBoolean().custom(value => {
    if (typeof(value) !== 'boolean') {
      throw new Error('active must be a boolean');
    }

    return true;
  }),
  body('lastSale').exists().isDate(),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

module.exports = { validateStore };

