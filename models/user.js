'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    location: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Poll, {
      foreignKey: 'userId'
    })
  };

  // generate hash for user model
  User.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  // check if the entered password is valid
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};