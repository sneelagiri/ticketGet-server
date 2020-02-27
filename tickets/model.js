const db = require("../db");
const Sequelize = require("sequelize");
const Event = require("../events/model");
const User = require("../users/model");
const Ticket = db.define("ticket", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  picture: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  risk: {
    type: Sequelize.FLOAT
  }
});

Ticket.belongsTo(Event);
Ticket.belongsTo(User);
Event.hasMany(Ticket);
User.hasMany(Ticket);

module.exports = Ticket;
