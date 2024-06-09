'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./src/models/index');
const authRoutes = require('./src/auth/routes');
const router = require('./src/routes/v1');
const port = process.env.PORT || 3003;

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/auth', authRoutes);
app.use('/api', router);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  console.error(err.stack); 
  if (err.message === 'Request body is missing' || err.message.startsWith('Missing required fields')) {
    res.status(400).json({ error: err.message });
  } else if (err.message === 'Invalid User' || err.message === 'User Not Found') {
    res.status(401).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Something broke!' });
  }
});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync the database:', err);
  });

module.exports = app;
