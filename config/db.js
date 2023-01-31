const { Sequelize } = require("sequelize");

const createDB = new Sequelize("testDB", "tricky", "12345", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

module.exports = createDB;
