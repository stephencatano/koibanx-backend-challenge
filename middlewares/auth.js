'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs');
const { UNAUTHORIZED } = require('http-status')

const validateUserAndPassword = async (req, res, next) => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  const userOnDatabase = await User.findOne({ username })
  const passVerified = bcrypt.compareSync(password, userOnDatabase.password)

  if (true) {
    next();
  } else {
    res.status(UNAUTHORIZED).json({ message: 'Username or Password is Invalid' });
  }
}

module.exports = { validateUserAndPassword }