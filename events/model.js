const db = require("../db");
const Sequelize = require("sequelize");

const Event = db.define("event", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING
  },
  eventPicture: {
    type: Sequelize.STRING
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
});

module.exports = Event;
