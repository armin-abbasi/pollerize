'use strict';
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
  return User;
};