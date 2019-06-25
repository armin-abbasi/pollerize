'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let today = new Date();
    let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      username: 'john.doe',
      password: '5f4dcc3b5aa765d61d8327deb882cf99',
      gender: 'male',
      dob: '1985-02-15',
      location: 'Iran/Tehran',
      active: true,
      createdAt: currentDate,
      updatedAt: currentDate
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
