'use strict';

const faker = require("faker");

 let users = [
   {
    username: "user1234",
    email: "user1234@test.com",
    password: "Test1234",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "standard"
   },
   {
    username: "AryaStark",
    email: "AryaStark@test.com",
    password: "Test4567",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "standard"
   },
   {
    username: "SansaStark",
    email: "SansaStark@test.com",
    password: "Test7891",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "standard"
   }
 ];


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Users",null, {});
  }
};