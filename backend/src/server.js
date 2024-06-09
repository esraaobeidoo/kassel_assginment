'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./auth/routes.js');
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const v1Routes = require('./routes/v1.js');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes); // Mount auth routes under /auth
app.use('/api/v1', v1Routes); // Mount v1 routes under /api/v1

// Root route for testing
app.get('/', (req, res) => {
  res.send('HELLO!');
});

// Error handling middleware
app.use('*', notFoundHandler);
app.use(errorHandler);
app.use(cors())
// Exporting server and start function
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
