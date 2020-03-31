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

router.post("/comment", auth, async function(request, response, next) {
  try {
    // console.log(request.body);
    const match = await Ticket.findByPk(request.body.ticketId);
    const updateRisk = async match => {
      if (match.dataValues.numOfComments === 3) {
        return await match.update({
          numOfComments: match.numOfComments + 1,
          risk: match.risk + 5
        });
      } else {
        return await match.update({ numOfComments: match.numOfComments + 1 });
      }
    };
    const updatedRisk = await updateRisk(match);

    const commentCreated = await Comment.create({
      comment: request.body.comment,
      ticketId: request.body.ticketId,
      userId: request.user.id
    });

    if (updatedRisk && commentCreated) {
      const tickets = await User.findAll({
        include: [Ticket, Comment],
        order: [[Ticket, "risk", "ASC"]]
      });

      response.status(201).send(tickets);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
