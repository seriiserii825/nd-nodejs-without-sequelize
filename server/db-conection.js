const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_orm", "root", "Serii1981;", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
