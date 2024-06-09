'use strict';

const base64 = require('base-64');
const { users } = require('../../models/index');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Basic ')) {
      return _authError();
    }

    const basic = req.headers.authorization.split(' ')[1];
    const decodedCredentials = base64.decode(basic);
    const [username, password] = decodedCredentials.split(':');

    req.user = await users.authenticateBasic(username, password);

    if (!req.user) {
      return _authError();
    }

    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }
};
