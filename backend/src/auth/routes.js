'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const permissions = require('./middleware/acl');

// Route to create a new user
authRouter.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      throw new Error('Missing required fields: name, email, password, or role');
    }

    const userRecord = await users.create({ name, email, password, role });

    const output = {
      user: userRecord,
      token: userRecord.token,
    };

    res.status(201).json(output);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ error: 'Email or username already exists' });
    } else if (err.name === 'SequelizeValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      next(err); // Pass other errors to the global error handler
    }
  }
});


// Route to sign in a user using basic authentication
authRouter.post('/signin', basicAuth, async (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    next(e); // Pass error to the error handling middleware
  }
});

// Route to get all users (restricted to users with 'delete' permission)
authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.name); // Assuming `name` field exists
    res.status(200).json(list);
  } catch (e) {
    next(e); // Pass error to the error handling middleware
  }
});

// Route to access a secret area (requires bearer token)
authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');
});

module.exports = authRouter;
