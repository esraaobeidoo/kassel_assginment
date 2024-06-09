'use strict';

const { users } = require('../../models/index');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      throw new Error('Invalid Authorization Header');
    }

    const token = req.headers.authorization.split(' ')[1];
    const validUser = await users.authenticateToken(token);

    if (!validUser) {
      throw new Error('Invalid Token');
    }

    req.user = validUser;
    req.token = token;
    next();
  } catch (e) {
    next(e); // Pass error to the global error handler
  }
};
