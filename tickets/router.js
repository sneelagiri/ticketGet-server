const { Router } = require("express");
const Ticket = require("./model");
const auth = require("../authentication/middleware");
const router = new Router();
const User = require("../users/model");

router.get("/ticket", async function(request, response, next) {
  try {
    const users = await User.findAll({ include: [Ticket] });
    response.status(201).send(users);
  } catch (error) {
    next(error);
  }
});

router.post("/ticket", auth, async function(request, response, next) {
  try {
    // console.log(request.body);
    await Ticket.create({
      title: request.body.title,
      price: request.body.price,
      picture: request.body.picture,
      description: request.body.description,
      userId: request.body.userId,
      eventId: request.body.eventId
    });
    // console.log(ticket);

    const users = await User.findAll({
      include: [Ticket]
    });
    response.status(201).send(users);
  } catch (error) {
    next(error);
  }
});

router.put("/ticket/:id", auth, async (request, response) => {
  console.log("WHAT IS THE REQUEST BODY?", request.body);
  try {
    const match = await Ticket.findByPk(request.params.id);
    const finished = await match.update(request.body);
    const users = await User.findAll({
      include: [Ticket],
      order: [[Ticket, "risk", "ASC"]]
    });
    response.status(201).send(users);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
