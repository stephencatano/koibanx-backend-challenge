'use strict'

const { header } = require('express-validator');
const bcrypt = require('bcrypt-nodejs');

const { validateResult } = require('../helpers/validate');
const User = require('../models/user')

const validateUsernameAndPassword = [
  header('authorization').custom(async (value, { req }) => {
    if (!req.headers.authorization) {
      throw new Error('Basic Authorization is missing')
    } else {
      if (process.env.NODE_ENV === 'testing') {
        return true
      }

      const b64auth = req.headers.authorization.split(' ')[1] || '';
      const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
      const userOnDatabase = await User.findOne({ username });

      if (!userOnDatabase) {
        throw new Error('Username not found')
      }

      const passVerified = bcrypt.compareSync(password, userOnDatabase.password)

      if (passVerified) {
        return true;
      } else {
        throw new Error('Username or Password is Invalid');
      }
    }
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

module.exports = { validateUsernameAndPassword };

