const db = require("../db");
const Sequelize = require("sequelize");
const Event = require("../events/model");
const Ticket = db.define("ticket", {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  picture: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
});

Ticket.belongsTo(Event);
Event.hasMany(Ticket);

module.exports = Ticket;
