'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let today = new Date();
    let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let pollArray = [];

    for (let i = 0; i < 10; i++) {
      pollArray[i] = {
        userId: Math.floor(Math.random() * 20),
        question: "Sample question passage?",
        totalCount: Math.floor(Math.random() * 10),
        expiresAt: null,
        createdAt: currentDate,
        updatedAt: currentDate
      };
    }

    return queryInterface.bulkInsert('Polls', pollArray, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Polls', null, {});
  }
};
