'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserVote = sequelize.define('UserVote', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    voteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Vote',
        key: 'id'
      }
    }
  }, {});
  UserVote.associate = function(models) {
    // associations can be defined here
  }; 
  return UserVote;
};