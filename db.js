const Sequelize = require("sequelize");

const databaseUrl = process.env.DATABASE_URL;

const db = new Sequelize(databaseUrl, {
  logging: false
});

db.sync({ force: true }).then(() => {
  console.log("DB connect");
});

module.exports = db;
