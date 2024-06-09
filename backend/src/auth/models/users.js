'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('student', 'teacher'),
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ name: this.name, email: this.email }, SECRET);
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          student: ['read'],
          teacher: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    try {
      const hashedPass = await bcrypt.hash(user.password, 10);
      user.password = hashedPass;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  });

  model.authenticateBasic = async function (email, password) {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid User');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const decodedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({ where: { email: decodedToken.email } });
      if (user) {
        return user;
      }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userModel;
