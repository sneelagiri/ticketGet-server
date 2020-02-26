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

router.put("/ticket/:id", async (request, response) => {
  try {
    const match = await User.findByPk(request.params.id);
    const finished = await match.update(request.body);
    response.status(201).send(finished);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
