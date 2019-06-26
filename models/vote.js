'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    pollId: DataTypes.INTEGER,
    answer: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {});
  Vote.associate = function(models) {
    Vote.belongsTo(models.Poll);
    
    Vote.belongsToMany(models.User, {
      through: models.UserVote,
      foreignKey: 'user_id',
      as: 'voters'
    });
  };
  return Vote;
};