'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    userId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    totalCount: DataTypes.INTEGER,
    expiresAt: DataTypes.DATE
  }, {});
  Poll.associate = function(models) {
    // associations can be defined here
  };
  return Poll;
};