'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../../src/auth/models/users');
const courseModel = require('./coures/model.js');
const Collection = require('./data-collection.js');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

if (!POSTGRES_URI) {
  throw new Error('DATABASE_URL is not defined');
}

let sequelizeOptions = process.env.NODE_ENV === 'production'
  ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
  : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const coursesModel = courseModel(sequelize, DataTypes);
const usersModel = userModel(sequelize, DataTypes);

const db = {
  sequelize,
  users: usersModel,
  courses: new Collection(coursesModel), 
};

module.exports = db;
