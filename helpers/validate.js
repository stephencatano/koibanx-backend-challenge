'use strict'

const { validationResult } = require('express-validator');
const { BAD_REQUEST } = require('http-status');

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();

    return next();
  } catch (error) {
    res.status(BAD_REQUEST).send({ errors: error.array() })
  }
}

module.exports = { validateResult };
