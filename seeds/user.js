const { User } = require("../models");

const userData = [
  {
    username: "hermione",
    email: "hermionegranger@mail.com",
    password: "admin",
  },
  {
    username: "Dumbledore",
    email: "dumbledore@mail.com",
    password: "admin",
  },
  {
    username: "Stylebender",
    email: "styles@mail.com",
    password: "admin",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
