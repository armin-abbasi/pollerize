'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    userId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    totalCount: DataTypes.INTEGER,
    expiresAt: DataTypes.DATE
  }, {});
  Poll.associate = function(models) {
    Poll.hasMany(models.Vote, {
      foreignKey: 'pollId'
    });
    Poll.belongsTo(models.User);
  };
  return Poll;
};