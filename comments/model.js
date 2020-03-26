const db = require("../db");
const Sequelize = require("sequelize");
const Ticket = require("../tickets/model");
const User = require("../users/model");
const Comment = db.define("comment", {
  comment: {
    type: Sequelize.STRING,
    allowNull: false
  }
  // Research Foreign Keys
});

Comment.belongsTo(Ticket);
Ticket.hasMany(Comment);
Comment.belongsTo(User);
User.hasMany(Comment);
module.exports = Comment;
