const { Router } = require("express");
const Ticket = require("./model");
const auth = require("../authentication/middleware");
const router = new Router();

router.post("/ticket", async function(request, response, next) {
  try {
    const user = await Ticket.create({
      price: request.body.price,
      description: request.body.description,
      picture: request.body.body,
      userId: request.body.userId,
      eventId: request.body.eventId
    });
    console.log(user);
    response.status(201).send(user);
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
