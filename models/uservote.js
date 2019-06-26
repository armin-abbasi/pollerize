'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserVote = sequelize.define('UserVote', {
    userId: DataTypes.INTEGER,
    voteId: DataTypes.INTEGER
  }, {});
  UserVote.associate = function(models) {
    // associations can be defined here
  };
  return UserVote;
};