const { Router } = require("express");
const Event = require("./model");
const Ticket = require("../tickets/model");
const User = require("../users/model");
const Comment = require("../comments/model");
const auth = require("../authentication/middleware");
const router = new Router();

router.get("/comments", async function(request, response, next) {
  try {
    const tickets = await User.findAll({ include: [Comment] });
    response.status(201).send(tickets);
  } catch (error) {
    next(error);
  }
});

router.post("/comment", async function(request, response, next) {
  try {
    // console.log(request.body);
    await Comment.create({
      comment: request.body.comment,
      ticketId: request.body.ticketId,
      userId: request.body.userId
    });
    // console.log(ticket);

    const tickets = await User.findAll({
      include: [Comment]
    });
    response.status(201).send(tickets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
